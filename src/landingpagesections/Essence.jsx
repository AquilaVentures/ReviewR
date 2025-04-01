"use client"
import React from 'react';
import Image from 'next/image';
import Heading from '../components/shared/Heading';
import { Container } from 'react-bootstrap';
import hex1 from "../../public/hex1.jpeg";
import hex2 from "../../public/hex2.jpeg";
import hex3 from "../../public/hex3.jpeg";
import hex4 from "../../public/hex4.jpeg";
import hex5 from "../../public/hex5.jpeg";
import hex6 from "../../public/hex6.jpeg";
import hex7 from "../../public/hex7.jpeg";
const honeycombData = [
  { id: 1, imageUrl: hex1, title: 'AI-driven progress' },
  { id: 2, imageUrl: hex2, title: 'Boost startup success' },
  { id: 3, imageUrl: hex3, title: 'Global knowledge network' },
  { id: 4, imageUrl: hex4, title: 'Relentless learning' },
  { id: 5, imageUrl: hex5, title: 'Power of network effects' },
  { id: 6, imageUrl: hex6, title: 'Speedy Expert Insights' },
  { id: 7, imageUrl: hex7, title: 'Seamless Industry Bridge ' },
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
