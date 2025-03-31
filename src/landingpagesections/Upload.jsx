"use client"
import React, { useState } from 'react';
import { Col, Container, Row, Card, Spinner } from 'react-bootstrap';
import { useDropzone } from "react-dropzone";
import { IoCloudUpload } from "react-icons/io5";
import { toast } from 'react-toastify';
import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
console.log("baseURL", baseURL)
const Upload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileInfo, setFileInfo] = useState('');
    const [reportContent, setReportContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file && file.name.toLowerCase().endsWith('.pdf')) {
            setSelectedFile(file);
            setFileInfo(`Selected file: ${file.name}`);
            toast.dismiss();
        } else {
            toast.error('Please select a valid PDF file.');
            setSelectedFile(null);
            setFileInfo('');
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            toast.error("Please select a file first!");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        setLoading(true);
        setError(null);
        try {
            const res = await axios.post(`${baseURL}/upload-pdf/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            const businessScore = res.data.business_dic?.abstracts?.[0]?.score; // Extract the score
            setReportContent(businessScore); // Set only the score
        } catch (err) {
            setError(err.response ? err.response.data.detail : "An error occurred");
            setReportContent('');
        } finally {
            setLoading(false);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: false });

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
                                    <p className="text-white">Check your paper on business relevance and get a blog posted about it?</p>
                                    <p className="text-white">Drag & drop files here, or click to select files</p>
                                </div>
                                {fileInfo && <p className="text-white mt-3">{fileInfo}</p>}
                            </Card>
                        </div>
                        <button
                            onClick={handleUpload}
                            className="btn btn-warning mt-3"
                            disabled={loading}
                        >
                            {loading ? "Uploading..." : "Upload PDF"}
                        </button>
                    </Col>
                </Row>
                {loading && (
                    <div className="text-center mt-4">
                        <Spinner color='#ffa500' animation="border" style={{ color: "#ffa500" }} />
                    </div>
                )}
                {reportContent && (
                    <Card className="mt-4 bg-transparent text-white text-center" style={{ border: "2px solid #ffa500" }}>
                        <Card.Body>
                            <h3 className='mb-0'>Business Score: {reportContent}</h3> {/* Display only the score */}
                        </Card.Body>
                    </Card>
                )}
                {error && (
                    <div className="text-center mt-4 text-danger">
                        <p>{error}</p>
                    </div>
                )}
            </Container>
        </div>
    );
};

export default Upload;
