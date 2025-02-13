'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import img1 from '/public/san.png';
import Link from 'next/link';

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Testmonials() {

    return (
        <div className="Testmonials" >
            <div className="container mx-auto">
                <div className="test-cont-parent">
                    <div className="test-cont">
                        <div className="l-side">
                            <div className="sqr"></div>
                            <div className="rate-head">
                                <h2>4.8</h2>
                                <p>Based on 5000+ reviews</p>
                            </div>
                            <div className="stars-rates">
                                <div className="rate">
                                    <div className="stars">
                                        {
                                            Array.from({ length: 5 }, (_, index) => (
                                                <i key={index} className="active fa-solid fa-star" />
                                            ))
                                        }
                                    </div>
                                    <div className="prog-bar">
                                        <div className="prog" style={{ width: '95%' }}></div>
                                    </div>
                                    <span>95%</span>
                                </div>
                                <div className="rate">
                                    <div className="stars">
                                        {
                                            Array.from({ length: 5 }, (_, index) => (
                                                <i key={index} className={` fa-star ${index < 4 ? 'active fa-solid' : 'fa-regular'}`} />
                                            ))
                                        }
                                    </div>
                                    <div className="prog-bar">
                                        <div className="prog" style={{ width: '5%' }}></div>
                                    </div>
                                    <span>5%</span>
                                </div>
                                <div className="rate">
                                    <div className="stars">
                                        {
                                            Array.from({ length: 5 }, (_, index) => (
                                                <i key={index} className={` fa-star ${index < 3 ? 'active fa-solid' : 'fa-regular'}`} />
                                            ))
                                        }
                                    </div>
                                    <div className="prog-bar">
                                        <div className="prog" style={{ width: '0%' }}></div>
                                    </div>
                                    <span>0%</span>
                                </div>
                                <div className="rate">
                                    <div className="stars">
                                        {
                                            Array.from({ length: 5 }, (_, index) => (
                                                <i key={index} className={` fa-star ${index < 2 ? 'active fa-solid' : 'fa-regular'}`} />
                                            ))
                                        }
                                    </div>
                                    <div className="prog-bar">
                                        <div className="prog" style={{ width: '0%' }}></div>
                                    </div>
                                    <span>0%</span>
                                </div>
                                <div className="rate">
                                    <div className="stars">
                                        {
                                            Array.from({ length: 5 }, (_, index) => (
                                                <i key={index} className={` fa-star ${index < 1 ? 'active fa-solid' : 'fa-regular'}`} />
                                            ))
                                        }
                                    </div>
                                    <div className="prog-bar">
                                        <div className="prog" style={{ width: '0%' }}></div>
                                    </div>
                                    <span>0%</span>
                                </div>
                            </div>
                        </div>
                        <div className="r-side">
                            <Swiper
                                slidesPerView={1}
                                spaceBetween={0}
                                autoplay={true}
                                dir={'ltr'}
                                loop={true}
                                pagination={{
                                    clickable: true
                                }}
                                // navigation={true}
                                modules={[Autoplay, Navigation, Pagination]}

                            >

                                <SwiperSlide>
                                    <div className="test-wahed">
                                        <div className="rates">
                                            {
                                                Array.from({ length: 5 }, (_, index) => (
                                                    <i className="active fa-solid fa-star"  key={index}/>
                                                ))
                                            }
                                        </div>
                                        <p>Botanica rice crackers are a staple in my pantry. They are a healthier alternative to
                                            traditional crackers and chips, but still satisfy my craving for something spicy and
                                            crunchy. Chilli garlic flavor is my personal favorite - it's so delicious!"</p>
                                        <h3 className='name'>Ahmed - From California</h3>

                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="test-wahed">
                                        <div className="rates">
                                            {
                                                Array.from({ length: 5 }, (_, index) => (
                                                    <i className="active fa-solid fa-star"  key={index}/>
                                                ))
                                            }
                                        </div>
                                        <p>Botanica rice crackers are a staple in my pantry. They are a healthier alternative to
                                            traditional crackers and chips, but still satisfy my craving for something spicy and
                                            crunchy. Chilli garlic flavor is my personal favorite - it's so delicious!"</p>
                                        <h3 className='name'>Ahmed - From California</h3>

                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="test-wahed">
                                        <div className="rates">
                                            {
                                                Array.from({ length: 5 }, (_, index) => (
                                                    <i className="active fa-solid fa-star" key={index}/>
                                                ))
                                            }
                                        </div>
                                        <p>Botanica rice crackers are a staple in my pantry. They are a healthier alternative to
                                            traditional crackers and chips, but still satisfy my craving for something spicy and
                                            crunchy. Chilli garlic flavor is my personal favorite - it's so delicious!"</p>
                                        <h3 className='name'>Ahmed - From California</h3>

                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="test-wahed">
                                        <div className="rates">
                                            {
                                                Array.from({ length: 5 }, (_, index) => (
                                                    <i className="active fa-solid fa-star" key={index}/>
                                                ))
                                            }
                                        </div>
                                        <p>Botanica rice crackers are a staple in my pantry. They are a healthier alternative to
                                            traditional crackers and chips, but still satisfy my craving for something spicy and
                                            crunchy. Chilli garlic flavor is my personal favorite - it's so delicious!"</p>
                                        <h3 className='name'>Ahmed - From California</h3>

                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
