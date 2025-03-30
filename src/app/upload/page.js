'use client';

import { useState } from 'react';
import { marked } from 'marked';

export default function PdfAgentInterface() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileInfo, setFileInfo] = useState('');
    const [flashMessage, setFlashMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [reportContent, setReportContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [activeAgent, setActiveAgent] = useState(null);
    const [disabledAgents, setDisabledAgents] = useState([]);

    const agentOptions = [
        { id: 'grammar_language_review', label: 'Grammar Review' },
        { id: 'limitations_future_work', label: 'Limitations & Future Work' },
        { id: 'literature_review', label: 'Literature Review' },
        { id: 'methodology_evaluation', label: 'Methodology' },
        { id: 'originality_novelty', label: 'Originality & Novelty' },
        { id: 'relevance_scope', label: 'Relevance & Scope' },
        { id: 'data_results_validation', label: 'Data & Results Validation' },
        { id: 'structure_formatting', label: 'Structure & Formatting' },
        { id: 'abstract_review', label: 'Abstract Review' },
        { id: 'citation_review', label: 'Citation Review' },
        { id: 'python_code_agent007', label: 'Python Coding v1' },
        { id: 'python_code_agent69', label: 'Python Coding v2' }
    ];

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            setSelectedFile(file);
            setFileInfo(`Selected file: ${file.name}`);
            setFlashMessage('');
        } else {
            setFlashMessage('Please select a valid PDF file.');
            setSelectedFile(null);
            setFileInfo('');
        }
    };

    const handleAgentClick = async (agentId) => {
        if (!selectedFile) {
            alert('Please upload a PDF file first.');
            return;
        }

        setActiveAgent(agentId);
        setDisabledAgents(agentOptions.map((agent) => agent.id).filter(id => id !== agentId));
        setLoading(true);
        setFlashMessage('');
        setSuccessMessage('');
        setReportContent('');

        const formData = new FormData();
        formData.append('pdf_file', selectedFile);
        formData.append('agent', agentId);

        try {
            const response = await fetch('http://localhost:5004/process', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            setLoading(false);
            setDisabledAgents([]);

            if (response.ok) {
                setSuccessMessage('Review completed successfully. See below:');
                setReportContent(marked.parse(result.report_content.replace(/\n{2,}/g, '\n\n')));
            } else {
                setFlashMessage(result.error || 'An error occurred while processing the file.');
            }
        } catch (error) {
            setLoading(false);
            setDisabledAgents([]);
            setFlashMessage('An unexpected error occurred.');
            console.error('Error:', error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md mt-5">
            <h2 className="text-2xl font-bold text-center my-4">PDF Agent Interface</h2>
            {flashMessage && <p className="text-red-500 text-center mb-2">{flashMessage}</p>}
            {successMessage && <p className="text-green-500 text-center mb-2">{successMessage}</p>}
            <div className="flex items-center gap-2 mb-4">
                <input type="file" accept=".pdf" onChange={handleFileChange} className="flex-grow border p-2 rounded" />
            </div>
            {fileInfo && <p className="text-sm text-gray-600 mb-4">{fileInfo}</p>}
            <div className="grid grid-cols-3 gap-3 mb-4">
                {agentOptions.map(({ id, label }) => (
                    <button
                        key={id}
                        onClick={() => handleAgentClick(id)}
                        className={`p-2 text-sm font-bold rounded ${activeAgent === id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                            } ${disabledAgents.includes(id) ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={disabledAgents.includes(id)}
                    >
                        {label}
                    </button>
                ))}
            </div>
            {loading && <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>}
            {reportContent && (
                <div className="border p-4 mt-4 bg-gray-50" dangerouslySetInnerHTML={{ __html: reportContent }} />
            )}
        </div>
    );
}
