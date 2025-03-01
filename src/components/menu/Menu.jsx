'use client'
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CounterContext } from '@/app/Context/CounterContext';
import { toast } from 'sonner';
import axios from 'axios';
import { API_BASE_URL } from '@/lib/apiConfig';
import Loading from '@/app/loading';
export default function Menu() {
    const [activeTab, setActiveTab] = useState(0);
    let [tabs, setTabs] = useState(
        [
            { id: 0, name: "All", className: "fa-solid fa-utensils" },

        ]
    )
    let { cartCont, cartHandling } = useContext(CounterContext);
    let [cart, setCart] = useState(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []);
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
    //fetching categories API
    useEffect(() => {
        setLoading(true);
        const headers = {
            lang: localStorage.getItem('lang'), // Change language dynamically based on state
        };
        axios.get(`${API_BASE_URL}/lava/category`
            , {
                headers: headers,
            }
        )
            .then(response => {
                setTabs([{ id: 0, name: localStorage.getItem('lang') === 'en' ? "ALL" : localStorage.getItem('lang') === 'tr' ? "TÜM" : "الكل", className: "fa-solid fa-utensils" }, ...response.data.data]);  // Set the response data to state
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
                <h2>{lang === 'en' ? "Out Fresh Products" : lang === 'tr' ? "Yeni Ürünler" : "المنتجات الحديثة"}</h2>
                <div className="tabs">
                    {
                        tabs.map((item, index) =>
                            <div className={`tab ${activeTab == item.id ? 'active-tab' : ''}`} key={index} onClick={() => setActiveTab(item.id)}>
                                {
                                    item.className ?
                                        <i className={item.className}></i>
                                        :
                                        <Image src={item.image} alt="foodi" width={200} height={200} />
                                }
                                <h4>{item.name}</h4>
                            </div>
                        )
                    }
                </div>
                <div className="grid-cont grid-cont-in-menu">

                    {
                        loading ?<Loading />:
                        domdom?.map((item, index) => (
                            activeTab == item.categoryId || activeTab == 0 ?

                                <div className="two-meals" key={index}>
                                    <div className="meal">
                                        <Link className="img-cont" href={`/meal?id=${item.id}`}>
                                            <Image src={item.images[0]} alt="foodi" width={200} height={200} />
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
