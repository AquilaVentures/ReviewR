"use client";
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import Link from 'next/link';
import { navItems } from './NavItems';
import Sidebar from './Sidebar';

const Header = () => {
    const [scrolling, setScrolling] = useState(false);
    const [activeButton, setActiveButton] = useState(null);
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const handleOffcanvasClose = () => setShowOffcanvas(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolling(window.scrollY > 60);

            navItems.forEach((item, index) => {
                const element = document.getElementById(item.href.slice(1));
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 60 && rect.bottom >= 60) {
                        setActiveButton(index);
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, []);

    const handleSetActive = (index) => {
        setActiveButton(index);
        setShowOffcanvas(false);
    };

    const navbarStyle = {
        backgroundColor: scrolling ? '#002338' : 'rgba(0, 0, 0, 0.4)',
        borderBottom: scrolling ? '3px solid #D7BA89' : 'none',
    };

    return (
        <>
            <Navbar expanded={false} expand="lg" fixed="top" variant="dark" style={navbarStyle} className={scrolling ? 'scrolled py-3' : 'py-3'}>
                <Container>
                    <Link href="#home" passHref className="text-decoration-none">
                        <div>
                            <div>
                                {/* <Image src={logo} width={160} height={60} alt='logo' /> */}
                            </div>
                            <div>
                                <h3 className='logotext mt-2'><span className='text-white'>REVIEW</span>R</h3>
                            </div>
                        </div>
                    </Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setShowOffcanvas(!showOffcanvas)} />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="m-auto">
                            {navItems.map((item, index) => (
                                <Link key={index} href={item.href} passHref className={`nav-link-wrapper text-decoration-none mx-3 ${activeButton === index ? 'active' : 'nonactive'}`}>
                                    {item.label}
                                    <div className="underline mt-1"></div>
                                </Link>
                            ))}
                        </Nav>
                        <Link href='#subscribe' passHref>
                            <Button variant="mailing">Subscribe</Button>
                        </Link>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Sidebar
                navItems={navItems}
                showOffcanvas={showOffcanvas}
                handleOffcanvasClose={handleOffcanvasClose}
                activeButton={activeButton}
                handleClick={(index) => handleSetActive(index)}
            />
        </>
    );
};

export default Header;
