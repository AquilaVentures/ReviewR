import { NextResponse } from 'next/server';
import pdfParse from 'pdf-parse';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  try {
    const body = await req.arrayBuffer();
    const buffer = Buffer.from(body);

    const data = await pdfParse(buffer);
    return NextResponse.json({ text: data.text });
  } catch (error) {
    console.error("PDF parse error:", error);
    return NextResponse.json({ error: 'Failed to parse PDF' }, { status: 500 });
  }
}
