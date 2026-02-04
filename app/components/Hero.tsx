"use client";

import Link from "next/link";
import { FaArrowRight, FaArrowLeft, FaRocket, FaShieldAlt, FaStar, FaHeart } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext"; // 1. استيراد سياق اللغة

export default function Hero() {
  const { lang, content } = useLanguage(); // 2. جلب اللغة والنصوص
  const t = content.hero; // اختصار للوصول لنصوص الهيرو

  return (
    <section className="relative bg-[#0a0a0a] text-white py-24 lg:py-32 overflow-hidden flex items-center min-h-[85vh]">
      
      {/* تأثيرات الخلفية (Background Glow) */}
      <div className={`absolute top-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse ${lang === 'ar' ? 'right-1/4' : 'left-1/4'}`}></div>
      <div className={`absolute bottom-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] -z-10 ${lang === 'ar' ? 'left-1/4' : 'right-1/4'}`}></div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* المحتوى النصي: يتبدل التموضع بناءً على اللغة */}
        <div className={`space-y-8 text-center ${lang === 'ar' ? 'lg:text-right' : 'lg:text-left'}`}>
          
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full animate-fade-in-up">
            <FaStar className="text-yellow-400 text-xs" />
            <span className="text-xs font-bold tracking-widest uppercase text-gray-400">
              {t.badge}
            </span>
            {lang === 'ar' && <FaHeart className="text-primary text-xs" />}
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-[1.2] tracking-tight">
            {t.title_1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-400">
              {t.title_2}
            </span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
            {t.description}
          </p>
          
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-5 ${lang === 'ar' ? 'lg:justify-start' : 'lg:justify-start'}`}>
            <Link 
              href="/products" 
              className="group bg-primary hover:bg-primary-hover text-white px-10 py-4 rounded-2xl font-black transition-all flex items-center gap-3 shadow-2xl shadow-primary/20 hover:-translate-y-1 active:scale-95 w-full sm:w-auto"
            >
              {t.btn_shop} 
              {lang === 'ar' ? (
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              ) : (
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              )}
            </Link>
            
            <Link 
              href="/contact" 
              className="bg-white/5 border border-white/10 hover:bg-white/10 text-white px-10 py-4 rounded-2xl font-bold transition-all backdrop-blur-md w-full sm:w-auto"
            >
              {t.btn_partner}
            </Link>
          </div>

          {/* مميزات سريعة (Trust Badges) */}
          <div className={`pt-8 flex flex-wrap justify-center gap-8 opacity-50 ${lang === 'ar' ? 'lg:justify-start' : 'lg:justify-start'}`}>
            <div className="flex items-center gap-2">
              <FaShieldAlt className="text-primary" />
              <span className="text-xs font-bold uppercase tracking-widest">
                {content.common.secure}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaRocket className="text-primary" />
              <span className="text-xs font-bold uppercase tracking-widest">
                {content.common.fast_delivery}
              </span>
            </div>
          </div>
        </div>

        {/* الجزء البصري: البطاقة الطافية */}
        <div className={`relative flex justify-center animate-float ${lang === 'ar' ? 'lg:justify-end' : 'lg:justify-end'}`}>
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-75"></div>
          
          <div className={`relative bg-gradient-to-br from-white/10 to-white/5 p-1 backdrop-blur-2xl rounded-[3rem] border border-white/20 shadow-2xl transition-all duration-700 ${lang === 'ar' ? '-rotate-2 hover:rotate-0' : 'rotate-2 hover:rotate-0'}`}>
            <div className="bg-[#0a0a0a] rounded-[2.8rem] p-12 flex flex-col items-center justify-center border border-white/5">
              <div className="w-48 h-48 bg-gradient-to-br from-primary to-pink-600 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(209,40,136,0.3)]">
                <FaRocket className="text-white text-7xl" />
              </div>
              <div className="mt-8 text-center">
                <p className="text-primary font-black text-2xl">
                  {lang === 'ar' ? 'S & F' : '99.9%'}
                </p>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
                  {lang === 'ar' ? 'إبداع بلا حدود' : 'Uptime Performance'}
                </p>
              </div>
            </div>
          </div>

          {/* بطاقة الطلبات الحية */}
          <div className={`absolute -bottom-6 bg-white p-5 rounded-2xl shadow-2xl animate-bounce-slow hidden sm:block ${lang === 'ar' ? '-right-6' : '-left-6'}`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                 <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
              </div>
              <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                <p className="text-dark font-black text-sm">
                  {lang === 'ar' ? 'طلب جديد!' : 'New Sale!'}
                </p>
                <p className="text-gray-400 text-[10px]">
                  {lang === 'ar' ? 'تم الشراء الآن من دبي' : 'Just now in Dubai'}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}