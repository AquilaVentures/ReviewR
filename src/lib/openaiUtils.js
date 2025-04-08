import OpenAI from 'openai';
import { config } from 'dotenv';

config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function extractSinglePaperMetadataOpenAI(paperText) {
    const prompt = `
You are a highly accurate academic metadata extractor.

Extract and return the following from the academic article text in proper JSON format.

Required fields:
- paper_title: string
- abstract: string (must be the full original abstract text, verbatim as written in the article)
- journal_name: string
- publication_year: string
- keywords: list of strings (if none found, return ["Not Found"])
- authors: list of objects, each with:
    - firstname: string or null
    - lastname: string or null
    - email: string or null

JSON Example:
{
  "paper_title": "...",
  "abstract": "...",
  "journal_name": "...",
  "publication_year": "March 2025",
  "keywords": ["..."],
  "authors": [
    {
      "firstname": "Alice",
      "lastname": "Johnson",
      "email": "alice@example.com"
    },
    {
      "firstname": "Not Found",
      "lastname": "Smith",
      "email": "Not Found"
    }
  ]
}

Only return valid JSON. Do not include extra text.

Here is the paper text:
"""${paperText}"""
`;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.2
        });

        console.log("OpenAI response:", response);

        const content = response.choices[0]?.message?.content || '';
        console.log("OpenAI content:", content);
        let metadata;
        try {
            metadata = JSON.parse(content);
        } catch (jsonError) {
            console.error("Error: OpenAI returned invalid JSON. Raw response:\n", content);
            return null;
        }

        // Ensure 'keywords' is valid
        if (!Array.isArray(metadata.keywords) || metadata.keywords.length === 0) {
            metadata.keywords = ["Not Found"];
        }

        return metadata;
    } catch (err) {
        console.error("OpenAI API error (metadata extraction):", err);
        return null;
    }
}

export async function getPapersScoreOpenAI(abstracts) {
    const maxPerBatch = 5;
    const promptTemplate = `
Evaluate the following abstracts and provide a JSON response with a score from 1 to 10 and a short justification. 
The score should follow a bell curve distribution and should be based on the practical value and impact on European early-stage ventures, especially startups.

Expected JSON Output Format:
{
  "abstracts": [
    {
      "abstract_id": 1,
      "score": <integer>,
      "justification": "<justification_text>"
    },
    {
      "abstract_id": 2,
      "score": <integer>,
      "justification": "<justification_text>"
    }
  ]
}

Only return valid JSON. Do not include any other text.\n\n
`;

    const allResults = { abstracts: [] };

    for (let i = 0; i < abstracts.length; i += maxPerBatch) {
        const batch = abstracts.slice(i, i + maxPerBatch);
        let prompt = promptTemplate;

        batch.forEach((abstract, index) => {
            prompt += `Abstract ${i + index + 1}: ${abstract}\n\n`;
        });

        try {
            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.3
            });

            const content = response.choices[0]?.message?.content || '';
            const parsed = JSON.parse(content);

            if (Array.isArray(parsed.abstracts)) {
                allResults.abstracts.push(...parsed.abstracts);
            } else {
                console.warn("Unexpected format in OpenAI response:", content);
            }
        } catch (err) {
            console.error("Error processing batch:", err);
        }
    }

    return allResults;
}
