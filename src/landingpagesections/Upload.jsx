"use client"
import React, { useState } from 'react';
import { Col, Container, Row, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { useDropzone } from "react-dropzone";
import { IoCloudUpload } from "react-icons/io5";
import { marked } from 'marked';

const Upload = () => {
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

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
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

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div className='herobg py-5'>
            <Container className='pt-5'>
                <div className="text-center mb-5">
                    <h2 className='fw-bold text-white'>Seamlessly Analyze Your Business Documents</h2>
                    <p className='text-white my-3'>
                        Upload your files to get instant insights and business relevance scores powered by AI.
                    </p>
                </div>
                <Row className='mt-4'>
                    <Col xs={12} lg={8} className='mx-auto text-center'>
                        <div className="drop-container">
                            <Card className="bg-transparent text-center py-5" style={{ border: "3px dashed #ffa500", cursor: "pointer" }}>
                                <div {...getRootProps()} className="">
                                    <input {...getInputProps()} />
                                    <IoCloudUpload size={40} color='#ffa500' />
                                    <p className="text-white">Drag & drop files here, or click to select files</p>
                                </div>
                                {fileInfo && <p className="text-white mt-3">{fileInfo}</p>}
                            </Card>
                        </div>
                    </Col>
                </Row>

                {successMessage && <Alert variant="success" className="text-center mt-4">{successMessage}</Alert>}
                <Row className="mt-4">
                    {agentOptions.map(({ id, label }) => (
                        <Col xs={6} md={4} className="mb-2" key={id}>
                            <Button
                                onClick={() => handleAgentClick(id)}
                                variant={activeAgent === id ? 'primary' : 'secondary'}
                                className="w-100"
                                disabled={disabledAgents.includes(id)}
                            >
                                {label}
                            </Button>
                        </Col>
                    ))}
                </Row>
                {loading && (
                    <div className="text-center mt-4">
                        <Spinner animation="border" variant="primary" />
                    </div>
                )}
                {flashMessage && <Alert variant="danger" className="text-center mt-4">{flashMessage}</Alert>}
                {reportContent && (
                    <Card className="mt-4">
                        <Card.Body>
                            <div dangerouslySetInnerHTML={{ __html: reportContent }} />
                        </Card.Body>
                    </Card>
                )}
            </Container>
        </div>
    );
};

export default Upload;
