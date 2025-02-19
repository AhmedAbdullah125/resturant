'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { Autoplay, Navigation, Pagination, Controller } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
export default function ProducrSwiper(data) {
    let [product, setProduct] = useState(data.product);
    const [bigSwiper, setBigSwiper] = useState(null);
    const [smallSwiper, setSmallSwiper] = useState(null);
    let [selectedImg, setSelectedImg] = useState(product.image);
    return (
        <div className="ProducrSwiper col col-md-6">
            {/* <div className="mainImgCont">
                <Image src={product.images[1]} alt='products' className='main-img' width={100} height={100}></Image>
            </div> */}
            <Swiper
                // navigation
                spaceBetween={10}
                slidesPerView={6}
                autoplay={true}
                loop={true}
                onSwiper={setBigSwiper}
                modules={[Autoplay, Navigation, Pagination, Controller]}
                controller={{ control: smallSwiper }} // Link to small swiper
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
                    768: {
                        slidesPerView: 1,
                        autoplay: false,
                    },
                    640: {
                        slidesPerView: 1,
                        autoplay: false,
                    },
                    100: {
                        slidesPerView: 1,
                        autoplay: false,
                    }


                }}
            >

                {
                    product.images.map((img, index) =>
                        <SwiperSlide key={index}>
                            <div className="mainImgCont">
                                <Image src={img} alt='products' className='main-img' width={100} height={100}></Image>
                            </div>
                        </SwiperSlide>
                    )
                }

            </Swiper>
            <Swiper
                // navigation
                spaceBetween={10}
                slidesPerView={6}
                autoplay={true}
                loop={true}
                onSwiper={setSmallSwiper}
                modules={[Autoplay, Navigation, Pagination, Controller]}
                controller={{ control: bigSwiper }} // Link to big swiper
                breakpoints={{
                    1400: {
                        slidesPerView: 6,
                    },
                    1100: {
                        slidesPerView: 4,
                    },
                    767: {
                        slidesPerView: 6,
                    },
                    768: {
                        slidesPerView: 3,
                        autoplay: false,
                    },
                    640: {
                        slidesPerView: 4,
                        autoplay: false,
                    },

                    100: {
                        slidesPerView: 3,
                        autoplay: false,
                    },
                }}
            >
                {
                    product.images.map((img, index) =>
                        <SwiperSlide key={index} onClick={() => smallSwiper.slideToLoop(index)}>
                            <div className="slide-img-cont" >
                                <Image src={img} width={100} height={100} alt='Loops' />
                            </div>
                        </SwiperSlide>
                    )
                }

            </Swiper>
        </div>
    )
}