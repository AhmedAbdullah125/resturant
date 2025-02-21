'use client'
import React, { useContext, useEffect, useState } from 'react';
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
import { CounterContext } from '@/app/Context/CounterContext';
import { toast } from 'sonner';
import axios from 'axios';
import { API_BASE_URL } from '@/lib/apiConfig';
export default function Menu() {
    const [activeTab, setActiveTab] = useState(0);
    let [tabs, setTabs] = useState(
        [
            { id: 0, name: "All", className: "fa-solid fa-utensils" },

        ]
    )
    let { cartCont, cartHandling } = useContext(CounterContext);
    let [cart, setCart] = useState(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []);
    let [addStatus, setAddStatus] = useState('Successfully Added to cart');
    let cartContCopy = [...cartCont];
    let [lang, setLang] = useState('en');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    let [domdom, setDomdom] = useState(activeTab === 0 ? data : data.filter(item => item.categoryId === activeTab));
    useEffect(() => {
        setLoading(true);
        if (typeof window !== 'undefined') {
            // Define the headers with the selected language
            setLang(localStorage.getItem('lang'));
            const headers = {
                lang: localStorage.getItem('lang'), // Change language dynamically based on state
            };
            axios.get(`${API_BASE_URL}/lava/menu`
                , {
                    headers: headers,
                }
            )
                .then(response => {
                    setData(response.data.data);  // Set the response data to state
                    setDomdom(activeTab === 0 ? response.data.data : response.data.data.filter(item => item.categoryId === activeTab));
                    setLoading(false);  // Set loading to false
                })
                .catch(error => {
                    setError(error);  // Handle any errors
                    console.error('Error fetching data:', error);
                    setLoading(false)
                });
        }
    }, []);
    console.log(data);
    
    //fetching categories API
    useEffect(() => {
        const headers = {
            lang: localStorage.getItem('lang'), // Change language dynamically based on state
        };
        axios.get(`${API_BASE_URL}/lava/category`
            , {
                headers: headers,
            }
        )
            .then(response => {
                setTabs([{ id: 0, name: "All", className: "fa-solid fa-utensils" }, ...response.data.data]);  // Set the response data to state
                setLoading(false);  // Set loading to false
            })
            .catch(error => {
                setError(error);  // Handle any errors
                console.error('Error fetching data:', error);
                setLoading(false)
            });
    }, [])
    return (
        <div className="menue menu-main-cont">
            <div className="container m-auto">
                <h2>Out Fresh Products</h2>
                <div className="tabs">
                    {
                        tabs.map((item, index) =>
                            <div className={`tab ${activeTab == item.id ? 'active-tab' : ''}`} key={index} onClick={() => setActiveTab(item.id)}>
                                {
                                    item.className ?
                                        <i className={item.className}></i>
                                        :
                                        <Image src={item.image} alt="Mazar" width={200} height={200} />
                                }
                                <h4>{item.name}</h4>
                            </div>
                        )
                    }
                </div>
                <div className="grid-cont grid-cont-in-menu">

                    {
                        data?.map((item, index) => (
                            activeTab == item.categoryId || activeTab == 0 ?

                                <div className="two-meals" key={index}>
                                    <div className="meal">
                                        <Link className="img-cont" href={'/meal'}>
                                            <Image src={item.images[0]} alt="Mazar" width={200} height={200} />
                                        </Link>
                                        <div className="text">
                                            <h4>{item.name}</h4>
                                            <div className="rate">

                                                {
                                                    Array(5).fill(0).map((_, index) =>
                                                        <i className={`fa-solid fa-star ${item.rate > index ? 'active' : ''} `} key={index}></i>
                                                    )
                                                }
                                            </div>
                                            <div className="price-addtocart">
                                                <h5>{item.price} $</h5>
                                                <i className="fa-solid fa-cart-shopping"
                                                    onClick={() => {

                                                        for (let index = 0; index < cartCont.length; index++) {
                                                            if (cartCont[index].id === item.id) {
                                                                setAddStatus('Already Added to cart');
                                                                toast('Already Added to cart', {
                                                                    style: {
                                                                        borderColor: '#dc3545',
                                                                        boxShadow: '0px 0px 10px rgba(220, 53, 69, .5)',
                                                                    },
                                                                    description: 'This item is already added to your cart',
                                                                });
                                                                return;
                                                            }
                                                        }
                                                        if (cartCont.includes(item)) {
                                                            toast('Already Added to cart', {
                                                                style: {
                                                                    borderColor: '#28a745',
                                                                    boxShadow: '0px 0px 10px rgba(220, 53, 69, .5)',
                                                                },
                                                                description: 'This item is already added to your cart',
                                                            });
                                                        } else {
                                                            setCart([...cart, item]);
                                                            if (JSON.parse(localStorage.getItem('cart')) === null) {
                                                                localStorage.setItem('cart', JSON.stringify([]));
                                                            } else {
                                                                localStorage.setItem(
                                                                    'cart',
                                                                    JSON.stringify([
                                                                        ...JSON.parse(localStorage.getItem('cart')),
                                                                        { ...item, Quantity: 1 },
                                                                    ])
                                                                );
                                                            }
                                                            cartHandling([...cartCont, { ...item, Quantity: 1 }]);
                                                            setAddStatus('Successfully Added to cart');
                                                            toast('Successfully Added to cart', {
                                                                style: {
                                                                    borderColor: '#28a745',
                                                                    boxShadow: '0px 0px 10px rgba(40, 167, 69, .5)',
                                                                },
                                                                description: 'This item is successfully added to your cart',
                                                            });
                                                        }
                                                    }}
                                                ></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : null
                        ))
                    }
                </div>
            </div>
        </div>

    )
}
