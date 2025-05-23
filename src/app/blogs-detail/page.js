"use client";
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { HiOutlineChevronDoubleLeft, HiOutlineChevronDoubleRight } from "react-icons/hi";

const BlogDetailPage = () => {
    const router = useRouter();

    const handleNextBlog = () => {
        router.push('/blogs-detail?blogId=next');
    };

    const handlePreviousBlog = () => {
        router.push('/blogs-detail?blogId=previous');
    };

    return (
        <div className="counterbg">

            <Container className="py-5">

                <Row className="pt-5">
                    <Button className="nav-btn d-flex align-items-center  justify-content-start" onClick={() => router.push("/")}>
                        <HiOutlineChevronDoubleLeft className="me-2" /> Back
                    </Button>
                    <Col>



                        <h1 className="fw-bold">Blog Title</h1>
                        <p className="text-white">By Author Name | 27 March 2024</p>
                    </Col>
                </Row>
                <Row className="my-4">
                    <Col>
                        <Image
                            src="/card-1.svg"
                            alt="Blog Image"
                            width={800}
                            height={400}
                            style={{ width: '100%', height: '400px', borderRadius: '10px' }}
                        />
                    </Col>
                </Row>
                <Row className='mt-4'>
                    <Col>
                        <p className='fs-4 text-white'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                            lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod
                            malesuada. Nulla facilisi. Sed ut perspiciatis unde omnis iste natus
                            error sit voluptatem accusantium doloremque laudantium.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                            lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod
                            malesuada. Nulla facilisi. Sed ut perspiciatis unde omnis iste natus
                            error sit voluptatem accusantium doloremque laudantium.
                        </p>
                        <p className='fs-4 text-white'>
                            Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
                            suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                            lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod
                            malesuada. Nulla facilisi. Sed ut perspiciatis unde omnis iste natus
                            error sit voluptatem accusantium doloremque laudantium.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                            lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod
                            malesuada. Nulla facilisi. Sed ut perspiciatis unde omnis iste natus
                            error sit voluptatem accusantium doloremque laudantium.
                        </p>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col className="d-flex justify-content-between">
                        <Button className="nav-btn" onClick={handlePreviousBlog}>
                            <HiOutlineChevronDoubleLeft className="me-2" /> Previous Blog
                        </Button>
                        <Button className="nav-btn" onClick={handleNextBlog}>
                            Next Blog <HiOutlineChevronDoubleRight className="ms-2" />
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default BlogDetailPage;
