"use client";
import React, { useState } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { useDropzone } from "react-dropzone";
import { IoCloudUpload } from "react-icons/io5";
import { toast } from 'react-toastify';

const SecondUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileInfo, setFileInfo] = useState('');
    const [reportContent, setReportContent] = useState('');
    const [loading, setLoading] = useState(false);

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
        setLoading(true);
        try {
            const response = await fetch('/api/parse-pdf', {
                method: 'POST',
                body: file,
            });

            const data = await response.json();
            if (response.ok) {
                const formattedText = data?.text?.replace(/\n/g, "<br/>");
                setReportContent(formattedText);
            } else {
                toast.error(data.error || "Failed to extract text.");
            }
        } catch (err) {
            console.error("Upload failed:", err);
            toast.error("An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: false });

    return (
        <div className='herobg py-5'>
            <Container>
                <Row className='mt-4'>
                    <Col xs={12} lg={9} className='mx-auto text-center'>
                        <Card className="bg-transparent text-center p-5" style={{ border: "3px dashed #ffa500", cursor: "pointer" }}>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <IoCloudUpload size={40} color='#ffa500' />
                                <p className="text-white m-0">Drag & drop PDF here, or click to select</p>
                            </div>
                            {fileInfo && <p className="text-white mt-3 mb-0">{fileInfo}</p>}
                        </Card>
                    </Col>
                </Row>

                {loading && (
                    <div className="text-center mt-4">
                        <Spinner animation="border" style={{ color: "#ffa500" }} />
                    </div>
                )}

                {reportContent && (
                    <Card className="mt-4 bg-transparent text-white" style={{ border: "2px solid #ffa500" }}>
                        <Card.Body>
                            <div dangerouslySetInnerHTML={{ __html: reportContent }} />
                        </Card.Body>
                    </Card>
                )}
            </Container>
        </div>
    );
};

export default SecondUpload;
