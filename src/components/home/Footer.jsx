'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'; // Importing React to use JSX syntax and create components.
import logo from '../../../src/assets/images/home/logo.svg'
import Loading from '../../app/loading';
import axios from 'axios';
import { API_BASE_URL } from '../../lib/apiConfig';



export default function Footer() { // Defining the main functional component named 'Footer'.

    return (
        <footer id='footer'> {/* Main footer container with padding and background color */}


            <Link href={`https://wa.me/0123456789?text=Good%20Morning%20Alalaa`} target="_blank" className="fixed-what">
                <i className="fa-brands fa-whatsapp"></i>
            </Link>
            <div className="container m-auto" id='footer'>
                <div className="content">
                    <div className="logo">
                        <Image src={logo} alt="Mazar" width={200} height={200} />
                    </div>
                    <div className="links">
                        <h3>روابط سريعة</h3>
                        <ul>
                            <li><Link href="/">الرئيسية</Link></li>
                            <li><Link href="/#about">عن الشركة</Link></li>
                            <li><Link href="/#contact">تواصل معنا</Link></li>
                        </ul>
                    </div>
                    <div className="links">
                        <h3>تواصل معنا</h3>
                        <ul>

                            <li><Link href={`tel:955764654667`} >955764654667</Link></li>
                            <li><Link href={`mailto:OyWZi@example.com`} >oyWZi@example.com</Link></li>

                        </ul>
                    </div>
                    <div className="links">
                        <h3>مواقع التواصل</h3>
                        <div className="social">

                            <Link href={'htts://fb.com'} target='_blank'><i className={`fa-brands fa-facebook`}></i></Link>
                            <Link href={'htts://fb.com'} target='_blank'><i className={`fa-brands fa-instagram`}></i></Link>
                            <Link href={'htts://fb.com'} target='_blank'><i className={`fa-brands fa-linkedin`}></i></Link>
                            <Link href={'htts://fb.com'} target='_blank'><i className={`fa-brands fa-twitter`}></i></Link>


                        </div>
                    </div>
                </div>
                <div className="served">
                    <i className="fa-regular fa-copyright"></i> 2025,جميع الحقوق محفوظة لشركة الالاء الوطنية التجارية
                </div>
            </div>

        </footer>
    )
}
