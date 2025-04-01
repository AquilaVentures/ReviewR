"use client";
import React, { useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import image from "../../public/card-1.svg";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
const Blogs = () => {
    const [swiper, setSwiper] = useState(null);
    const [prevEl, setPrevEl] = useState(null);
    const [nextEl, setNextEl] = useState(null);
    const router = useRouter();
    const slidesData = [
        {
            title: "Data Scientist",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            students: "500+ students",
            duration: "01h 30m",
            rating: "4.0",
            image: image
        },
        {
            title: "Machine Learning",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            students: "800+ students",
            duration: "02h 00m",
            rating: "4.5",
            image: image
        },
        {
            title: "AI Engineering",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            students: "600+ students",
            duration: "01h 45m",
            rating: "4.7",
            image: image
        },
        {
            title: "Deep Learning",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            students: "700+ students",
            duration: "02h 15m",
            rating: "4.8",
            image: image
        },
    ];

    return (
        <>
            <div className="counterbg blogsbg" id='blogs'>

                <Container className='py-5'>
                    <hr className='text-white' />
                    <div className="text-center my-4">
                        <h2 className='fw-bold text-white'>OUR BLOGS</h2>
                        <p className='text-white my-3'>
                        Stay updated with the Latest AI driven Startup Trends & Insights
                        </p>
                    </div>
                    <Swiper
                        modules={[Autoplay, Navigation, Pagination]}
                        spaceBetween={20}
                        slidesPerView={3}
                        loop={true}
                        autoplay={{ delay: 2000, disableOnInteraction: false }}
                        navigation={{ prevEl, nextEl }}
                        pagination={false}
                        onSwiper={setSwiper}
                        breakpoints={{
                            320: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                    >
                        {slidesData.map((slide, index) => (
                            <SwiperSlide key={index}>
                                <Card className="rounded-4 my-3 p-2 bootcamp-card" onClick={()=>router.push("/blogs-detail")} style={{ cursor: "pointer" }}>
                                    <div
                                        style={{
                                            width: "100%",
                                            height: "230px",
                                            overflow: "hidden",
                                            borderRadius: "20px",
                                        }}
                                    >
                                        <Image
                                            src={slide.image}
                                            alt="course thumbnail"
                                            width={0}
                                            height={0}
                                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                        />
                                    </div>
                                    <Card.Body className="mt-2">
                                        <Card.Title >{slide.title}</Card.Title>
                                        <Card.Text className="text-white">{slide.text}</Card.Text>

                                        <hr className="text-white" />

                                        <div className="d-flex gap-3 align-items-center author">
                                            <Image
                                                src={slide.image}
                                                alt="course thumbnail"
                                                width={60}
                                                height={60}
                                                style={{ width: "50px", height: "50px", borderRadius: "60px", objectFit: "cover", overflow: "hidden" }}
                                            />

                                            <div>
                                                <h6 className="m-0">Geay Walker</h6>
                                                <p className="m-0 text-white">27 March 2024</p>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <Row className="align-items-center">
                        <Col xs={12} lg={12}>
                            <div className="d-flex gap-3 justify-content-center align-items-center mt-3">
                                <button ref={setPrevEl} className="swiper-button-prev-custom">
                                    <GrFormPreviousLink />
                                </button>
                                <button ref={setNextEl} className="swiper-button-next-custom">
                                    <GrFormNextLink />
                                </button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Blogs
