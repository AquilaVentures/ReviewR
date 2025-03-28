import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

const NewsLetter = () => {
    return (
        <div className="pressbg pressborder py-5 newsletter-bg" id='subscribe'>
            <Container>
                <Row>
                    <Col xs={12} lg={8} className='mx-auto'>
                        <div className='text-center py-4'>
                            <h2 className='fw-bold text-white'>Subscribe to our Newsletter</h2>
                            <p className='text-white my-3'>
                                Stay updated with the latest news, trends, and updates. Subscribe to our newsletter and never miss out on important insights and offers.
                            </p>
                            <Form className='d-flex justify-content-center mt-4'>
                                <div className='newsletterouter' style={{ display: "flex", alignItems: "center", border: "1px solid #FFB300", borderRadius: "60px", padding: "5px 8px" }}>
                                    <Form.Control
                                        type='email'
                                        placeholder='Enter your email'
                                        className='me-2 bg-transparent border-0 text-white newsletterinput'
                                        style={{ flex: 1, outline: "none" }}
                                    />
                                    <Button className="newsletterbtn py-2 px-4" type="submit">
                                        Subscribe
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default NewsLetter;