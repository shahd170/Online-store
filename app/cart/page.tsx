"use client";

import { useCart } from "../context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { FaTrash, FaArrowRight, FaShoppingBag, FaPlus, FaMinus } from "react-icons/fa";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  // إعدادات الشحن
  const shippingThreshold = 200; 
  const isFreeShipping = totalPrice >= shippingThreshold;
  const shippingCost = isFreeShipping ? 0 : 15;

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 animate-fade-in">
        <div className="bg-gray-100 p-8 rounded-full mb-6">
            <FaShoppingBag className="text-6xl text-gray-300" />
        </div>
        <h2 className="text-3xl font-bold text-dark mb-4">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-8 max-w-md leading-relaxed">
          Looks like you haven't added anything to your cart yet. 
          Start exploring our collection and find something you love!
        </p>
        <Link 
          href="/products" 
          className="bg-primary text-white px-10 py-4 rounded-xl font-bold hover:shadow-xl hover:shadow-primary/20 transition-all active:scale-95"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex items-center gap-4 mb-10">
        <h1 className="text-4xl font-black text-dark">Your Bag</h1>
        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-bold">
          {cart.length} Items
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* المنتجات */}
        <div className="lg:col-span-2 space-y-6">
          {/* تنبيه الشحن المجاني الذكي */}
          {!isFreeShipping ? (
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex items-center justify-between">
              <p className="text-blue-700 text-sm font-medium">
                Add <span className="font-bold">${(shippingThreshold - totalPrice).toFixed(2)}</span> more to unlock <strong>FREE SHIPPING</strong>
              </p>
              <Link href="/products" className="text-blue-700 underline text-xs font-bold">Shop more</Link>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-100 p-4 rounded-2xl">
              <p className="text-green-700 text-sm font-medium">🎉 You've qualified for <strong>Free Shipping!</strong></p>
            </div>
          )}

          {cart.map((item) => (
            <div key={item.id} className="group flex flex-col sm:flex-row items-center bg-white p-6 rounded-3xl shadow-sm border border-gray-100 gap-6 transition-all hover:shadow-md">
              
              <div className="w-28 h-28 relative flex-shrink-0 bg-gray-50 rounded-2xl p-4 overflow-hidden">
                <Image src={item.image} alt={item.title} fill className="object-contain group-hover:scale-110 transition-transform duration-500" />
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-bold text-dark text-lg line-clamp-1 mb-1">{item.title}</h3>
                <p className="text-gray-400 text-xs mb-4 capitalize tracking-wide">{item.category}</p>
                
                {/* التحكم بالكمية المدمج */}
                <div className="flex items-center justify-center sm:justify-start gap-6">
                  <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 p-1">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition shadow-sm"
                    >
                      <FaMinus className="text-[10px]" />
                    </button>
                    <span className="px-4 font-bold text-dark">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition shadow-sm"
                    >
                      <FaPlus className="text-[10px]" />
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-600 text-sm font-medium transition flex items-center gap-1"
                  >
                    <FaTrash size={12} /> Remove
                  </button>
                </div>
              </div>

              <div className="sm:text-right flex flex-col items-center sm:items-end">
                <span className="font-black text-2xl text-dark">${(item.price * item.quantity).toFixed(2)}</span>
                <span className="text-gray-400 text-xs">${item.price} per unit</span>
              </div>

            </div>
          ))}
        </div>

        {/* ملخص الطلب - Order Summary */}
        <div className="h-fit sticky top-28">
            <div className="bg-dark text-white p-8 rounded-[2rem] shadow-2xl overflow-hidden relative">
                {/* زخرفة خلفية بسيطة */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                
                <h2 className="text-2xl font-bold mb-8">Order Summary</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-400 font-medium">
                    <span>Subtotal</span>
                    <span className="text-white">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400 font-medium">
                    <span>Shipping</span>
                    <span className={isFreeShipping ? "text-green-400 font-bold" : "text-white"}>
                      {isFreeShipping ? "FREE" : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                </div>
                
                <div className="border-t border-gray-700 pt-6 flex justify-between items-center mb-10">
                  <span className="text-lg font-medium text-gray-300">Total Amount</span>
                  <span className="text-3xl font-black text-primary">${(totalPrice + shippingCost).toFixed(2)}</span>
                </div>

                <button className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg hover:bg-primary-hover transition-all flex justify-center items-center gap-3 shadow-lg shadow-primary/20 active:scale-95">
                  Checkout Now <FaArrowRight />
                </button>

                <div className="mt-6 flex items-center justify-center gap-4 opacity-50">
                   <div className="h-[1px] flex-1 bg-gray-600"></div>
                   <span className="text-[10px] uppercase tracking-widest font-bold">Secure Payment</span>
                   <div className="h-[1px] flex-1 bg-gray-600"></div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}