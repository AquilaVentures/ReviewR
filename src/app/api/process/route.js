import { NextResponse } from 'next/server';
import { createReadStream } from 'fs';
import { OpenAI } from 'openai';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import path from 'path';
import fs from 'fs/promises';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Task-to-Prompt Mapping
const TASK_PROMPT_MAPPING = {
  'grammar_language_review': 'agent_language_prompt.txt',
  'limitations_future_work': 'agent_limitation.txt',
  'literature_review': 'agent_literature.txt',
  'methodology_evaluation': 'agent_methodology.txt',
  'originality_novelty': 'agent_novelty.txt',
  'relevance_scope': 'agent_relevance.txt',
  'data_results_validation': 'agent_result_validation.txt',
  'structure_formatting': 'agent_structure.txt',
  'abstract_review': 'agent_abstract.txt',
  'citation_review': 'agent_citation.txt',
  'python_code_agent007': 'agent007_prompt.txt',
  'python_code_agent69': 'agent69_prompt.txt'
};

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('pdf_file');
    const task = formData.get('agent');

    if (!file || !task) {
      return NextResponse.json(
        { error: 'File and task are required' },
        { status: 400 }
      );
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'uploads');
    try {
      await fs.mkdir(uploadsDir, { recursive: true });
    } catch (err) {
      console.error('Error creating uploads directory:', err);
    }

    // Save the file
    const buffer = await file.arrayBuffer();
    const filename = `${Date.now()}_${file.name}`;
    const filePath = path.join(uploadsDir, filename);
    await fs.writeFile(filePath, Buffer.from(buffer));

    // Read the PDF content
    const loader = new PDFLoader(filePath);
    const docs = await loader.load();
    const pdfText = docs.map(doc => doc.pageContent).join('\n\n');

    // Get the prompt
    const promptsDir = path.join(process.cwd(), 'prompts');
    const promptFileName = TASK_PROMPT_MAPPING[task];
    if (!promptFileName) {
      await fs.unlink(filePath);
      return NextResponse.json(
        { error: 'Invalid task selected' },
        { status: 400 }
      );
    }

    const promptPath = path.join(promptsDir, promptFileName);
    let prompt;
    try {
      prompt = await fs.readFile(promptPath, 'utf-8');
    } catch (err) {
      await fs.unlink(filePath);
      return NextResponse.json(
        { error: 'Prompt file not found' },
        { status: 400 }
      );
    }

    // Combine prompt and PDF text
    const combinedPrompt = `${prompt}\n\n${pdfText}`;

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: combinedPrompt }
      ],
      max_tokens: 16384,
      temperature: 0.2
    });

    // Clean up - remove the uploaded file
    try {
      await fs.unlink(filePath);
    } catch (err) {
      console.error('Error removing uploaded file:', err);
    }

    return NextResponse.json({
      report_content: response.choices[0].message.content
    });

  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred' },
      { status: 500 }
    );
  }
}