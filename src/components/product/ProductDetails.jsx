'use client'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
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
    const [lang, setLang] = useState('en');
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Define the headers with the selected language
            setLang(localStorage.getItem('lang'));
            const headers = {
                lang: localStorage.getItem('lang'), // Change language dynamically based on state
            };
        }
    })
    // const router = useRouter();
    // const {data} = useContext(ProfileDataContext);
    return (
        <div className={`ProductDetails  col col-md-6 ${title == "Ticket" ? "ticket-productDetails" : ""}`}>
            <h3 className='product-name'>{product.name}</h3>
            <h4 className='product-cat'>{product.categoryName}</h4>
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
            <p className='policies'>{lang === 'en' ? ' Read More About' : lang === 'tr' ? 'Geri Dönüş Politikası' : 'قراءة المزيد عن'} <Link href={'/policies'}><span>{lang === 'en' ? 'Return Policy' : lang === 'tr' ? 'Geri Dönüş Politikası' : 'سياسة الاسترجاع'}</span></Link>  </p>
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
            }}>{lang === 'en' ? 'Add to cart' : lang === 'tr' ? 'Sepete Ekle' : 'إضافة إلى السلة'}</button>
        </div>
    )
}