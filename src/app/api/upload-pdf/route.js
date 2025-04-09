import Keyword from '@/models/Keyword';
import Author from '@/models/Author';
import Paper from '@/models/Paper';
import path from 'path';
import dbConnect from '@/lib/mongodb';
import { extractSinglePaperMetadataOpenAI, getPapersScoreOpenAI } from '@/lib/openaiUtils';
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import { extractTextFromFirstPage } from '@/lib/pdfUtils';
import BusinessScore from '@/models/BusinessScore';


export async function POST(request) {
    await dbConnect();

    try {
        const formData = await request.formData();
        const file = formData.get('file');
        const email = formData.get('email');

        if (!file || !email) {
            return NextResponse.json(
                { error: 'File and email are required' },
                { status: 400 }
            );
        }

        const uploadDir = '/tmp/uploads';


        console.log('Upload directory:', uploadDir);
        await fs.mkdir(uploadDir, { recursive: true });
        const filePath = path.join(uploadDir, file.name);
        const fileBuffer = Buffer.from(await file.arrayBuffer());
        await fs.writeFile(filePath, fileBuffer);


        const text = await extractTextFromFirstPage(filePath);
        const paperJsonData = await extractSinglePaperMetadataOpenAI(text);

        // Check if a paper with the same title already exists
        const existingPaper = await Paper.findOne({ title: paperJsonData.paper_title });
        if (existingPaper) {
            return NextResponse.json(
                { error: 'Paper already exists.' },
                { status: 400 }
            );
        }

        const businessDic = await getPapersScoreOpenAI([paperJsonData.abstract]);

        const authorEmailDict = {};
        for (const author of paperJsonData.authors) {
            const firstname = author.firstname || 'Unknown';
            const lastname = author.lastname || 'Unknown';
            const key = `${firstname}=${lastname}`;
            authorEmailDict[key] = author.email || 'Not Found';
        }

        const combined = {
            link: filePath,
            title: paperJsonData.paper_title,
            author_email: authorEmailDict,
            abstract: paperJsonData.abstract,
            published_year: paperJsonData.publication_year || '',
            keywords: paperJsonData.keywords || [],
            publication_title: paperJsonData.journal_name || '',
            created_on: new Date().toISOString(),
            business_score: businessDic.abstracts[0].score,
            business_score_justification: businessDic.abstracts[0].justification,
            email
        };

        // Save to database
        const newPaper = new Paper({
            title: combined.title,
            abstract: combined.abstract,
            source: combined.link,
            publication_year: combined.published_year,
            journal: combined.publication_title,
            created_on: combined.created_on,
            email: combined.email,
        });


        const authorIds = [];
        for (const [fullname, email] of Object.entries(combined.author_email)) {
            if (email === 'Not Found') continue;

            const [firstname, lastname] = fullname.split('=');
            let author = await Author.findOne({ email });

            if (!author) {
                author = new Author({
                    firstname,
                    lastname,
                    email,
                    created_on: new Date()
                });
                await author.save();
            }

            authorIds.push(author._id);
        }

        newPaper.authors = authorIds; // Ensure authors are added to the Paper model
        await newPaper.save();

        const keywordIds = [];
        for (const keyword of combined.keywords) {
            if (keyword.trim()) {
                const newKeyword = new Keyword({
                    paper: newPaper._id,
                    keyword: keyword.trim()
                });
                await newKeyword.save();
                keywordIds.push(newKeyword._id); // Collect keyword IDs
            }
        }

        newPaper.keywords = keywordIds; // Ensure keywords are added to the Paper model
        await newPaper.save();

        // Save business score
        const newBusinessScore = new BusinessScore({
            paper: newPaper._id,
            business_score: combined.business_score,
            business_score_justification: combined.business_score_justification
        });
        await newBusinessScore.save();

        const businessScoreIds = [newBusinessScore._id]; // Collect business score IDs
        newPaper.business_scores = businessScoreIds; // Ensure business scores are added to the Paper model
        await newPaper.save();

        return NextResponse.json({
            filename: file.originalFilename,
            message: 'PDF uploaded successfully.',
            saved_path: filePath,
            pdf_text: text,
            json: paperJsonData,
            business_dic: businessDic,
            combined_data: combined,
            added_paper_response: {
                message: 'Paper and related entities added successfully.',
                paper_id: newPaper._id,
                author_ids: authorIds
            }
        }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
