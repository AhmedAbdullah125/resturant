'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import Marquee from '../ui/marquee';
import { cn } from '@/lib/utils';

import img1 from '/public/grid1.png';
import img2 from '/public/grid2.png';
import img3 from '/public/grid3.png';
import img4 from '/public/grid4.png';
import img5 from '/public/grid5.png';
import img6 from '/public/grid6.png';
import img7 from '/public/grid7.png';
import img8 from '/public/grid8.png';
import img9 from '/public/grid9.png';
import img10 from '/public/grid10.png';
import img11 from '/public/grid11.png';
import Link from 'next/link';
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function InstagramsImgs() {
    const [language, setLanguage] = useState('en');  // Default language is 'en'
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Define the headers with the selected language
            setLanguage(localStorage.getItem('lang'));
            const headers = {
                lang: localStorage.getItem('lang'), // Change language dynamically based on state
            };
        }
    }, []);
    const ReviewCard = ({
        url,
    }) => {
        return (
            <figure className={cn()} >
                <div className="part-cont" >
                    <Image src={url} alt="Mazar" width={200} height={200} />
                </div>
            </figure>
        );
    };
    const [activeTab, setActiveTab] = useState(4);
    let imgs =
        [
            { url: img3, rate: 4, price: "12$", category: 'Vegetables', name: "burger" },
            { url: img4, rate: 4, price: "12$", category: 'Vegetables', name: "burger" },
            { url: img2, rate: 4, price: "12$", category: 'Vegetables', name: "burger" },
            { url: img1, rate: 4, price: "12$", category: 'Vegetables', name: "burger" },
            // { url: img4, rate: 4, price: "12$", category: 'Vegetables', name: "burger" },
            // { url: img5, rate: 4, price: "12$", category: 'Vegetables', name: "burger" },
            // { url: img4, rate: 4, price: "12$", category: 'Vegetables', name: "burger" },
            // { url: img6, rate: 4, price: "12$", category: 'Vegetables', name: "burger" },
            // { url: img7, rate: 4, price: "12$", category: 'Meals', name: "burger" },
            { url: img8, rate: 4, price: "12$", category: 'Meals', name: "burger" },
            { url: img9, rate: 4, price: "12$", category: 'Meals', name: "burger" },
            { url: img10, rate: 4, price: "12$", category: 'Sandwiches', name: "burger" },
            { url: img11, rate: 4, price: "12$", category: 'Sandwiches', name: "burger" },

        ];

    return (
        <div className="instagrams">
            <div className="text-cont">
                <i className="fa-brands fa-instagram"></i>
                <h2>{language === 'en' ? 'follow us on instagram' : 'تابعنا على انستجرام'} @Foodi</h2>
                <h6>{language === 'en' ? 'Join our community to inspire your desires' : 'انضم إلى مجتمعنا لتحقيق أحلامك'}</h6>
            </div>
            <div className="marq" style={{ direction: 'ltr' }}>
                <div className="relative flex  w-full flex-col items-center gap-4 justify-center overflow-hidden  ">
                    <Marquee pauseOnHover className="[--duration:20s]">
                        {imgs.map((review, index) => (
                            <ReviewCard key={index} {...review} />
                        ))}
                    </Marquee>
                </div>
            </div>
        </div>

    )
}
