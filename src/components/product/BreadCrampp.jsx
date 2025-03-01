'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
export default function BreadCrampp(data) {
    
    let [type, setType] = useState(data.data.name)
    const word = type
    const firstLetter = word.charAt(0)
    const firstLetterCap = firstLetter.toUpperCase()
    const remainingLetters = word.slice(1)
    const capitalizedWord = firstLetterCap + remainingLetters
    // Freecodecamp
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
    return (
        <div className="home-slider" style={{ direction: language === 'ar' ? 'rtl' : "ltr" }}>
            <div className="bead-cramp">
                <p className='breadLink'><Link href={'/'}>{language === 'en' ? 'Home' : language === 'tr' ? 'Ana Sayfa' : 'الصفحة الرئيسية'}</Link> - {capitalizedWord} - {language === 'en' ? ' Product details' : language === 'tr' ? 'Ürün detayları' : 'تفاصيل المنتج'}</p>
            </div>
        </div>
    )
}