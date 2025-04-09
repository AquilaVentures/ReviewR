import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { extractTextFromFirstPage } from '@/lib/pdfUtils';
import { getPromptForTask } from '@/lib/prompts';
import fs from 'fs';
import path from 'path';

const openai = new OpenAI(process.env.OPENAI_API_KEY);


export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('pdf_file');
        const task = formData.get('agent');

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        if (!task) {
            return NextResponse.json({ error: 'No task selected' }, { status: 400 });
        }

        const tempDir = path.join(process.cwd(), 'tmp');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }
        const buffer = await file.arrayBuffer();
        const filename = `${Date.now()}-${file.name}`;
        const filePath = path.join(tempDir, filename);
        fs.writeFileSync(filePath, Buffer.from(buffer));

        // Get the prompt
        const prompt = await getPromptForTask(task);
        if (!prompt) {
            fs.unlinkSync(filePath);
            return NextResponse.json({ error: `Prompt for task "${task}" not found` }, { status: 400 });
        }

        // Extract text from PDF
        const pdfText = await extractTextFromFirstPage(filePath);

        // Combine prompt and text
        const combinedPrompt = `${prompt}\n\n${pdfText}`;

        // Call OpenAI API
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                { role: "system", content: combinedPrompt }
            ],
            temperature: 0.2
        });

        // Clean up
        fs.unlinkSync(filePath);

        // Return response
        const reportContent = response.choices[0].message.content.trim();
        return NextResponse.json({ report_content: reportContent });

    } catch (error) {
        console.error('Error processing file:', error);
        return NextResponse.json(
            { error: error.message || 'An error occurred during processing' },
            { status: 500 }
        );
    }
}