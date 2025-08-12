"use client";
import React, { useState } from 'react';
import { Container, Row, Col, Card, Spinner, Modal, Form, Button } from 'react-bootstrap';
import { useDropzone } from "react-dropzone";
import { IoCloudUpload } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { toast } from 'react-toastify';

const SecondUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileInfo, setFileInfo] = useState('');
    const [loading, setLoading] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [email, setEmail] = useState('');

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file && file.name.toLowerCase().endsWith('.pdf')) {
            setSelectedFile(file);
            setFileInfo(`Selected file: ${file.name}`);
            toast.dismiss();
            setShowEmailModal(true);
        } else {
            toast.error('Please select a valid PDF file.');
            setSelectedFile(null);
            setFileInfo('');
        }
    };

    const handleSubmit = async () => {
        if (!email || !selectedFile) return;

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('pdf', selectedFile);
            formData.append('email', email);

            const response = await fetch('/api/parse-pdf', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                toast.success("PDF and email sent successfully!");
                setShowEmailModal(false);
                setSelectedFile(null);
                setFileInfo('');
                setEmail('');
            } else {
                toast.error(data.error || "Failed to send PDF and email.");
            }
        } catch (err) {
            console.error("Submission failed:", err);
            toast.error("An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: false });

    const handleClearSheet = async () => {
        if (!window.confirm('Are you sure you want to clear all data from the sheet? This cannot be undone.')) {
          return;
        }
      
        setLoading(true);
        try {
          const response = await fetch('/api/parse-pdf', {
            method: 'DELETE',
          });
      
          const data = await response.json();
          if (response.ok) {
            toast.success("Sheet cleared successfully!");
          } else {
            toast.error(data.error || "Failed to clear sheet.");
          }
        } catch (err) {
          console.error("Clear failed:", err);
          toast.error("An unexpected error occurred.");
        } finally {
          setLoading(false);
        }
      };

    return (
        <div className='herobg py-5'>
            <Container className='py-5'>
            <Row className='mt-3'>
  <Col xs={12} className='text-center'>
    <Button 
      variant="danger" 
      onClick={handleClearSheet}
      disabled={loading}
    >
      {loading ? 'Clearing...' : 'Clear All Sheet Data'}
    </Button>
  </Col>
</Row>
                <div className="text-center mb-5">
                    <h2 className='fw-bold text-white'>Get Your AI-driven Review Here & Reach 1.000s of Startups</h2>
                    <p className='text-white my-3'>
                        Upload your research and we’ll immediately do an AI powered review. Determining its business value & relevance for startups and scale ups, while sharing with you high quality and fast academic peer review insights.
                    </p>
                </div>
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



                <Modal show={showEmailModal} centered>
                    <Modal.Body className='herobg'>
                        <div className="text-end">
                            <MdClose
                                onClick={() => setShowEmailModal(false)}
                                color={"#ffa500"}
                                size={20}
                                style={{ cursor: "pointer" }}
                            />
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
                            <Button
                                variant="warning"
                                onClick={handleSubmit}
                                disabled={!email || loading}
                            >
                                {loading ? 'Sending...' : 'Submit'}
                            </Button>
                        </div>
                    </Modal.Body>
                </Modal>
            </Container>
        </div>
    );
};

export default SecondUpload;
