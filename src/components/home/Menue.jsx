'use client'
import React, { useContext, useEffect, useState } from 'react';
import Loading from '@/app/loading';
import Image from 'next/image';
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
export default function Menue() {
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

    let [cartcontIds, setCartcontIds] = useState([]);
    let cartContIdsCopy = [...cartcontIds];
    let [lang, setLang] = useState('en');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    let [domdom, setDomdom] = useState(activeTab === 0 ? data : data.filter(item => item.categoryId === activeTab));
    for (let i = 0; i < cartCont.length; i++) {
        cartContIdsCopy.push(cartCont[i].id);
    }
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
    console.log(data);

    return (
        <div className="menue">
            {
                loading ? <Loading /> :
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
                                        slidesPerView: 2,
                                        autoplay: false,
                                        spaceBetween: 16
                                    }
                                }}
                            >
                                {
                                    domdom.map((item, index) => (

                                        activeTab == item.categoryId || activeTab == 0 ?
                                            index % 2 == 0 ?
                                                <SwiperSlide key={index}>
                                                    <div className="two-meals">
                                                        <div className="meal">
                                                            <Link className="img-cont" href={'/meal'}>
                                                                <Image src={item.images[0]} alt="Mazar" width={200} height={200} />
                                                            </Link>
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
                                                                    <h5>{item.price} $</h5>
                                                                    {
                                                                        cartContIdsCopy.includes(item.id) ?
                                                                            <div className="count-cont">
                                                                                <div className="prod-count">
                                                                                    <span className='minus' onClick={() => {

                                                                                        if (cartCont[cartCont.findIndex(meal => meal.id === item.id)].Quantity > 1) {
                                                                                            cartContCopy[cartCont.findIndex(meal => meal.id === item.id)].Quantity -= 1;
                                                                                            cartHandling(cartContCopy);
                                                                                        }

                                                                                    }}
                                                                                    >-</span>
                                                                                    <span className='count'>{cartCont[cartCont.findIndex(meal => meal.id === item.id)].Quantity || 1}</span>
                                                                                    <span className='minus'
                                                                                        onClick={() => {
                                                                                            cartContCopy[cartCont.findIndex(meal => meal.id === item.id)].Quantity += 1;
                                                                                            cartHandling(cartContCopy);
                                                                                        }}
                                                                                    >+</span>

                                                                                </div>
                                                                            </div>
                                                                            :
                                                                            <i className="fa-solid fa-cart-shopping"
                                                                                onClick={() => {

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
                                                                                }}
                                                                            ></i>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {
                                                            index + 1 < domdom.length ?
                                                                <div className="meal">
                                                                    <Link className="img-cont" href={'/meal'}>
                                                                        <Image src={domdom[index + 1].images[0]} alt="Mazar" width={200} height={200} />
                                                                    </Link>
                                                                    <div className="text">
                                                                        <h4 >{domdom[index + 1].name}</h4>
                                                                        <div className="rate">
                                                                            {
                                                                                Array(5).fill(0).map((_, idx) =>
                                                                                    <i className={`fa-solid fa-star ${domdom[index + 1].rate > idx ? 'active' : ''} `} key={idx}></i>
                                                                                )
                                                                            }
                                                                        </div>
                                                                        <div className="price-addtocart">
                                                                            <h5>{domdom[index + 1].price} $</h5>
                                                                            {
                                                                                cartContIdsCopy.includes(domdom[index + 1].id) ?
                                                                                    <div className="count-cont">
                                                                                        <div className="prod-count">
                                                                                            <span className='minus' onClick={() => {

                                                                                                if (cartCont[cartCont.findIndex(meal => meal.id === domdom[index + 1].id)].Quantity > 1) {
                                                                                                    cartContCopy[cartCont.findIndex(meal => meal.id === domdom[index + 1].id)].Quantity -= 1;
                                                                                                    cartHandling(cartContCopy);
                                                                                                }

                                                                                            }}
                                                                                            >-</span>
                                                                                            <span className='count'>{cartCont[cartCont.findIndex(meal => meal.id === domdom[index + 1].id)].Quantity || 1}</span>
                                                                                            <span className='minus'
                                                                                                onClick={() => {
                                                                                                    cartContCopy[cartCont.findIndex(meal => meal.id === domdom[index + 1].id)].Quantity += 1;
                                                                                                    cartHandling(cartContCopy);
                                                                                                }}
                                                                                            >+</span>

                                                                                        </div>
                                                                                    </div>
                                                                                    :
                                                                                    <i className="fa-solid fa-cart-shopping"
                                                                                        onClick={() => {

                                                                                            setCart([...cart, domdom[index + 1]]);
                                                                                            if (JSON.parse(localStorage.getItem('cart')) === null) {
                                                                                                localStorage.setItem('cart', JSON.stringify([]));
                                                                                            } else {
                                                                                                localStorage.setItem(
                                                                                                    'cart',
                                                                                                    JSON.stringify([
                                                                                                        ...JSON.parse(localStorage.getItem('cart')),
                                                                                                        { ...domdom[index + 1], Quantity: 1 },
                                                                                                    ])
                                                                                                );
                                                                                            }
                                                                                            cartHandling([...cartCont, { ...domdom[index + 1], Quantity: 1 }]);
                                                                                            setAddStatus('Successfully Added to cart');
                                                                                            toast('Successfully Added to cart', {
                                                                                                style: {
                                                                                                    borderColor: '#28a745',
                                                                                                    boxShadow: '0px 0px 10px rgba(40, 167, 69, .5)',
                                                                                                },
                                                                                                description: 'This item is successfully added to your cart',
                                                                                            });
                                                                                        }}
                                                                                    ></i>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                : null
                                                        }


                                                    </div>
                                                </SwiperSlide>
                                                :
                                                null
                                            : null
                                    ))
                                }
                            </Swiper>
                        </div>
                    </div>
            }
        </div>

    )
}
