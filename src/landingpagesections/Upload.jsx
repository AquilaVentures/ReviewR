"use client"
import React, { useState } from 'react';
import { Col, Container, Row, Card, Spinner, Button, OverlayTrigger, Tooltip, Modal, Form } from 'react-bootstrap'; // Import Modal and Form
import { useDropzone } from "react-dropzone";
import { IoCloudUpload } from "react-icons/io5";
import { toast } from 'react-toastify';
import axios from 'axios';
import { marked } from 'marked';
import { MdClose } from "react-icons/md";

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
    const [showEmailModal, setShowEmailModal] = useState(false); // State to control modal visibility
    const [email, setEmail] = useState(''); // State to store user email

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file && file.name.toLowerCase().endsWith('.pdf')) {
            setSelectedFile(file);
            setFileInfo(`Selected file: ${file.name}`);
            toast.dismiss();
            setShowEmailModal(true); // Show modal to input email
        } else {
            toast.error('Please select a valid PDF file.');
            setSelectedFile(null);
            setFileInfo('');
        }
    };

    const handleUpload = async (file) => {
        const uploadFile = file || selectedFile;
        if (!uploadFile || !email) {
            toast.error("Please select a file and enter your email!");
            return;
        }

        const formData = new FormData();
        formData.append("file", uploadFile);
        formData.append("email", email); // Use user-provided email

        setLoadingReportSummary(true);
        setError(null);
        try {
            const res = await axios.post(`${baseURL}/upload-pdf/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("score review", res)
            const businessScore = res.data.business_dic?.abstracts?.[0]?.score;
            setReportContent(businessScore);
            setShowSubscriptionButton(true);
        } catch (err) {
            setError(null); // Clear error state
            toast.error(err.response ? err.response.data.detail : "An error occurred");
            setReportContent('');
            setEmail("")
        } finally {
            setLoadingReportSummary(false);
        }
    };

    const handleSubscription = () => {
        setIsSubscribed(true);
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

    const handleEmailSubmit = () => {
        setShowEmailModal(false); // Close modal
        handleUpload(selectedFile); // Proceed with file upload
    };

    const handleUserInterest = async (action) => {
        if (action === "join the waiting list" && email) {
            try {
                const response = await axios.post(`${baseURL}/waitlist/subscribe`, { email });

                toast.success("Successfully joined the waiting list!");

            } catch (error) {
                toast.error(error?.response?.data?.detail);
                console.error("Error:", error);
            }
        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: false });
    const agentOptions = [
        { id: 'grammar_language_review', label: 'Grammar Review', disabled: false },
        { id: 'limitations_future_work', label: 'Limitations & Future Work', disabled: true },
        { id: 'literature_review', label: 'Literature Review', disabled: true },
        { id: 'methodology_evaluation', label: 'Methodology', disabled: true },
        { id: 'originality_novelty', label: 'Originality & Novelty', disabled: true },
        { id: 'relevance_scope', label: 'Relevance & Scope', disabled: true },
        { id: 'data_results_validation', label: 'Data & Results Validation', disabled: true },
        { id: 'structure_formatting', label: 'Structure & Formatting', disabled: true },
        { id: 'abstract_review', label: 'Abstract Review', disabled: false },
        { id: 'citation_review', label: 'Citation Review', disabled: true },
        { id: 'python_code_agent007', label: 'Python Coding v1', disabled: true },
        { id: 'python_code_agent69', label: 'Python Coding v2', disabled: true }
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
                                {fileInfo && <p className="text-white mt-3 mb-0">{fileInfo}</p>}
                            </Card>
                        </div>
                    </Col>
                </Row>
                {loadingReportSummary && (
                    <div className="text-center mt-4">
                        <Spinner color='#ffa500' animation="border" style={{ color: "#ffa500" }} />
                    </div>
                )}
                {reportContent && typeof reportContent === 'number' && (
                    <Card className="mt-4 bg-transparent text-white text-center" style={{ border: "2px solid #ffa500" }}>
                        <Card.Body>
                            <h3 className='mb-0'>
                                {`Business Score: ${reportContent}`}
                            </h3>
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

                {isSubscribed && (
                    <Row className="mt-4 paper-upload">
                        {agentOptions.map(({ id, label, disabled }) => {
                            return (
                                <Col xs={6} md={4} className="mb-2" key={id}>
                                    <OverlayTrigger
                                        overlay={
                                            disabled ? (
                                                <Tooltip id={`tooltip-${id}`}>
                                                    You need to buy a subscription to use this feature.
                                                </Tooltip>
                                            ) : <></>
                                        }
                                    >
                                        <span >
                                            <Button
                                                onClick={() => handleAgentClick(id)}
                                                variant={activeAgent === id ? 'primary' : 'secondary'}
                                                className={activeAgent === id ? 'w-100 active-func' : 'w-100'}
                                                disabled={disabled}
                                                style={{
                                                    opacity: disabled ? 0.5 : 1,
                                                    cursor: disabled ? 'not-allowed' : 'pointer',
                                                    pointerEvents: disabled ? 'none' : 'auto'
                                                }}
                                            >
                                                {label}
                                            </Button>
                                        </span>
                                    </OverlayTrigger>
                                </Col>
                            );
                        })}
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
                    <div className="text-center mt-4">
                        <h4 className="text-white">🚀 Join the full beta waiting list or pre-order now with a 75% discount! 🚀</h4>
                        <p className="text-white">Get early access to premium features, advanced AI reviews, and more.</p>

                        <div className="mt-3">
                            <Col xs={7} className='mx-auto'>
                                <Row>
                                    <Col xs={6}>
                                        <Button
                                            variant="warning"
                                            className="py-2 w-100"
                                            onClick={() => handleUserInterest("join the waiting list")}
                                        >
                                            Join Waiting List
                                        </Button>
                                    </Col>
                                    <Col xs={6}>
                                        <Button
                                            variant="warning"
                                            className="py-2 w-100"
                                            onClick={() => handleUserInterest("pre-order with 75% discount")}

                                        >
                                            Pre-Order Now (75% Off)
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>

                        </div>

                    </div>
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

                <Modal show={showEmailModal} centered >

                    <Modal.Body className='herobg'>

                        <div className="text-end">
                            <MdClose onClick={() => setShowEmailModal(false)} color={"#ffa500"} size={20} style={{ cursor: "pointer" }} />
                        </div>
                        <Form>
                            <Form.Group controlId="emailInput">
                                <Form.Label className='text-white'>Email Address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='bg-transparent text-white'
                                />
                            </Form.Group>
                        </Form>
                        <div className="my-3 text-white text-end">
                            <Button variant="warning" onClick={handleEmailSubmit} disabled={!email}>
                                Submit
                            </Button>
                        </div>

                    </Modal.Body>

                </Modal>
            </Container>
        </div>
    );
};

export default Upload;
