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
export default function Menue() {
    const [activeTab, setActiveTab] = useState(6);
    let imgs =
        [
            { catId: 1, id: 1, url: img1, rate: 4, price: 10, category: 'Vegetables', name: "Salad" },
            { catId: 1, id: 2, url: img2, rate: 5, price: 8, category: 'Vegetables', name: "Grilled Vegetables" },
            { catId: 1, id: 3, url: img3, rate: 4, price: 12, category: 'Vegetables', name: "Stir-fried Tofu" },
            { catId: 1, id: 4, url: img4, rate: 3, price: 15, category: 'Vegetables', name: "Vegetable Soup" },
            { catId: 2, id: 5, url: img5, rate: 5, price: 18, category: 'Meals', name: "Chicken Alfredo" },
            { catId: 2, id: 6, url: img6, rate: 4, price: 20, category: 'Meals', name: "Grilled Steak" },
            { catId: 2, id: 7, url: img7, rate: 4, price: 22, category: 'Meals', name: "Shrimp Pasta" },
            { catId: 2, id: 8, url: img8, rate: 5, price: 25, category: 'Meals', name: "Lamb Chops" },
            { catId: 2, id: 9, url: img9, rate: 4, price: 16, category: 'Meals', name: "Beef Stroganoff" },
            { catId: 3, id: 10, url: img10, rate: 5, price: 12, category: 'Sandwiches', name: "Cheeseburger" },
            { catId: 3, id: 11, url: img11, rate: 4, price: 14, category: 'Sandwiches', name: "Club Sandwich" },
            { catId: 3, id: 12, url: img2, rate: 4, price: 11, category: 'Sandwiches', name: "Falafel Wrap" },
            { catId: 3, id: 13, url: img3, rate: 5, price: 15, category: 'Sandwiches', name: "Grilled Chicken Sandwich" },
            { catId: 3, id: 14, url: img4, rate: 4, price: 13, category: 'Sandwiches', name: "BLT Sandwich" },
            { catId: 4, id: 15, url: img5, rate: 4, price: 5, category: 'Drinks', name: "Fresh Orange Juice" },
            { catId: 4, id: 16, url: img6, rate: 5, price: 6, category: 'Drinks', name: "Strawberry Smoothie" },
            { catId: 4, id: 17, url: img7, rate: 4, price: 4, category: 'Drinks', name: "Iced Latte" },
            { catId: 4, id: 18, url: img8, rate: 5, price: 5, category: 'Drinks', name: "Mango Shake" },
            { catId: 4, id: 19, url: img9, rate: 4, price: 7, category: 'Drinks', name: "Lemon Mint Cooler" },
            { catId: 4, id: 20, url: img2, rate: 5, price: 8, category: 'Desserts', name: "Chocolate Cake" },
            { catId: 4, id: 21, url: img1, rate: 4, price: 9, category: 'Desserts', name: "Tiramisu" },
            { catId: 4, id: 22, url: img2, rate: 5, price: 10, category: 'Desserts', name: "Blueberry Cheesecake" },
            { catId: 4, id: 23, url: img3, rate: 4, price: 7, category: 'Desserts', name: "Vanilla Ice Cream" },
            { catId: 4, id: 24, url: img4, rate: 4, price: 6, category: 'Desserts', name: "Apple Pie" },
            { catId: 5, id: 25, url: img5, rate: 5, price: 18, category: 'Seafood', name: "Grilled Salmon" },
            { catId: 5, id: 26, url: img6, rate: 4, price: 22, category: 'Seafood', name: "Lobster Tail" },
            { catId: 5, id: 27, url: img7, rate: 4, price: 20, category: 'Seafood', name: "Garlic Butter Shrimp" },
            { catId: 5, id: 28, url: img8, rate: 5, price: 25, category: 'Seafood', name: "Crab Legs" },
            { catId: 5, id: 29, url: img9, rate: 4, price: 19, category: 'Seafood', name: "Fried Calamari" }
        ];
    let data = activeTab === 6 ? imgs : imgs.filter(item => item.catId === activeTab);
    let tabs = [
        { id: 6, name: "All", className: "fa-solid fa-utensils" },
        { id: 1, name: "Vegetables", className: "fa-solid fa-leaf" },
        { id: 2, name: "Meals", className: "fa-solid fa-bowl-food" },
        { id: 3, name: "Sandwiches", className: "fa-solid fa-burger" },
        { id: 4, name: "Drinks", className: "fa-solid fa-martini-glass" },
        { id: 5, name: "Seafood", className: "fa-solid fa-fish" },
    ]
    let { cartCont, cartHandling } = useContext(CounterContext);
    let [cart, setCart] = useState(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []);
    let [addStatus, setAddStatus] = useState('Successfully Added to cart');
    let cartContCopy = [...cartCont];
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
                                slidesPerView: 2,
                                autoplay: false,
                                spaceBetween: 16
                            }
                        }}
                    >
                        {
                            data.map((item, index) => (
                                activeTab == item.catId || activeTab == 6 ?
                                    index % 2 == 0 ?
                                        <SwiperSlide key={index}>
                                            <div className="two-meals">
                                                <div className="meal">
                                                    <Link className="img-cont" href={'/meal'}>
                                                        <Image src={item.url} alt="Mazar" width={200} height={200} />
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
                                                {
                                                    index + 1 < data.length ?
                                                        <div className="meal">
                                                            <Link className="img-cont" href={'/meal'}>
                                                                <Image src={imgs[index + 1].url} alt="Mazar" width={200} height={200} />
                                                            </Link>
                                                            <div className="text">
                                                                <h4 >{imgs[index + 1].name}</h4>
                                                                <div className="rate">
                                                                    {
                                                                        Array(5).fill(0).map((_, idx) =>
                                                                            <i className={`fa-solid fa-star ${imgs[idx].rate > idx ? 'active' : ''} `} key={idx}></i>
                                                                        )
                                                                    }
                                                                </div>
                                                                <div className="price-addtocart">
                                                                    <h5>{imgs[index + 1].price} $</h5>
                                                                    {
                                                                        cartCont.findIndex(meal => meal.id === imgs[index + 1].id) ?
                                                                            <div className="count-cont">
                                                                                <div className="prod-count">
                                                                                    <span className='minus' onClick={() => {

                                                                                        if (imgs[index + 1].Quantity > 1) {
                                                                                            cartContCopy[cartCont.findIndex(meal => meal.id === imgs[index + 1].id)].Quantity -= 1;
                                                                                            cartHandling(cartContCopy);
                                                                                        }

                                                                                    }}
                                                                                    >-</span>
                                                                                    {/* <span className='count'>{cartCont[cartCont.findIndex(meal => meal.id === imgs[index-1].id)].Quantity || 1}</span> */}
                                                                                    <span className='minus'
                                                                                        onClick={() => {
                                                                                            cartContCopy[cartCont.findIndex(meal => meal.id === imgs[index + 1].id)].Quantity += 1;
                                                                                            cartHandling(cartContCopy);
                                                                                        }}
                                                                                    >+</span>

                                                                                </div>
                                                                                <p className='availability' style={{ display: "none" }}>Only {imgs[index + 1].availability_number} available</p>
                                                                            </div>
                                                                            :
                                                                            <i className="fa-solid fa-cart-shopping"
                                                                                onClick={() => {

                                                                                    for (let index = 0; index < cartCont.length; index++) {
                                                                                        if (cartCont[index + 1].id === imgs[index + 1].id) {
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
                                                                                    if (cartCont.includes(imgs[index + 1])) {
                                                                                        toast('Already Added to cart', {
                                                                                            style: {
                                                                                                borderColor: '#28a745',
                                                                                                boxShadow: '0px 0px 10px rgba(220, 53, 69, .5)',
                                                                                            },
                                                                                            description: 'This item is already added to your cart',
                                                                                        });
                                                                                    } else {
                                                                                        setCart([...cart, imgs[index + 1]]);
                                                                                        if (JSON.parse(localStorage.getItem('cart')) === null) {
                                                                                            localStorage.setItem('cart', JSON.stringify([]));
                                                                                        } else {
                                                                                            localStorage.setItem(
                                                                                                'cart',
                                                                                                JSON.stringify([
                                                                                                    ...JSON.parse(localStorage.getItem('cart')),
                                                                                                    { ...imgs[index + 1], Quantity: 1 },
                                                                                                ])
                                                                                            );
                                                                                        }
                                                                                        cartHandling([...cartCont, { ...imgs[index + 1], Quantity: 1 }]);
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
        </div>

    )
}
