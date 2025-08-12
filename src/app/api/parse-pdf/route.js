import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import pdfParse from 'pdf-parse';

const SHEET_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
const SHEET_NAME = process.env.NEXT_PUBLIC_GOOGLE_SHEET_NAME;

function getAuth() {
  return new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n').replace(/"/g, '').trim(),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}

function extractMetadata(text) {
  // Normalize the text by converting to lowercase for case-insensitive matching
  const normalizedText = text.toLowerCase();
  
  // Initialize metadata with default values
  const metadata = {
    title: 'Not Found',
    authors: 'Not Found',
    abstract: 'Not Found',
    keywords: 'Not Found',
    journal: 'Not Found',
    year: 'Not Found',
    fullText: text.substring(0, 500) + '...'
  };

  // Patterns now match case-insensitive versions
  const patterns = {
    title: /title:\s*(.*?)(\n|$)/i,
    abstract: /abstract:\s*(.*?)(\n|$)/i,
    authors: /authors?:\s*(.*?)(\n|$)/i,
    journal: /journal:\s*(.*?)(\n|$)/i,
    year: /publication year:\s*(.*?)(\n|$)/i,
    keywords: /keywords:\s*(.*?)(\n|$)/i
  };

  // Extract each field using the patterns
  for (const [field, pattern] of Object.entries(patterns)) {
    const match = normalizedText.match(pattern);
    if (match && match[1]) {
      // Use the original text to get the proper casing for the value
      const originalMatch = text.substring(match.index).match(new RegExp(pattern.source, 'i'));
      if (originalMatch && originalMatch[1]) {
        metadata[field] = originalMatch[1].trim();
      }
    }
  }

  // Clean up keywords if found
  if (metadata.keywords !== 'Not Found') {
    metadata.keywords = metadata.keywords.split(/\s*,\s*/).join(', ');
  }

  return metadata;
}

async function appendToSheet(metadata, email) {
  const auth = getAuth();
  const sheets = google.sheets({ version: 'v4', auth });
  const now = new Date();
  const formattedDate = now.toLocaleString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  // Prepare the row data with all metadata fields
  const rowData = [
    metadata.title,
    metadata.authors,
    metadata.abstract,
    metadata.keywords,
    metadata.journal,
    metadata.year,
    email,
    formattedDate,
    // metadata.fullText
  ];

  try {
    // First, check if the sheet exists and has headers
    const headerResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A1:I1`,
    });

    const existingHeaders = headerResponse.data.values;
    
    // If no headers exist, add them
    if (!existingHeaders || existingHeaders.length === 0) {
      await sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: `${SHEET_NAME}!A1:I1`,
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
          values: [[
            'Title',
            'Authors',
            'Abstract',
            'Keywords',
            'Journal',
            'Publication Year',
            'Submitter Email',
            'Timestamp',
            // 'Full Text Excerpt'
          ]],
        },
      });
    }

    // Then append the new data
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A:I`,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [rowData],
      },
    });
  } catch (error) {
    console.error('Error appending to sheet:', error);
    throw error;
  }
}
export async function POST(req) {
  try {
    const formData = await req.formData();
    const pdfFile = formData.get('pdf');
    const email = formData.get('email');

    if (!pdfFile || !email) {
      return NextResponse.json({ error: 'Missing file or email' }, { status: 400 });
    }

    const buffer = Buffer.from(await pdfFile.arrayBuffer());
    const data = await pdfParse(buffer);
    const extractedText = data.text;

    // Extract metadata from the text
    const metadata = extractMetadata(extractedText);

    // Append structured data to sheet
    await appendToSheet(metadata, email);

    return NextResponse.json({ 
      success: true,
      metadata: metadata
    });
  } catch (error) {
    console.error('Error processing request:', error.message);
    return NextResponse.json({ error: 'Failed to process PDF' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const auth = getAuth();
    const sheets = google.sheets({ version: 'v4', auth });

    await sheets.spreadsheets.values.clear({
      spreadsheetId: process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID,
      range: `${process.env.NEXT_PUBLIC_GOOGLE_SHEET_NAME}!A:Z`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error clearing sheet:', error);
    return NextResponse.json({ error: 'Failed to clear sheet' }, { status: 500 });
  }
}