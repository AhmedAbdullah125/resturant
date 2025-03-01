'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
export default function CartBreadCramp({ title, titleUrl, subtitle, subtitleUrl }) {

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const [language, setLanguage] = useState('en')
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Define the headers with the selected language
            setLanguage(localStorage.getItem('lang'));
            const headers = {
                lang: localStorage.getItem('lang'), // Change language dynamically based on state
            };
        }
    })
    // Freecodecamp
    return (
        <div className="" style={{ direction: language === 'ar' ? 'rtl' : "ltr" }}>
            <div className="bead-cramp">
                <p className='breadLink'><Link href={'/'}>{language === 'en' ? 'Home' : language === 'tr' ? 'Ana Sayfa' : 'الصفحة الرئيسية'}</Link> - <Link href={titleUrl}>{title}</Link> {subtitle == "" ? null : <>- <Link href={subtitleUrl}>{subtitle}</Link></>}</p>
            </div>
        </div>
    )
}