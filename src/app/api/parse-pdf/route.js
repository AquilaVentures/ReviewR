import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import pdfParse from 'pdf-parse';


const SHEET_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
const SHEET_NAME = process.env.NEXT_PUBLIC_GOOGLE_SHEET_NAME;


async function appendToSheet(text, email) {
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY
      .replace(/\\n/g, '\n') // Handle newlines
      .replace(/"/g, '')      // Remove any lingering quotes
      .trim(),                // Remove whitespace
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
console.log("email",email)
  const sheets = google.sheets({ version: 'v4', auth });

  const response = await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: `${SHEET_NAME}!A:B`,
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [[text, email]],
    },
  });

  return response;
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const pdfFile = formData.get('pdf');
    const email = formData.get('email');

    const buffer = Buffer.from(await pdfFile.arrayBuffer());
    const data = await pdfParse(buffer);
    const extractedText = data.text;

    await appendToSheet(extractedText, email);

    return NextResponse.json({ text: extractedText });
  } catch (error) {
    console.error('Error:', error.message);
    return NextResponse.json({ error: 'Failed to process PDF' }, { status: 500 });
  }
}
