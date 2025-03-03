'use client'
import React, { useEffect, useState } from 'react'
import BreadCrampp from '@/components/product/BreadCrampp'
import ProductDataWrapper from '@/components/product/ProductDataWrapper'
import Tabs from '@/components/product/Tabs'
import { useSearchParams } from 'next/navigation'
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
import axios from 'axios'
import { API_BASE_URL } from '@/lib/apiConfig'
import Loading from '../loading'

export default function Product() {
    const searchParams = useSearchParams()
    const [data, setData] = useState([]);
    const [domdom, setDomdom] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lang, setLang] = useState('en');
    useEffect(() => {
        setLoading(true);
        if (typeof window !== 'undefined') {
            // Define the headers with the selected language
            setLang(localStorage.getItem('lang'));
            const headers = {
                lang: localStorage.getItem('lang'), // Change language dynamically based on state
            };
            axios.get(`${API_BASE_URL}/lava/menu/4`
                , {
                    headers: headers,
                }
            )
                .then(response => {
                    setData(response.data.data);  // Set the response data to state
                    setLoading(false);  // Set loading to false
                    setDomdom(response.data.data);
                })
                .catch(error => {
                    setError(error);  // Handle any errors
                    console.error('Error fetching data:', error);
                    setLoading(false)
                });
        }
    }, []);
    let [product, setProduct] = useState(
        {
            name: 'burger',
            category: "Meals",
            rate: 3,
            price: 10,
            images: [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11]

        }
    );
    // useEffect(() => {
    //     setLoading(true)
    //     const getHomeData = async () => {
    //         try {
    //             const productResponse = await axios.get(`https://loopz-q8.com/api/products/9`);
    //             let product = productResponse.data.data;
    //             setProduct(product)
    //             setLoading(false)

    //         } catch (error) {
    //             console.error('Error retrieving data:', error);
    //             throw new Error('Could not get data');
    //             setLoading(false)
    //         }
    //     };
    //     getHomeData();

    // }, [pathId]);


    return (
        <div className="container m-auto mt-52 lg:mt-48" >
            {
                loading ? <Loading /> :
                    <>
                        <BreadCrampp data={data} title={product.category} />
                        <ProductDataWrapper product={data} title={data.name} />
                    </>
            }
            {/* <Tabs product={product} /> */}
        </div>
    )
}