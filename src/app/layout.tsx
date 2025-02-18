
import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/header/Header';
import Footer from '../components/home/Footer';
import '@fortawesome/fontawesome-free/css/all.min.css'
import '../style/main.css';
import logo from '../assets/images/home/logo.svg'
import { CounterProvider } from "./Context/CounterContext";
import { Toaster } from "../components/ui/sonner"


export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Foodi',
    keywords: "Food , Foodi , Foodie , Foodies ,resturent",
    description: "Foodi is a food delivery application that provides a variety of food delivery services in Makkah and Medina. Select from a variety of top-rated restaurants and enjoy the easy and convenient navigation.",
    openGraph: {
      title: "Foodi",
      description: "Foodi is a food delivery application that provides a variety of food delivery services in Makkah and Medina. Select from a variety of top-rated restaurants and enjoy the easy and convenient navigation.",
      url: 'https://resturant-five-sandy.vercel.app/',
      siteName: "Foodi",
      images: [
        {
          url: "https://resturant-five-sandy.vercel.app/_next/static/media/logo.884c1d19.svg",
          width: 1200,
          height: 630,
          alt: 'Foodi',
        },
      ],
      type: 'website',
      locale: 'en_US',
    },
  };
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir='ltr' id='root'>
      {/* Google Tag Manager */}
      <body className="w-full" suppressHydrationWarning={true}>
        <CounterProvider>
          <Header />
          {children}
          <Footer />
          <Toaster />
        </CounterProvider>
      </body>
    </html>
  );
}
