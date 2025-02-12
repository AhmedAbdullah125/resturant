'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import img1 from '/public/san.png';
import Link from 'next/link';

export default function Offer() {

    return (
        <div className="sp-offer" id='gallery'>
            <div className="container mx-auto">
                <div className="overlay">
                    <div className="text-cont">
                        <h3>Special Offer</h3>
                        <h4>Burgers With Onion Dip and Potato Chips</h4>
                        <p>Per Serving: 510 calories; fat 26g; saturated fat 10g; cholesterol 88mg; sodium  883mg; protein 31g; carbohydrates 36g; sugars 9g; fiber 1g; iron 4mg; calcium 97mg.</p>
                        <div className="order-cont">
                            <Link href={'/'}><span>Order Now</span> <i className="fa-solid fa-arrow-right"></i></Link>
                            <span className="new-price">$12.99</span>
                            <span className="old-price">$24.99</span>
                        </div>
                    </div>
                    <div className="img-cont">
                        <Image src={img1} alt="Mazar" width={200} height={200} className="mb-4 size-full rounded-3xl object-contain" />
                    </div>
                </div>
                <div className="offer-main-section">

                </div>

            </div>
        </div>
    )
}
