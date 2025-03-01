'use client'
import React, { useState, useEffect, useContext } from 'react'
import logo from '../../assets/images/home/logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { CounterContext } from '@/app/Context/CounterContext'
import axios from 'axios'
import { API_BASE_URL } from '@/lib/apiConfig'
export default function NavBar() {
  let { cartCont, cartHandling } = useContext(CounterContext);
  let [lang, setLang] = useState('en');
  let [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('lang') === 'ar' || localStorage.getItem('lang') === 'en' || localStorage.getItem('lang') === 'tr') {
        setLang(localStorage.getItem('lang'));
      }
      else {
        localStorage.setItem('lang', 'en');
        setLang('en');
      }
    }
  }, [lang]);
  const sendSearchRequest = async () => {
    setLoading(true);
    let iputtValue = document.getElementById('search-input').value;
    if (iputtValue) {
      document.getElementById('search-input').style.border = '1px solid white';
      try {
        const response = await axios.get(`${API_BASE_URL}/lava/search?search=${iputtValue}`);
        let data = response.data.data;
        setSearchData(data)
        if (data.items === 0) {
          toast.error('لا يوجد بيانات للبحث')
        }
      } catch (error) {
        console.error('Error retrieving data:', error);
        throw new Error('Could not get data');
      }

    }
    else {
      document.getElementById('search-input').style.border = '1px solid red';
    }
  };
  console.log(searchData);
  
  return (
    <header style={{ direction: lang === 'en' ? 'ltr' : lang === 'tr' ? 'rtl' : "rtl" }}>
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
              <Link href={'/'}>{lang === 'en' ? 'Home' : lang === 'tr' ? 'Ana Sayfa' : "الرئيسية"}</Link>
              <Link href={'/about'}>{lang === 'en' ? 'About' : lang === 'tr' ? 'Hakkımızda' : "من نحن"}</Link>
              <Link href={'/contact'}>{lang === 'en' ? 'Contact' : lang === 'tr' ? 'İletişim' : "اتصل بنا"}</Link>
              <Link href={'/menu'}>{lang === 'en' ? 'Menu' : lang === 'tr' ? 'Menu' : "القائمة"}</Link>
            </motion.div>
          </div>
          <Link href={'/'} className='logoMainLink'><Image src={logo} alt='loopz' className='logo'></Image></Link>
          <div className="input-cont">
            <input type="text" placeholder={lang === 'en' ? 'Search' : lang === 'tr' ? 'Ara' : "بحث"} onKeyUp={sendSearchRequest} id='search-input' />
          {
            document.getElementById('search-input')?.value.length > 0 ?
              <div className="search-data">
                {searchData?.length > 0 ?
                  searchData.map((item, index) =>
                    <a href={`/meal?id=${item.id}`} key={index} onClick={() => {
                      document.getElementById('search-input').value = '';
                      setSearchData([])
                      router.push(`/meal?id=${item.id}`)
                      location.search;
                    }}>
                      <div className="img">
                        <Image src={item?.images[0]} alt='image' width={100} height={100}></Image>
                      </div>
                      <div className="text">
                        <h2>{item.name}</h2>
                        <h3>{item.price} $</h3>
                      </div>
                    </a>
                  )
                  :
                  <h4>Thers is no results</h4>
                }
              </div>
              :null
          }
          </div>
          <Select onValueChange={(e) => {
            toast.success(e)
            localStorage.setItem('lang', e);
            setLang(e);
            window.location.reload();
          }}>
            <SelectTrigger className="w-fit cursor-pointer text-white" >
              <i className="fa-solid fa-globe text-white"></i>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="tr">Türkçe</SelectItem>
                <SelectItem value="ar">العربية</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* <div className="nav-card cursor-pointer" onClick={() => {
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
          </div> */}
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
