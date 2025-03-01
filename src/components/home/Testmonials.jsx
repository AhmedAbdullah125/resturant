'use client'
import React, { useEffect, useState } from 'react';
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from 'axios';
import { API_BASE_URL } from '@/lib/apiConfig';
import Loading from '@/app/loading';
export default function Testmonials() {
    const [language, setLanguage] = useState('en');  // Default language is 'en'
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [rate5, setRate5] = useState(0);
    const [rate4, setRate4] = useState(0);
    const [rate3, setRate3] = useState(0);
    const [rate2, setRate2] = useState(0);
    const [rate1, setRate1] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Define the headers with the selected language
            setLanguage(localStorage.getItem('lang'));
            const headers = {
                lang: localStorage.getItem('lang'), // Change language dynamically based on state
            };
            axios.get(`${API_BASE_URL}/lava/testimonial`
                , {
                    headers: headers,
                }
            )
                .then(response => {
                    setData(response.data.data);  // Set the response data to state
                    setLoading(false);  // Set loading to false
                    let rt5 = 0;
                    let rt4 = 0;
                    let rt3 = 0;
                    let rt2 = 0;
                    let rt1 = 0;
                    let total = 0;
                    
                    for(let i = 0; i < response.data.data.length; i++){
                        if(response.data.data[i].rate >= 5){
                            rt5++;
                        }else if(response.data.data[i].rate >= 4){
                            rt4++;
                        }else if(response.data.data[i].rate >= 3){
                            rt3++;
                        }else if(response.data.data[i].rate >= 2){
                            rt2++;
                        }else if(response.data.data[i].rate >= 1){
                            rt1++;
                        }
                        total= total + response.data.data[i].rate

                    }
                    setRate5(rt5);
                    setRate4(rt4);
                    setRate3(rt3);
                    setRate2(rt2);
                    setRate1(rt1);
                    setTotal(total);
                })
                .catch(error => {
                    setError(error);  // Handle any errors
                    console.error('Error fetching data:', error);
                    setLoading(false)
                });
        }
    }, []);
    return (
        <div className="Testmonials" >
            {
                loading ? <Loading /> :
                    <div className="container mx-auto">
                        <div className="test-cont-parent">
                            <div className="test-cont">
                                <div className="l-side">
                                    <div className="sqr"></div>
                                    <div className="rate-head">
                                        <h2>{total/data.length}</h2>
                                        <p>{language === 'en' ? `Based on ${data.length} reviews` : language === 'tr'? `Puanlama için ${data.length} yorum}` : `بناناً على ${data.length} تقييمات`  }</p>
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
                                                <div className="prog" style={{ width: `${rate5/data.length * 100}%` }}></div>
                                            </div>
                                            <span>{rate5/data.length * 100}%</span>
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
                                                <div className="prog" style={{ width: `${rate4/data.length * 100}%` }}></div>
                                            </div>
                                            <span>{rate4/data.length * 100}%</span>
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
                                                <div className="prog" style={{ width: `${rate3/data.length * 100}%`  }}></div>
                                            </div>
                                            <span>{rate3/data.length * 100}%</span>
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
                                                <div className="prog" style={{ width: `${rate2/data.length * 100}%` }}></div>
                                            </div>
                                            <span>{rate2/data.length * 100}%</span>
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
                                                <div className="prog" style={{ width: `${rate1/data.length * 100}%` }}></div>
                                            </div>
                                            <span>{rate1/data.length * 100}%</span>
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

                                        {
                                            data.map((item, index) => (
                                                <SwiperSlide key={index}>
                                                    <div className="test-wahed">
                                                        <div className="rates">
                                                            {
                                                                Array.from({ length: 5 }, (_, index) => (
                                                                    <i className={`fa-solid fa-star ${index < item.rate ? 'active' : ''}`} key={index} />
                                                                ))
                                                            }
                                                        </div>
                                                        <p>{item.comment}</p>
                                                        <h3 className='name'>{item.name} - {language==='en'?'from ':'من '} {item.country}</h3>

                                                    </div>
                                                </SwiperSlide>
                                            ))
                                        }

                                    </Swiper>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}
