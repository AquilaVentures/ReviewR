"use client";
import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Subscribers = () => {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loadingToastId = toast.loading("Submitting...");
        try {
            const response = await axios.post(`${baseURL}/subscribers`, { email }, {
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
                            <h2 className="fw-bold text-white">Give more qualitative reviews than our AI and GET PAID!</h2>
                            <p className="text-white my-3">
                                Stay updated with the latest AI-driven startup research and insights by the best academics in the world. Follow the journey of academic breakthroughs, the disruption of a dinosaur industry, and never miss out on a scientific breakthrough that could give you an edge while building your venture!
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

export default Subscribers;
