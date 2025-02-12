'use client'
import React, { useEffect, useState } from 'react';
import Hero from '../components/home/Hero';
import Gallery from '../components/home/Gallery'
import Menue from '../components/home/Menue'
export default function Home() {
  
  return (
    <main>
      <Hero />
      <Menue />
      <Gallery />
    </main>

  );
}
