import { promises as fs } from 'fs';
import pdf from 'pdf-parse';

export async function extractTextFromFirstPage(filePath) {
    try {
        const dataBuffer = await fs.readFile(filePath);
        const data = await pdf(dataBuffer, { max: 1 });
        return data.text;
    } catch (error) {
        console.error('Error extracting text from PDF:', error);
        throw error;
    }
}