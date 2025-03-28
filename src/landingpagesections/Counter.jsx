"use client"
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import CounterCards from "../components/landingpagecomponents/CounterCards"
import projects from "../assets/counter/tick.svg"
import drawing from "../assets/counter/drawing.svg"
import client from "../assets/counter/client.svg"
import reviews from "../assets/counter/star.svg"
const Counter = () => {
    const counters = [
        { image: projects, end: 5000, suffix: '+', label: 'Researchers' },
        { image: drawing, end: 100, suffix: '%', label: 'happy clients' },
        { image: client, end: 25, suffix: '+', label: 'universities' },
        { image: reviews, end: 100000, suffix: '+', label: 'AI reviews' }
    ];
    return (

        <div className="counterbg py-5" >
            <Container>
                <Row>
                    {counters.map((counter, index) => (
                        <Col key={index} xs={12} md={6} lg={3}>
                            <CounterCards
                                image={counter.image}
                                text={counter.label}
                                end={counter.end}
                                suffix={counter.suffix}
                            />

                        </Col>
                    ))}
                </Row>
            </Container>

        </div>
    )
}

export default Counter