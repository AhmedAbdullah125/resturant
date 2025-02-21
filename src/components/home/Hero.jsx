'use client'
import React, { useState, useEffect, useContext } from 'react'
import heroImg from '/public/hero.png'
import img9 from '/public/grid3.png';
import Image from 'next/image'
import Link from 'next/link'

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
export default function Hero() {

    return (
        <Swiper
            slidesPerView={4}
            spaceBetween={30}
            autoplay={true}
            dir={'ltr'}
            loop={true}
            modules={[Autoplay, Navigation, Pagination]}
            breakpoints={{
                1400: {
                    slidesPerView: 1,
                },
                1100: {
                    slidesPerView: 1,
                },
                767: {
                    slidesPerView: 1,
                },
                640: {
                    slidesPerView: 1,
                    autoplay: false,
                    spaceBetween: 16
                },
                100: {
                    slidesPerView: 1,
                    autoplay: false,
                    spaceBetween: 16
                }
            }}
        >
            <SwiperSlide >
                <div className="hero">
                    <Image src={heroImg} alt="Mazar" width={200} height={200} />
                    <div className="overlay">
                        <div className="heading">
                            <h4>Hello to Resturent</h4>
                            <h2>RESERVE YOUR TABLE</h2>
                            <div className="btns">
                                <Link href={'/menu'} className='book-link'>OPEN MENU</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide >
                <div className="hero">
                    <Image src={img9} alt="Mazar" width={200} height={200} />
                    <div className="overlay">
                        <div className="heading">
                            <h4>Hello to Resturent</h4>
                            <h2>RESERVE YOUR TABLE</h2>
                            <div className="btns">
                                <Link href={'/menu'} className='book-link'>OPEN MENU</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </SwiperSlide>

        </Swiper>
    )
}
