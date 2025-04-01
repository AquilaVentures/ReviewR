"use client"
import React, { useState } from 'react';
import { Col, Container, Row, Card, Spinner, Button } from 'react-bootstrap';
import { useDropzone } from "react-dropzone";
import { IoCloudUpload } from "react-icons/io5";
import { toast } from 'react-toastify';
import axios from 'axios';
import { marked } from 'marked';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const secondBaseURL = process.env.NEXT_PUBLIC_SECOND_BASE_URL;
const Upload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileInfo, setFileInfo] = useState('');
    const [reportContent, setReportContent] = useState('');
    const [loadingReportSummary, setLoadingReportSummary] = useState(false);
    const [loadingDetailedReport, setLoadingDetailedReport] = useState(false);
    const [error, setError] = useState(null);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [activeAgent, setActiveAgent] = useState(null);
    const [disabledAgents, setDisabledAgents] = useState([]);
    const [showSubscriptionButton, setShowSubscriptionButton] = useState(false);
    const [loadingSubscription, setLoadingSubscription] = useState(false); // New state for subscription loading

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file && file.name.toLowerCase().endsWith('.pdf')) {
            setSelectedFile(file);
            setFileInfo(`Selected file: ${file.name}`);
            toast.dismiss();
            handleUpload(file); 
        } else {
            toast.error('Please select a valid PDF file.');
            setSelectedFile(null);
            setFileInfo('');
        }
    };

    const handleUpload = async (file) => {
        const uploadFile = file || selectedFile;
        if (!uploadFile) {
            toast.error("Please select a file first!");
            return;
        }

        const formData = new FormData();
        formData.append("file", uploadFile);

        setLoadingReportSummary(true);
        setError(null);
        try {
            const res = await axios.post(`${baseURL}/upload-pdf/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            const businessScore = res.data.business_dic?.abstracts?.[0]?.score;
            setReportContent(businessScore);
            setShowSubscriptionButton(true);
        } catch (err) {
            setError(null); // Clear error state
            toast.error(err.response ? err.response.data.detail : "An error occurred");
            setReportContent('');
        } finally {
            setLoadingReportSummary(false);
        }
    };

    const handleSubscription = () => {
        setLoadingSubscription(true); // Set loading state to true
        setTimeout(() => {
            setIsSubscribed(true);
            setLoadingSubscription(false); // Reset loading state after subscription is activated
        }, 2000); // Simulate a delay for the subscription process
    };

    const handleClear = () => {
        setSelectedFile(null);
        setFileInfo('');
        setReportContent('');
        setLoadingReportSummary(false);
        setLoadingDetailedReport(false);
        setError(null);
        setIsSubscribed(false);
        setActiveAgent(null);
        setDisabledAgents([]);
        setShowSubscriptionButton(false);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: false });
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

    const handleAgentClick = async (agentId) => {
        if (!selectedFile) {
            toast.error('Please upload a PDF file first.');
            return;
        }

        setActiveAgent(agentId);
        setDisabledAgents(agentOptions.map((agent) => agent.id).filter(id => id !== agentId));
        setLoadingDetailedReport(true);
        toast.dismiss();

        const formData = new FormData();
        formData.append('pdf_file', selectedFile);
        formData.append('agent', agentId);

        try {
            const response = await axios.post(`${secondBaseURL}/process`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setLoadingDetailedReport(false);
            setDisabledAgents([]);

            if (response.status === 200) {
                toast.success('Review completed successfully.');
                setReportContent(marked.parse(response.data.report_content.replace(/\n{2,}/g, '\n\n')));
            } else if (response.data.error && response.data.error.includes('Incorrect API key provided')) {
                toast.error('Invalid OpenAI API key. Please check your API key configuration.');
            } else {
                toast.error(response.data.error || 'An error occurred while processing the file.');
            }
        } catch (error) {
            setLoadingDetailedReport(false);
            setDisabledAgents([]);
            setError(null);
            if (error.response && error.response.status === 401) {
                toast.error('Invalid OpenAI API key. Please check your API key configuration.');
            } else {
                toast.error('An unexpected error occurred.');
            }
            console.error('Error:', error);
        }
    };

    return (
        <div className='herobg py-5'>
            <Container className='pt-5'>
                <div className="text-center mb-5">
                    <h2 className='fw-bold text-white'>Get Your AI-driven Review Here & Reach 1.000s of Startups</h2>
                    <p className='text-white my-3'>
                        Upload your research and we’ll immediately do an AI powered review. Determining its business value & relevance for startups and scale ups, while sharing with you high quality and fast academic peer review insights.
                    </p>
                </div>
                <Row className='mt-4'>
                    <Col xs={12} lg={8} className='mx-auto text-center'>
                        <div className="drop-container">
                            <Card className="bg-transparent text-center p-5" style={{ border: "3px dashed #ffa500", cursor: "pointer" }}>
                                <div {...getRootProps()} className="">
                                    <input {...getInputProps()} />
                                    <IoCloudUpload size={40} color='#ffa500' />
                                    <p className="text-white">Get rigorous academic feedback, while highly relevant research get shared with the community through AI driven blogs, newsletters, interviews and blogposts. </p>
                                    <p className="text-white m-0">Drag & drop files here, or click to select files</p>
                                </div>
                                {fileInfo && <p className="text-white mt-3">{fileInfo}</p>}
                            </Card>
                        </div>
                    </Col>
                </Row>
                {loadingReportSummary && (
                    <div className="text-center mt-4">
                        <Spinner color='#ffa500' animation="border" style={{ color: "#ffa500" }} />
                    </div>
                )}
                <div className="text-center">
                    {showSubscriptionButton && (
                        <div>
                            <button
                                className="btn btn-warning mt-3"
                                onClick={handleSubscription}
                                disabled={loadingSubscription} // Disable button while loading
                            >
                                {loadingSubscription ? "Reviewing..." : "Review My Research"} {/* Update button text */}
                            </button>
                        </div>
                    )}

                </div>
                {reportContent && typeof reportContent === 'number' && (
                    <Card className="mt-4 bg-transparent text-white text-center" style={{ border: "2px solid #ffa500" }}>
                        <Card.Body>
                            <h3 className='mb-0'>
                                {reportContent <= 6
                                    ? "Thank you for uploading your research."
                                    : reportContent <= 8
                                        ? "Great study! Let's see how we can share it with our community."
                                        : "Thank you for uploading"
                                }
                            </h3>
                        </Card.Body>
                    </Card>
                )}

                {isSubscribed && (
                    <Row className="mt-4 paper-upload">
                        {agentOptions.map(({ id, label }) => (
                            <Col xs={6} md={4} className="mb-2" key={id}>
                                <Button
                                    onClick={() => handleAgentClick(id)}
                                    variant={activeAgent === id ? 'primary' : 'secondary'}
                                    className={activeAgent === id ? 'w-100 active-func' : 'w-100'}
                                    disabled={disabledAgents.includes(id)}
                                >
                                    {label}
                                </Button>
                            </Col>
                        ))}
                    </Row>
                )}
                {loadingDetailedReport && (
                    <div className="text-center mt-4">
                        <Spinner color='#ffa500' animation="border" style={{ color: "#ffa500" }} />
                    </div>
                )}
                {reportContent && typeof reportContent !== 'number' && (
                    <Card className="mt-4 bg-transparent text-white" style={{ border: "2px solid #ffa500" }}>
                        <Card.Body>
                            <div dangerouslySetInnerHTML={{ __html: reportContent }} />
                        </Card.Body>
                    </Card>
                )}
                {reportContent && (
                    <div className="text-center">
                        <button
                            onClick={handleClear}
                            className="btn btn-warning mt-3"
                        >
                            Clear
                        </button>
                    </div>
                )}

            </Container>
        </div>
    );
};

export default Upload;
