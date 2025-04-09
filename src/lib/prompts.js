import fs from 'fs';
import path from 'path';

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

export async function getPromptForTask(task) {
    const promptFileName = TASK_PROMPT_MAPPING[task];
    if (!promptFileName) return null;

    const promptPath = path.join(
        process.cwd(),
        'public',
        'prompts',
        promptFileName
    );

    try {
        const prompt = await fs.promises.readFile(promptPath, 'utf-8');
        return prompt;
    } catch (error) {
        console.error(`Error reading prompt file ${promptFileName}:`, error);
        return null;
    }
}