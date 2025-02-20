'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import BlurFade from '../ui/blur-fade';
import img1 from '/public/grid1.png';
import img2 from '/public/grid2.png';
import img3 from '/public/grid3.png';
import img4 from '/public/grid4.png';
import img5 from '/public/grid5.png';
import img6 from '/public/grid6.png';

import Link from 'next/link';

export default function Gallery() {
    let imgs =
        [
            { url: img3, category: 'photos', name: "burger" },
            { url: img5, category: 'photos', name: "burger" },
            { url: img2, category: 'photos', name: "burger" },
            { url: img1, category: 'photos', name: "burger" },
            { url: img4, category: 'photos', name: "burger" },
            { url: img5, category: 'photos', name: "burger" },
            { url: img6, category: 'photos', name: "burger" },

        ]
    return (
        <div className="gallery" id='gallery'>
            <div className="container mx-auto">
                <h2 className="Sec-title">Our Offers</h2>
                <section id="photos">
                    <div className="columns-1 sm:columns-2 gap-4 md:columns-4">
                        {imgs.map((img, idx) => (
                            <BlurFade key={idx} delay={0.25 + idx * 0.05} inView>
                                <figure className='relative'>
                                    <div className="offered-meal-overlay">
                                        <h3 className='offered-meal-title'>{img.name}</h3>
                                        <h5 className='offered-meal-text'>Order Now and Get 20% Off</h5>
                                        <Link  href={'/meal' } className="button">
                                            <span >Order Now</span>
                                            <i className="fa-solid fa-arrow-right"></i>
                                        </Link>
                                    </div>
                                    <Image src={img.url} alt="Mazar" width={200} height={200} className="mb-4 size-full rounded-3xl object-contain" />
                                </figure>
                            </BlurFade>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}
