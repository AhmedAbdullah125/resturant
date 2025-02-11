'use client'
import React, { useState, useEffect, useContext } from 'react'
import heroImg from '/public/hero.png'
import Image from 'next/image'
import Link from 'next/link'
export default function Hero() {

    return (
        <div className="hero">
            <Image src={heroImg} alt="Mazar" width={200} height={200} />
            <div className="overlay">
                <div className="heading">
                    <h4>Hello to Resturent</h4>
                    <h2>RESERVE YOUR TABLE</h2>
                    <div className="btns">
                        <Link href={'/'} className='book-link'>BOOK A TABLE</Link>
                        <Link href={'/'} className='book-link'>OPEN MENU</Link>

                    </div>
                </div>
            </div>
        </div>
    )
}
