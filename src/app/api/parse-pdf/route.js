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

async function getSheetId(spreadsheetId, sheetName, auth) {
  const sheets = google.sheets({ version: 'v4', auth });
  const response = await sheets.spreadsheets.get({ spreadsheetId });
  const sheet = response.data.sheets.find((s) => s.properties.title === sheetName);
  return sheet?.properties?.sheetId;
}

async function appendToSheet(text, email) {
  const auth = getAuth();
  const sheets = google.sheets({ version: 'v4', auth });
  const now = new Date().toISOString();

  // Step 1: Append data with timestamp
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: `${SHEET_NAME}!A:C`,
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [[text, email, now]],
    },
  });

  // Step 2: Sort sheet by timestamp (Column C / index 2)
  const sheetId = await getSheetId(SHEET_ID, SHEET_NAME, auth);

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: SHEET_ID,
    requestBody: {
      requests: [
        {
          sortRange: {
            range: {
              sheetId,
              startRowIndex: 1, // skip header
              startColumnIndex: 0,
              endColumnIndex: 3,
            },
            sortSpecs: [
              {
                dimensionIndex: 2, // timestamp column index
                sortOrder: 'DESCENDING',
              },
            ],
          },
        },
      ],
    },
  });
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
    const extractedText = data.text.trim();

    await appendToSheet(extractedText, email);

    return NextResponse.json({ text: extractedText });
  } catch (error) {
    console.error('Error processing request:', error.message);
    return NextResponse.json({ error: 'Failed to process PDF' }, { status: 500 });
  }
}
