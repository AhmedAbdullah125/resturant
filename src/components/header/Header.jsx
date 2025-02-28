'use client'
import React, { useState, useEffect, useContext } from 'react'
import logo from '../../assets/images/home/logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { CounterContext } from '@/app/Context/CounterContext'
export default function NavBar() {
  let { cartCont, cartHandling } = useContext(CounterContext);
  let [lang, setLang] = useState('en');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('lang') === 'ar' || localStorage.getItem('lang') === 'en') {
        setLang(localStorage.getItem('lang'));
      }
      else {
        localStorage.setItem('lang', 'en');
        setLang('en');
      }
    }
  }, [lang]);
  return (
    <header style={{ direction: lang === 'en' ? 'ltr' : 'rtl' }}>
      <div className="overlay hidden" id='overlay-header' onClick={() => {
        document.getElementById("hidden-menue").classList.toggle("hidden");
        document.getElementById("overlay-header").classList.toggle("hidden");

      }}></div>
      <div className="container m-auto">
        <div className="mainNavBar">
          <div className="bars-cont">
            <i className="fa-solid fa-bars colorMain" id='bars' onClick={() => {
              document.getElementById("hidden-menue").classList.toggle("hidden")
              document.getElementById("overlay-header").classList.toggle("hidden");
            }}></i>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="hidden-menue hidden" id='hidden-menue'>
              <Link href={'/'}>{lang === 'en' ? 'Home' : "الرئيسية"}</Link>
              <Link href={'/about'}>{lang === 'en' ? 'About' : "من نحن"}</Link>
              <Link href={'/contact'}>{lang === 'en' ? 'Contact' : "اتصل بنا"}</Link>
              <Link href={'/menu'}>{lang === 'en' ? 'Menu' : "القائمة"}</Link>
            </motion.div>
          </div>
          <Link href={'/'} className='logoMainLink'><Image src={logo} alt='loopz' className='logo'></Image></Link>
          <div className="input-cont">
            <input type="text" placeholder='Search For Products' />
          </div>
          <div href={'/favourits'} className="nav-card cursor-pointer" onClick={() => {
            if (lang === 'en') {
              localStorage.setItem('lang', 'ar');
              setLang('ar');
            } else {
              localStorage.setItem('lang', 'en');
              setLang('en');
            }

            window.location.reload(); // Reloads the page
          }}>
            <i className="fa-solid fa-globe"></i>
            <p>{lang === 'en' ? 'ع' : 'EN'}</p>
          </div>
          <div className="cart-balance">
            {
              cartCont.length > 0 ?
                <Link href='/cart' className="cart">
                  <i className="fa-solid fa-cart-shopping"></i>
                  <span>{cartCont?.length}</span>
                </Link>
                :
                <button className="cart" onClick={() => {

                  toast("Your cart is empty", {
                    style: {
                      borderColor: "#dc3545",
                      boxShadow: '0px 0px 10px rgba(220, 53, 69, .5)'
                    },
                  });
                }}>
                  <i className="fa-solid fa-cart-shopping"></i>
                  <span>{cartCont?.length}</span>
                </button>
            }
          </div>
        </div>
      </div>
    </header>
  )
}
