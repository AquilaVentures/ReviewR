"use client"
import React from 'react';
import Image from 'next/image';
import Heading from '../components/shared/Heading';
import { Container} from 'react-bootstrap';
import vision from "../assets/essence/vision.jpeg";
import forging from "../assets/essence/forging.jpeg";
import dynamic from "../assets/essence/dynamic.jpeg";
import canvas from "../assets/essence/canvas.jpeg";
import empower from "../assets/essence/empower.jpeg";
import artist from "../assets/essence/artist.jpeg";
import sculping from "../assets/essence/sculping.jpeg";
const honeycombData = [
  { id: 1, imageUrl: vision, title: 'AI-driven progress' },
  { id: 2, imageUrl: dynamic, title: 'Boost startup success' },
  { id: 3, imageUrl: forging, title: 'Global knowledge network' },
  { id: 4, imageUrl: canvas, title: 'Relentless learning' },
  { id: 5, imageUrl: empower, title: 'Power of network effects' },
  { id: 6, imageUrl: artist, title: 'Speedy Expert Insights' },
  { id: 7, imageUrl: sculping, title: 'Seamless Industry Bridge ' },
];

const Essence = () => {



  return (
    <>
      <section id='essence' className='py-5'>
        <Container>
          <Heading heading={"WHAT SETS US APART"} />
          <div className="outercomb pt-3 pb-5">
            <ul className="honeycomb">
              {honeycombData.map(item => (
                <li
                  key={item.id}
                  className="honeycomb-cell"
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

  

    </>
  );
};

export default Essence;
