'use client'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
// import van from '../../assets/products/van.svg'
import Image from 'next/image';
import { CounterContext } from '@/app/Context/CounterContext';
import { toast } from 'sonner';
// import { ProfileDataContext } from '@/app/Context/ProfileContext';
import { useRouter } from 'next/navigation';
export default function ProductDetails({ product, title }) {
    let [productCount, setProductCount] = useState(1);
    let { cartCont, cartHandling } = useContext(CounterContext);
    let [cart, setCart] = useState(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []);
    let [addStatus, setAddStatus] = useState('Successfully Added to cart');
    // const router = useRouter();
    // const {data} = useContext(ProfileDataContext);
    return (
        <div className={`ProductDetails  col col-md-6 ${title == "Ticket" ? "ticket-productDetails" : ""}`}>
            <h3 className='product-name'>{product.name}</h3>
            <h4 className='product-cat'>{product.category}</h4>
            <div className="rate">
                <div className="stars">
                    <i className={`${product.rate >= 1 ? "goldenStar" : "grayStar"} fa-solid fa-star`} ></i>
                    <i className={`${product.rate >= 2 ? "goldenStar" : "grayStar"} fa-solid fa-star`} ></i>
                    <i className={`${product.rate >= 3 ? "goldenStar" : "grayStar"} fa-solid fa-star`} ></i>
                    <i className={`${product.rate >= 4 ? "goldenStar" : "grayStar"} fa-solid fa-star`} ></i>
                    <i className={`${product.rate >= 5 ? "goldenStar" : "grayStar"} fa-solid fa-star`} ></i>
                </div>
                <p> ( based on 100 reviews ) </p>
            </div>
            <p className='tickets-text'>{product.text}</p>
            <p className='tickets-persons'>{product.persons} person</p>
            <p className='prod-price'>{product.price} $</p>
            <div className="count-cont">
                <div className="prod-count">
                    <span className='minus' onClick={() => {
                        if (productCount > 1) {
                            setProductCount(productCount - 1);
                        }
                    }}
                    >-</span>
                    <span className='count'>{productCount}</span>
                    <span className='minus'
                        onClick={() => {
                            setProductCount(productCount + 1);
                        }}
                    >+</span>
                </div>
            </div>
            <p className='policies'> Read More About <Link href={'/policies'}><span>Return Policy</span></Link>  </p>
            <button className='cartLink' onClick={() => {
                for (let index = 0; index < cartCont.length; index++) {
                    if (cartCont[index].id === product.id) {
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
                if (cartCont.includes(product)) {
                    toast('Already Added to cart', {
                        style: {
                            borderColor: '#28a745',
                            boxShadow: '0px 0px 10px rgba(220, 53, 69, .5)',
                        },
                        description: 'This item is already added to your cart',
                    });
                } else {
                    setCart([...cart, product]);
                    if (JSON.parse(localStorage.getItem('cart')) === null) {
                        localStorage.setItem('cart', JSON.stringify([]));
                    } else {
                        localStorage.setItem(
                            'cart',
                            JSON.stringify([
                                ...JSON.parse(localStorage.getItem('cart')),
                                { ...product, Quantity: productCount },
                            ])
                        );
                    }
                    cartHandling([...cartCont, { ...product, Quantity: productCount }]);
                    setAddStatus('Successfully Added to cart');
                    toast('Successfully Added to cart', {
                        style: {
                            borderColor: '#28a745',
                            boxShadow: '0px 0px 10px rgba(40, 167, 69, .5)',
                        },
                        description: 'This item is successfully added to your cart',
                    });
                }
            }}>Add to Cart</button>
        </div>
    )
}