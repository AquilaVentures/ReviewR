"use client"
import Link from 'next/link';
import React from 'react';
import moment from 'moment';
import Image from 'next/image';
const Footer = () => {
    const currentYear = moment().format('YYYY');

    const headings = {
        letterSpacing: "1.2px",
        lineHeight: "1.2",
        padding: "20px 0",
        color: "white"
    };
    const social = {
        color: "white",

    }
    return (
        <>
            <footer style={{ background: "#002338" }}>
                <div className="container py-4">

                    <div className="row">
                        <div className="col-lg-4 text-start">
                            {/* <Image src="footerlogo.png" width={0} height={0} style={{ width: "100%", height: "100%" }} alt='footerlogo' /> */}
                        </div>
                        <div className="col-lg-3">
                            <h5 style={headings}>WE OFFER</h5>
                            <div className='py-2'>
                                <span className="text-white" href="" style={{ textDecoration: "none" }}>Web Development</span>
                            </div>
                            <div className='py-2'>
                                <span className="text-white" href="" style={{ textDecoration: "none" }}>App Development</span>
                            </div>
                            <div className='py-2'>
                                <span className="text-white" href="" style={{ textDecoration: "none" }}>Project Management</span>
                            </div>
                            <div className='py-2'>
                                <span className="text-white" href="" style={{ textDecoration: "none" }}>Blockchain Development</span>
                            </div>
                            <div className='py-2'>
                                <span className="text-white" href="" style={{ textDecoration: "none" }}>Saas Service</span>
                            </div>
                            <div className='py-2'>
                                <span className="text-white" href="" style={{ textDecoration: "none" }}>Graphic Design</span>
                            </div>


                        </div>
                        <div className="col-lg-2">
                            <h5 style={headings}>PAGES</h5>
                            <div className='py-2'>
                                <Link className="text-white" href="/" style={{ textDecoration: "none" }}>Home</Link>
                            </div>
                            <div className='py-2'>
                                <Link className="text-white" href="/about" style={{ textDecoration: "none" }}>About Us</Link>
                            </div>
                            <div className='py-2'>
                                <Link className="text-white" href="/services" style={{ textDecoration: "none" }}>Services</Link>
                            </div>
                            <div className='py-2'>
                                <Link className="text-white" href="/casestudies" style={{ textDecoration: "none" }}>Case Studies</Link>
                            </div>
                            <div className='py-2'>
                                <Link className="text-white" href="/pricing" style={{ textDecoration: "none" }}>Pricing</Link>
                            </div>
                            <div className='py-2'>
                                <Link className="text-white" href="/contact" style={{ textDecoration: "none" }}>Contact Us</Link>
                            </div>


                        </div>
                        <div className="col-lg-3">
                            <h5 style={headings}>SOCIALS</h5>
                            <div className="sociallinks">


                                <div className="row pb-3">
                                    <div className="col-2">
                                        <div className="social">
                                            <a href="https://pk.linkedin.com/company/semantictribe" style={social}>
                                                <svg width="30" height="30" className='footertext' fill="#FFFFFF" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M20.82 1.5H3.294c-.957 0-1.794.69-1.794 1.635v17.566c0 .951.837 1.799 1.794 1.799h17.521c.963 0 1.685-.854 1.685-1.8V3.136c.006-.946-.722-1.635-1.68-1.635ZM8.01 19.005H5V9.65h3.01v9.354ZM6.61 8.228h-.022c-.963 0-1.586-.716-1.586-1.613C5.002 5.7 5.642 5 6.626 5c.984 0 1.587.695 1.608 1.614 0 .897-.624 1.613-1.625 1.613Zm12.395 10.777h-3.009V13.89c0-1.225-.438-2.063-1.526-2.063-.832 0-1.324.563-1.543 1.111-.082.197-.104.465-.104.739v5.328H9.815V9.65h3.008v1.301c.438-.623 1.122-1.52 2.713-1.52 1.975 0 3.469 1.301 3.469 4.108v5.465Z"></path>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <a href="https://instagram.com/semantictribe?igshid=OGQ5ZDc2ODk2ZA==" style={social}>
                                            <svg width="30" height="30" className='footertext' fill="#FFFFFF" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16.375 3.25a4.388 4.388 0 0 1 4.375 4.375v8.75a4.388 4.388 0 0 1-4.375 4.375h-8.75a4.389 4.389 0 0 1-4.375-4.375v-8.75A4.388 4.388 0 0 1 7.625 3.25h8.75Zm0-1.75h-8.75C4.256 1.5 1.5 4.256 1.5 7.625v8.75c0 3.369 2.756 6.125 6.125 6.125h8.75c3.369 0 6.125-2.756 6.125-6.125v-8.75c0-3.369-2.756-6.125-6.125-6.125Z"></path>
                                                <path d="M17.688 7.625a1.313 1.313 0 1 1 0-2.625 1.313 1.313 0 0 1 0 2.625Z"></path>
                                                <path d="M12 8.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Zm0-1.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5Z"></path>
                                            </svg>
                                        </a>
                                    </div>
                                    <div className="col-2">
                                        <a href="https://www.facebook.com/semanticnerds/" style={social}>
                                            <svg width="30" height="30" className='footertext' fill="#FFFFFF" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" d="M22.5 12.063c0-5.799-4.702-10.5-10.5-10.5s-10.5 4.7-10.5 10.5c0 5.24 3.84 9.584 8.86 10.373v-7.337H7.692v-3.037h2.666V9.75c0-2.63 1.568-4.085 3.966-4.085 1.15 0 2.351.205 2.351.205v2.584h-1.324c-1.304 0-1.712.81-1.712 1.64v1.97h2.912l-.465 3.036H13.64v7.337c5.02-.788 8.859-5.131 8.859-10.373Z" clip-rule="evenodd"></path>
                                            </svg>
                                        </a>
                                    </div>
                                    <div className="col-2">
                                        <a href="https://twitter.com/SemanticTribe" style={social}>
                                            <svg width="30" height="30" className='footertext' fill="#FFFFFF" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M23.25 5.133a9.46 9.46 0 0 1-2.65.717 4.57 4.57 0 0 0 2.03-2.512c-.908.53-1.9.903-2.932 1.101A4.647 4.647 0 0 0 16.327 3c-2.55 0-4.615 2.034-4.615 4.542a4.37 4.37 0 0 0 .119 1.036A13.158 13.158 0 0 1 2.315 3.83a4.485 4.485 0 0 0-.627 2.283c0 1.574.821 2.967 2.062 3.782a4.57 4.57 0 0 1-2.1-.567v.056c0 2.204 1.595 4.036 3.704 4.454a4.752 4.752 0 0 1-1.216.159c-.291 0-.582-.028-.868-.085.587 1.805 2.294 3.118 4.315 3.155a9.356 9.356 0 0 1-6.835 1.88A13.063 13.063 0 0 0 7.816 21c8.501 0 13.146-6.923 13.146-12.928 0-.197-.006-.394-.015-.586a9.304 9.304 0 0 0 2.303-2.353Z"></path>
                                            </svg>
                                        </a>
                                    </div>

                                </div>

                                <div>
                                    <div className="row py-2">
                                        <div className="col-lg-2 col-1 pt-4">
                                            <svg width="30" height="30" fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 1.5c-4.14 0-7.5 3.024-7.5 6.75 0 6 7.5 14.25 7.5 14.25s7.5-8.25 7.5-14.25c0-3.726-3.36-6.75-7.5-6.75ZM12 12a3 3 0 1 1 0-5.999A3 3 0 0 1 12 12Z"></path>
                                            </svg>
                                        </div>
                                        <div className="col-lg-10 col-10">
                                            <div className="location text-white">
                                                USA: Connecticut 06880
                                                pi box 25 larkspur Ca 94977
                                                <div className='pt-1'>

                                                    PAK : 48 C MODEL TOWN LAHORE
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row py-2">
                                        <div className="col-lg-2 col-1">
                                            <svg width="30" height="30" fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M22.45 17.35c-.244-.26-1.108-1.031-2.697-2.05-1.6-1.03-2.78-1.67-3.118-1.82a.18.18 0 0 0-.183.023 59.029 59.029 0 0 0-1.513 1.248c-.317.273-.317.273-.578.188-.457-.15-1.878-.905-3.117-2.146-1.238-1.241-2.032-2.698-2.182-3.155-.085-.26-.085-.26.188-.578.042-.05.823-.967 1.249-1.512a.18.18 0 0 0 .022-.184c-.149-.339-.79-1.518-1.819-3.118-1.02-1.588-1.79-2.451-2.05-2.696a.183.183 0 0 0-.183-.04 15.11 15.11 0 0 0-2.625 1.192 15.844 15.844 0 0 0-2.28 1.61.18.18 0 0 0-.06.176c.098.456.566 2.362 2.02 5.002 1.482 2.694 2.51 4.075 4.687 6.245 2.177 2.17 3.601 3.259 6.299 4.742 2.64 1.453 4.546 1.921 5.002 2.018a.181.181 0 0 0 .176-.059 15.83 15.83 0 0 0 1.61-2.28c.48-.835.88-1.714 1.193-2.625a.184.184 0 0 0-.04-.181Z"></path>
                                            </svg>
                                        </div>
                                        <div className="col-lg-8 col-10">
                                            <div className="location text-white">
                                                <a style={{ textDecoration: "none", color: "white" }} href="tel:+1 4156899833">+1 (415) 689-9833</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row py-2">
                                        <div className="col-lg-2 col-1">
                                            <svg width="30" height="30" fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21.75 3.75H2.25a.75.75 0 0 0-.75.75v15a.75.75 0 0 0 .75.75h19.5a.75.75 0 0 0 .75-.75v-15a.75.75 0 0 0-.75-.75Zm-9.29 9.592a.75.75 0 0 1-.92 0l-7.342-5.71.92-1.184L12 11.8l6.882-5.352.92 1.184-7.342 5.71Z"></path>
                                            </svg>
                                        </div>
                                        <div className="col-lg-8 col-10">
                                            <div className="location text-white">
                                                <a style={{ textDecoration: "none", color: "white" }} href="mailto:Info@semantictribe.com">Info@semantictribe.com</a>

                                            </div>
                                        </div>
                                    </div>

                                </div>


                            </div>
                        </div>
                    </div>
                </div>
                <hr style={{ color: "white" }} />

                <div className="container py-3">

                    <div className="row justify-content-between">
                        <div className="col-lg-4 col-12 text-md-start text-center">
                            <span className='text-white'>© {currentYear} Copyright: </span>
                            <Link className="text-white" href="" style={{ textDecoration: "none" }}>Sementictribe.com</Link>
                        </div>
                        <div className="col-lg-4 text-md-end text-center col-12">

                            <Link className="text-white" href="/privacy&policy" style={{ textDecoration: "none" }}>Privacy & Policy</Link>
                            <div class="vr mx-2 " style={{ color: "white" }}></div>
                            <Link className="text-white" href="/terms&conditions" style={{ textDecoration: "none" }}>Terms & Conditions</Link>
                        </div>
                    </div>
                </div>


            </footer>
        </>
    );
};

export default Footer;
