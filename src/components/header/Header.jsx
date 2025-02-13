'use client'
import React, { useState, useEffect, useContext } from 'react'
import logo from '../../assets/images/home/logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
// import { CounterContext } from '@/app/Context/CounterContext'
// import { ProfileDataContext, useProfileData } from '@/app/Context/ProfileContext'
// import profileImage from '../../assets/profile.svg'
// import { toast } from 'sonner'
export default function NavBar() {
  // let { cartCont, cartHandling } = useContext(CounterContext);
  // let { data } = useContext(ProfileDataContext);
  // console.log(data);

  return (
    <header>
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
              <Link href={'/'}>Home</Link>
              <Link href={'/about'}>About</Link>
              <Link href={'/contact'}>Contact</Link>
              <Link href={'/menue'}>Menue</Link>
              <Link href={'/order'}>Order</Link>
            </motion.div>
          </div>
          <Link href={'/'} className='logoMainLink'><Image src={logo} alt='loopz' className='logo'></Image></Link>
          <div className="input-cont">
            <input type="text" placeholder='Search For Products' />

            {/* <div className="search-icon">
                            <Image src={search} alt='search'></Image>
                        </div> */}
          </div>
          <Link href={'/favourits'} className="nav-card">
            <i className="fa-solid fa-bookmark"></i>
            <p>Favourits</p>
          </Link>
          {/* <Link href={'/profile'} className="nav-card">
            <i className="fa-solid fa-user"></i>
            <p>Account</p>
          </Link> */}
          <div className="cart-balance">
            {/* {
              cartCont.length > 0 ? */}
            <Link href='/cart' className="cart">
              <i className="fa-solid fa-cart-shopping"></i>
              <span>0</span>
            </Link>
            {/* :
                <button className="cart" onClick={() => {

                  toast("Your cart is empty", {
                    style: {
                      borderColor: "#dc3545",
                      boxShadow: '0px 0px 10px rgba(220, 53, 69, .5)'
                    },
                  });
                }}>  <i className="fa-solid fa-cart-shopping"></i>
                  <span>0</span> 
              </button> } */}

            <div className="balance">
              <span>0</span>
              <span>$</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
