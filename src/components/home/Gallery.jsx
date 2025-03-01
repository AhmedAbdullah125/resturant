'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Marquee from '../ui/marquee';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import axios from 'axios';
import { API_BASE_URL } from '@/lib/apiConfig';
import Loading from '@/app/loading';
import parse from 'html-react-parser';

export default function Gallery() {
    const [language, setLanguage] = useState('en');  // Default language is 'en'
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Define the headers with the selected language
            setLanguage(localStorage.getItem('lang'));
            const headers = {
                lang: localStorage.getItem('lang'), // Change language dynamically based on state
            };
            axios.get(`${API_BASE_URL}/lava/offers`
                , {
                    headers: headers,
                }
            )
                .then(response => {
                    setData(response.data.data);  // Set the response data to state
                    setLoading(false);  // Set loading to false
                })
                .catch(error => {
                    setError(error);  // Handle any errors
                    console.error('Error fetching data:', error);
                    setLoading(false)
                });
        }
    }, []);

    const ReviewCard = ({
        image, name , discount,description , priceAfterDiscount ,priceBeforeDiscount , id
    }) => {
        return (
            <figure className={cn()} >
                <div className="part-cont" >
                    <figure className='relative g-imgs-cont'>
                        <div className="offered-meal-overlay">
                            <h3 className='offered-meal-title'>{name}</h3>
                            <p>{parse(description)}</p>
                            <h6 className='price'><span className='new-price'>{priceAfterDiscount}</span> <span className='old-price'>{priceBeforeDiscount}</span></h6>
                            <h5 className='offered-meal-text'>{language === 'en' ? `Order Now and Get ${discount}% Off` : language === 'tr'? `Şimdi sipariş verin ve ${discount}% indirim alın` : `اطلب الان وحصل على ${discount}% خصم`}</h5>
                            <Link href={`/meal?id=${id}`} className="button">
                                <span >{language === 'en' ? 'Order Now' : language === 'tr'? 'Sipariş Verin' : 'اطلب الان'}</span>
                                <i className="fa-solid fa-arrow-right"></i>
                            </Link>
                        </div>
                        <Image src={image} alt="Mazar" width={200} height={200} className="mb-4 size-full rounded-3xl object-contain" />
                    </figure>
                </div>
            </figure>
        );
    };
    return (
        <div className="gallery" id='gallery'>
            <div className="container mx-auto">
                <h2 className="Sec-title">{language === 'en' ? 'Our Offers' : language === 'tr'? 'Nasıl Yemekler' : 'عروضنا'}</h2>
                <section id="photos">
                    {/* <div className="columns-1 sm:columns-2 gap-4 md:columns-4">
                        {imgs.map((img, idx) => (
                            <BlurFade key={idx} delay={0.25 + idx * 0.05} inView>
                                <figure className='relative'>
                                    <div className="offered-meal-overlay">
                                        <h3 className='offered-meal-title'>{img.name}</h3>
                                        <h5 className='offered-meal-text'>Order Now and Get 20% Off</h5>
                                        <Link  href={'/mealsssssssssssssss' } className="button">
                                            <span >Order Now</span>
                                            <i className="fa-solid fa-arrow-right"></i>
                                        </Link>
                                    </div>
                                    <Image src={img.url} alt="Mazar" width={200} height={200} className="mb-4 size-full rounded-3xl object-contain" />
                                </figure>
                            </BlurFade>
                        ))}
                    </div> */}
                    <Marquee pauseOnHover className="[--duration:20s]">
                        {data.map((review, index) => (
                            <ReviewCard key={index} {...review} />
                        ))}
                    </Marquee>
                </section>
            </div>
        </div>
    )
}
