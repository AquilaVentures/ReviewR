"use client";
import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewsLetter = () => {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loadingToastId = toast.loading("Submitting...");
        try {
            const response = await axios.post(`${baseURL}/newsletter/subscribe`, { email }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            toast.update(loadingToastId, { render: response.data.message || 'Thank you for subscribing!', type: "success", isLoading: false, autoClose: 3000 });
            setEmail('');
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.response?.data?.detail;
            if (errorMessage === "Email is already subscribed.") {
                toast.update(loadingToastId, { render: "You are already subscribed to the newsletter.", type: "info", isLoading: false, autoClose: 3000 });
            } else {
                toast.update(loadingToastId, { render: errorMessage || 'An error occurred. Please try again later.', type: "error", isLoading: false, autoClose: 3000 });
            }
        }
    };

    return (
        <div className="pressbg pressborder py-5 newsletter-bg" id="subscribe">
            <Container>
                <Row>
                    <Col xs={12} lg={8} className="mx-auto">
                        <div className="text-center py-4">
                            <h2 className="fw-bold text-white">Join Our Newsletter & Earn While You Learn!</h2>
                            <p className="text-white my-3">
                                Be the first to get cutting-edge insights into AI-driven startup research and academic innovation.
                                Stay in the loop on breakthrough discoveries, industry disruptions, and the future of venture building —
                                all delivered straight to your inbox. <br />
                                Ready to outsmart the AI with your reviews and get rewarded for it? Subscribe now!
                            </p>
                            <Form className="d-flex justify-content-center mt-4" onSubmit={handleSubmit}>
                                <div
                                    className="newsletterouter"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        border: "1px solid #FFB300",
                                        borderRadius: "60px",
                                        padding: "5px 8px",
                                    }}
                                >
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your email"
                                        className="me-2 bg-transparent border-0 text-white newsletterinput"
                                        style={{ flex: 1, outline: "none" }}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <Button className="newsletterbtn py-2 px-4" type="submit">
                                        Subscribe
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </Col>
                </Row>
                <hr className="text-white" />
            </Container>
            <ToastContainer />
        </div>
    );
};

export default NewsLetter;
