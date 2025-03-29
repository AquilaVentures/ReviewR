"use client"
import CounterCards from '@/components/shared/CounterCards';
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { AiOutlineCheckCircle, AiOutlineStar } from 'react-icons/ai';
import { FaUserGraduate, FaUniversity } from 'react-icons/fa';

const Counter = () => {
    const counters = [
        { icon: <AiOutlineCheckCircle size={100} />, end: 10000, suffix: '+', label: 'Researchers' },
        { icon: <AiOutlineStar size={100} />, end: 100, suffix: '%', label: 'Happy Clients' },
        { icon: <FaUniversity size={100} />, end: 25, suffix: '+', label: 'Universities' },
        { icon: <FaUserGraduate size={100} />, end: 100000, suffix: '+', label: 'AI Reviews' }
    ];

    return (
        <div className="counterbg pt-5">
            <Container>
                <Row>
                    {counters.map((counter, index) => (
                        <Col key={index} xs={12} md={6} lg={3}>
                            <CounterCards
                                icon={counter.icon}
                                text={counter.label}
                                end={counter.end}
                                suffix={counter.suffix}
                            />
                        </Col>
                    ))}
                </Row>
               
            </Container>
        </div>
    );
}

export default Counter;
