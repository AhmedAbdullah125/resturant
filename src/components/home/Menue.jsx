'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
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

export default function Menue() {
    const [activeTab, setActiveTab] = useState(4);
    let imgs =
        [
            { url: img3, rate: 4, price: "12$", category: 'Vegetables', name: "burger" },
            { url: img4, rate: 4, price: "12$", category: 'Vegetables', name: "burger" },
            { url: img2, rate: 4, price: "12$", category: 'Vegetables', name: "burger" },
            { url: img1, rate: 4, price: "12$", category: 'Vegetables', name: "burger" },
            { url: img4, rate: 4, price: "12$", category: 'Vegetables', name: "burger" },
            { url: img4, rate: 4, price: "12$", category: 'Vegetables', name: "burger" },
            { url: img6, rate: 4, price: "12$", category: 'Vegetables', name: "burger" },
            { url: img7, rate: 4, price: "12$", category: 'Meals', name: "burger" },
            { url: img8, rate: 4, price: "12$", category: 'Meals', name: "burger" },
            { url: img9, rate: 4, price: "12$", category: 'Meals', name: "burger" },
            { url: img10, rate: 4, price: "12$", category: 'Sandwiches', name: "burger" },
            { url: img11, rate: 4, price: "12$", category: 'Sandwiches', name: "burger" },
        ];
    let tabs = [
        { id: 1, name: "Vegetables", className: "fa-solid fa-leaf" },
        { id: 2, name: "Meals", className: "fa-solid fa-bowl-food" },
        { id: 3, name: "Sandwiches", className: "fa-solid fa-burger" },
        { id: 4, name: "All", className: "fa-solid fa-utensils" }
    ]
    return (
        <div className="menue">
            <div className="container m-auto">
                <h2>Out Fresh Products</h2>
                <div className="tabs">
                    {
                        tabs.map((item, index) =>
                            <div className={`tab ${activeTab == item.id ? 'active-tab' : ''}`} key={index} onClick={() => setActiveTab(item.id)}>
                                <i className={item.className}></i>
                                <h4>{item.name}</h4>
                            </div>
                        )
                    }
                </div>
                <div className="grid-cont">
                    <Swiper
                        slidesPerView={4}
                        spaceBetween={30}
                        autoplay={true}
                        dir={'ltr'}
                        loop={true}
                        modules={[Autoplay, Navigation, Pagination]}
                        breakpoints={{
                            1400: {
                                slidesPerView: 4,
                            },
                            1100: {
                                slidesPerView: 4,
                            },
                            767: {
                                slidesPerView: 2,
                            },
                            640: {
                                slidesPerView: 2,
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
                        {
                            imgs.map((item, index) => (
                                index % 2 == 0 ?
                                    <SwiperSlide key={index}>
                                        <div className="two-meals">
                                            <div className="meal">
                                                <div className="img-cont">
                                                    <Image src={item.url} alt="Mazar" width={200} height={200} />
                                                </div>
                                                <div className="text">
                                                    <h4>{item.name}</h4>
                                                    <div className="rate">

                                                        {
                                                            Array(5).fill(0).map((raye, index) =>
                                                                <i className={`fa-solid fa-star ${item.rate > index ? 'active' : ''} `} key={index}></i>
                                                            )
                                                        }
                                                    </div>
                                                    <div className="price-addtocart">
                                                        <h5>{item.price}</h5>
                                                        <i className="fa-solid fa-cart-shopping"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="meal">
                                                <div className="img-cont">
                                                    <Image src={imgs[index+1].url} alt="Mazar" width={200} height={200} />
                                                </div>
                                                <div className="text">
                                                    <h4>{imgs[index+1].name}</h4>
                                                    <div className="rate">

                                                        {
                                                            Array(5).fill(0).map((raye, index) =>
                                                                <i className={`fa-solid fa-star ${imgs[index+1].rate > index ? 'active' : ''} `} key={index}></i>
                                                            )
                                                        }
                                                    </div>
                                                    <div className="price-addtocart">
                                                        <h5>{imgs[index+1].price}</h5>
                                                        <i className="fa-solid fa-cart-shopping"></i>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </SwiperSlide>
                                    :
                                    null
                            ))
                        }
                    </Swiper>
                </div>
            </div>
        </div>

    )
}
