import Image from 'next/image'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Heading from '../components/shared/Heading'
const Vision = () => {
    return (
        <>
            <section id='vision'>
                <Container className=" my-5">
                    <Row className="justify-content-between align-items-center">
                        <Col xs={12} lg={6} className="col-lg-6">
                            <div className="who py-2 py-lg-5">
                                <Heading heading={"WHO WE ARE "} />
                                <p className='text-justify'>
                                    We are an AI-driven platform revolutionizing the way academic insights power real-world innovation. By bridging top-tier research with startups hungry for growth, we accelerate peer review, publishing, and knowledge distribution—turning breakthroughs into business traction. Our mission is simple yet bold: transform the “dinosaur” industry of academic publishing and drive unstoppable progress for the next wave of tech leaders.
                                </p>
                            </div>
                        </Col>
                        <Col xs={12} lg={6}>
                            <div className=" text-center text-lg-end">
                                <Image
                                    src={"/earth.gif"}
                                    width={0}
                                    height={0}
                                    sizes="80vw"
                                    style={{ width: '80%', height: 'auto', borderRadius: "20px" }}
                                    alt='team'
                                    className='ms-auto'
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

        </>
    )
}

export default Vision