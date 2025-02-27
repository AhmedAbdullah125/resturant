'use client'
import React, { useState, useEffect, useContext } from 'react'
// import { CounterContext } from '@/app/Context/CounterContext';
import { CounterContext } from '@/app/Context/CounterContext'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import Link from 'next/link';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"

export default function CartBody() {
    let { cartCont, cartHandling } = useContext(CounterContext);
    let cartContCopy = [...cartCont];
    let totalPrice = 0;
    let [worningDisplay, setWorningDisplay] = useState(false);
    const [tax, setTax] = useState(totalPrice * .15);
    const router = useRouter();
    for (let index = 0; index < cartCont.length; index++) {
        totalPrice += Number(cartCont[index].price) * Number(cartCont[index].Quantity);
    }
    useEffect(() => {
        //scroll to the top of the page
        window.scrollTo(0, 0);
        setTax(totalPrice * .15);
    }, [])

    const formatCartMessage = (cart, total, tax) => {
        if (cart.length === 0) {
            return "My cart is empty.";
        }

        let message = "🛒 *My Order Details*:\n\n";

        cart.forEach((item, index) => {
            message += `⭐️ *${item.name}*\n`;
            message += `📦 Quantity: ${item.Quantity}\n`;
            message += `💰 Price: ${item.price} K.D each\n`;
            message += "-----------------\n";
        });

        message += `🧾 *Total Price*: ${total} K.D\n`;
        message += `📊 *VAT (15%)*: ${tax} K.D\n`;
        message += `💵 *Grand Total*: ${(total + tax).toFixed(2)} K.D\n\n`;
        message += "📌 *Please confirm my order.*";

        return message;
    };
    return (
        <div className="cart-body">
            <div className="prods">
                <div className="prods-heading">
                    <h2>Products ( {cartCont.length} )</h2>
                    <button
                        onClick={() => {
                            localStorage.setItem('cart', JSON.stringify([]));
                            cartHandling([]);
                            router.push('/');
                        }}
                    ><i className="fa-regular fa-trash-can"></i> clear all cart</button>
                </div>
                <div className="cart-products">
                    {
                        cartCont.length === 0 ? <p className='empty'>Cart is Empty</p> :
                            cartCont.map((item, index) =>
                                <div className="cart-product" key={index}>
                                    <div className="l-side">
                                        <div className="img-cont">
                                            <Image src={item.images[0]} width={100} height={100} alt='product' className='product-img'></Image>
                                        </div>
                                        <div className="info">
                                            <p className='title'>{item.name}</p>
                                            <div className="rate">
                                                <i className={`fa-solid fa-star ${item.rate >= 1 ? "golden" : ""}`}></i>
                                                <i className={`fa-solid fa-star ${item.rate >= 2 ? "golden" : ""}`}></i>
                                                <i className={`fa-solid fa-star ${item.rate >= 3 ? "golden" : ""}`}></i>
                                                <i className={`fa-solid fa-star ${item.rate >= 4 ? "golden" : ""}`}></i>
                                                <i className={`fa-solid fa-star ${item.rate >= 5 ? "golden" : ""}`}></i>
                                            </div>
                                            <p className='price'>{item.price} $</p>
                                        </div>
                                    </div>
                                    <div className="r-side">

                                        <div className="count-cont">
                                            <div className="prod-count">
                                                {
                                                    item.Quantity > 1 ?
                                                        <span className='minus' onClick={() => {
                                                            if (item.Quantity > 1) {
                                                                cartContCopy[index].Quantity = item.Quantity - 1;
                                                                cartHandling(cartContCopy);
                                                            }

                                                        }}
                                                        >-</span>
                                                        :
                                                        <span className='minus'>
                                                            <AlertDialog >
                                                                <AlertDialogTrigger asChild>
                                                                    <i className="fa-regular fa-trash-can trach-in-cart-count" ></i>
                                                                </AlertDialogTrigger>
                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>Are you sure you want to remove this product from Cart?</AlertDialogTitle>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter className={"flex flex-col-reverse sm:flex-row sm:justify-center sm:space-x-2"}>
                                                                        <AlertDialogCancel className="m-0">Cancel</AlertDialogCancel>
                                                                        <AlertDialogAction className={"bg-[#C71919]"} onClick={() => {
                                                                            cartContCopy.splice(index, 1);
                                                                            cartHandling(cartContCopy);
                                                                        }}>Remove</AlertDialogAction>
                                                                    </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>
                                                        </span>
                                                }
                                                <span className='count'>{item.Quantity}</span>
                                                <span className='minus'
                                                    onClick={() => {
                                                        cartContCopy[index].Quantity = item.Quantity + 1;
                                                        cartHandling(cartContCopy);
                                                    }}
                                                >+</span>

                                            </div>
                                            <p className='availability' style={{ display: "none" }}>Only {item.availability_number} available</p>
                                        </div>
                                    </div>
                                </div>
                            )
                    }
                </div>
            </div>
            {

                cartCont.length === 0 ? null :
                    <div className="price-summary">
                        <h2>Price Summary</h2>
                        <div className="price-details">
                            <div className="flex-dit">
                                <div className="head">Total Items</div>
                                <div className="value">{totalPrice} K.D</div>
                            </div>
                            <div className="flex-dit">
                                <div className="head">Total VAT</div>
                                <div className="value">{tax} K.D</div>
                            </div>

                        </div>
                        <div className="total">
                            <div className="head">Total</div>
                            <div className="value">{totalPrice + tax} K.D</div>
                        </div>
                        <Link
                            href={`https://wa.me/+201068389295?text=${encodeURIComponent(formatCartMessage(cartCont, totalPrice, tax))}`}
                            className='addBtn'
                        >
                            Checkout
                        </Link>
                        <p className='worning' style={{ display: worningDisplay ? 'block' : 'none' }}>Please Add Products To Cart</p>
                    </div>
            }
        </div >
    )
}
