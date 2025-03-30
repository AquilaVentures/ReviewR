"use client"
import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewsLetter = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/newsletter', { email });
            toast.success(response.data.message || 'Thank you for subscribing!');
            setEmail('');
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'An error occurred. Please try again later.';
            toast.error(errorMessage);
        }
    };

    return (
        <div className="pressbg pressborder pb-5 newsletter-bg" id='subscribe'>
            <Container>
                <Row>
                    <Col xs={12} lg={8} className='mx-auto'>
                        <div className='text-center py-4'>
                            <h2 className='fw-bold text-white'>Subscribe to our Newsletter</h2>
                            <p className='text-white my-3'>
                                Stay updated with the latest news, trends, and updates. Subscribe to our newsletter and never miss out on important insights and offers.
                            </p>
                            <Form className='d-flex justify-content-center mt-4' onSubmit={handleSubmit}>
                                <div className='newsletterouter' style={{ display: "flex", alignItems: "center", border: "1px solid #FFB300", borderRadius: "60px", padding: "5px 8px" }}>
                                    <Form.Control
                                        type='email'
                                        placeholder='Enter your email'
                                        className='me-2 bg-transparent border-0 text-white newsletterinput'
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
                <hr className='text-white' />
            </Container>
            <ToastContainer />
        </div>
    );
};

export default NewsLetter;