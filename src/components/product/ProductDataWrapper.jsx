'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ProducrSwiper from './ProducrSwiper'
import ProductDetails from './ProductDetails'
export default function ProductDataWrapper(data) {
    let [product, setProduct] = useState(data.product);
    let [title, setTitle] = useState(data.title);
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
    return (
        <div className=" ProductDataWrapper row" style={{ direction: lang === 'ar' ? 'rtl' : "ltr" }}>
            <ProducrSwiper  product={product}/>
            <ProductDetails product={product} title={title}/>
            
        </div>
    )
}