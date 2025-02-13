'use client'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'; // Importing React to use JSX syntax and create components.
import logo from '../../../src/assets/images/home/logo.svg'
import axios from 'axios';
import { API_BASE_URL } from '../../lib/apiConfig';

export default function Footer() { // Defining the main functional component named 'Footer'.

    return (
        <footer id='footer'> {/* Main footer container with padding and background color */}

            <Link href={`https://wa.me/0123456789?text=Good%20Morning%20Foodi`} target="_blank" className="fixed-what">
                <i className="fa-brands fa-whatsapp"></i>
            </Link>
            <div className="container m-auto" id='footer'>
                <div className="content">
                    <div className="logo">
                        <Image src={logo} alt="Mazar" width={200} height={200} />
                    </div>
                    <div className="links">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/#about">About the Company</Link></li>
                            <li><Link href="/#contact">Contact Us</Link></li>
                        </ul>
                    </div>
                    <div className="links">
                        <h3>Contact Us</h3>
                        <ul>
                            <li><Link href={`tel:955764654667`} >955764654667</Link></li>
                            <li><Link href={`mailto:OyWZi@example.com`} >oyWZi@example.com</Link></li>
                        </ul>
                    </div>
                    <div className="links">
                        <h3>Social Media</h3>
                        <div className="social">
                            <Link href={'https://fb.com'} target='_blank'><i className={`fa-brands fa-facebook`}></i></Link>
                            <Link href={'https://instagram.com'} target='_blank'><i className={`fa-brands fa-instagram`}></i></Link>
                            <Link href={'https://linkedin.com'} target='_blank'><i className={`fa-brands fa-linkedin`}></i></Link>
                            <Link href={'https://twitter.com'} target='_blank'><i className={`fa-brands fa-twitter`}></i></Link>
                        </div>
                    </div>
                </div>
                <div className="served">
                    <i className="fa-regular fa-copyright"></i> 2025, All rights reserved for Foodi National Trading Company.
                </div>
            </div>
        </footer>
    )
}
