"use client"
import React from "react";
import {Col, Container, Row } from "react-bootstrap";
import { FaLinkedin } from "react-icons/fa6";
import { IoMailUnreadSharp } from "react-icons/io5";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const links = [
    {
      id: 1,
      link: "#",
      icon: <FaLinkedin size={24} className="text-white" />,
    },
   
  ];

  return (
    <>
      <footer className="pressbg" >
        <Container className="py-3">
          <Row className="align-items-center">
            <Col xs={12} lg={6}>
              <div className="text-center text-lg-start">
                <h5 className="text-white fw-bold">
                REVIEW<span>R</span>
                </h5>
              </div>
            </Col>
          </Row>
          <hr className="text-white" />
          <Row>
            <Col xs={12} lg={6}>
              <div className="text-lg-start text-center my-2 d-flex justify-content-lg-start justify-content-center gap-3">
                {links.map((service, index) => (
                  <Link target="_blank" href={service.link} key={index}>
                    {service.icon}
                  </Link>
                ))}
              </div>
            </Col>
            <Col xs={12} lg={6}>
              <div className="text-lg-end text-center my-2">
                <p className="m-0 text-white">
                  © {currentYear} REVIEWR. All rights reserved.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
      <style jsx>{`
        .pressbg {
          background-color: #000;
        }
        .global-btn {
          border-color: #28a745;
          color: #28a745;
        }
        .global-btn:hover {
          background-color: #28a745;
          color: #fff;
        }
      `}</style>
    </>
  );
};

export default Footer;