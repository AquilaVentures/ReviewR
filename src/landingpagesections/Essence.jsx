"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Heading from '../components/shared/Heading';
import { Container, Modal, Button } from 'react-bootstrap';
import vision from "../assets/essence/vision.jpeg";
import forging from "../assets/essence/forging.jpeg";
import dynamic from "../assets/essence/dynamic.jpeg";
import canvas from "../assets/essence/canvas.jpeg";
import empower from "../assets/essence/empower.jpeg";
import artist from "../assets/essence/artist.jpeg";
import sculping from "../assets/essence/sculping.jpeg";
import { ClipLoader } from 'react-spinners';

const honeycombData = [
  { id: 1, imageUrl: vision, title: 'VISIONARY ARCHITECTURE' },
  { id: 2, imageUrl: dynamic, title: 'DYNAMIC DESIGNS CRAFTING' },
  { id: 3, imageUrl: forging, title: 'FORGING FUTURE PATH' },
  { id: 4, imageUrl: canvas, title: 'DESIGN CANVAS' },
  { id: 5, imageUrl: empower, title: 'EMPOWERING CREATIVITY' },
  { id: 6, imageUrl: artist, title: 'ARTISTRY IN CREATION' },
  { id: 7, imageUrl: sculping, title: 'CONCEPTUAL SCULPTING ' },
];

const Essence = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [loading, setLoading] = useState(true);

  const handleShowModal = (image, title) => {
    setSelectedImage(image);
    setSelectedTitle(title);
    setShowModal(true);
    setLoading(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage(null);
    setSelectedTitle('');
  };

  return (
    <>
      <section id='essence' className='pt-3'>
        <Container>
          <Heading heading={"WHAT SETS US APART"} />
          <div className="outercomb pt-3 pb-5">
            <ul className="honeycomb">
              {honeycombData.map(item => (
                <li
                  key={item.id}
                  className="honeycomb-cell"
                  onClick={() => handleShowModal(item.imageUrl, item.title)}
                >
                  <Image
                    className="honeycomb-cell__image"
                    src={item.imageUrl}
                    sizes="80vw"
                    width={0}
                    height={0}
                    alt={item.title}
                  />
                  <div className="honeycomb-cell__title px-2">{item.title}</div>
                </li>
              ))}
              <li className="honeycomb-cell honeycomb__placeholder"></li>
            </ul>
          </div>
        </Container>
      </section>

      <Modal show={showModal} onHide={handleCloseModal} className='image-enlarge' centered >
        <Modal.Header closeButton className='bg-transparent'>
        </Modal.Header>
        <Modal.Body className='bg-transparent'>
          {loading && (
            <div className="loader-container">
              <ClipLoader color="#d7ba89" />
            </div>
          )}
          {selectedImage && (
            <Image
              src={selectedImage}
              alt={selectedTitle}
              layout="responsive"
              width={700}
              height={475}
              onLoadingComplete={() => setLoading(false)}
            />
          )}
        </Modal.Body>
      </Modal>

    </>
  );
};

export default Essence;
