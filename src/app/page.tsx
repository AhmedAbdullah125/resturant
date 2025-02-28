'use client'
import React, { useEffect, useState } from 'react';
import Hero from '../components/home/Hero';
import Gallery from '../components/home/Gallery'
import Menue from '../components/home/Menue'
import Offer from '../components/home/Offer'
import Testmonials from '../components/home/Testmonials'
import InstagramsImgs from '../components/home/InstagramsImgs'

export default function Home() {
  
  return (
    <main>
      <Hero />
      <Menue />
      <Gallery />
      {/* <Offer /> */}
      <InstagramsImgs />
      <Testmonials />
    </main>

  );
}
