"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { FaShoppingBag, FaSearch, FaStore, FaGlobe } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { cartCount } = useCart();
  const { lang, toggleLanguage, content } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);

  const t = content.nav;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // تعديل ذكي للألوان: 
  // في كلتا الحالتين سيكون النص داكناً ليظهر على الخلفية البيضاء
  // الفرق سيكون في "كثافة" الخلفية والظلال فقط
  const textColor = "text-[#1a1a1a]"; 
  const linkColor = "text-gray-600 hover:text-primary transition-colors duration-300";

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
      ? "bg-white/95 backdrop-blur-md shadow-lg py-3" 
      : "bg-white/50 py-5 border-b border-gray-100/50" // شفافية بسيطة جداً في البداية لتناسب الخلفية البيضاء
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* اللوجو - دائماً داكن ليظهر بوضوح */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
            <FaStore className="text-white text-xl" />
          </div>
          <span className={`text-2xl font-black tracking-tighter ${textColor}`}>
            SHAHED <span className="text-primary font-outline-2">FATEMA</span>
          </span>
        </Link>

        {/* روابط التنقل - داكنة */}
        <div className={`hidden md:flex items-center gap-8 font-bold text-xs uppercase tracking-widest ${linkColor}`}>
          <Link href="/">{t.home}</Link>
          <Link href="/products">{t.products}</Link>
          <Link href="/contact">{t.contact}</Link>
        </div>

        {/* الأيقونات وزر اللغة */}
        <div className="flex items-center gap-4 sm:gap-6">
          
          {/* زر اللغة - خلفية خفيفة جداً ليبرز */}
          <button 
            onClick={toggleLanguage}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 transition-all duration-300 hover:bg-gray-50 hover:border-primary/30 ${textColor}`}
          >
            <FaGlobe className="text-primary" />
            <span className="text-[10px] font-black uppercase tracking-widest">
              {lang === 'ar' ? 'English' : 'العربية'}
            </span>
          </button>

          {/* أيقونة البحث */}
          <button className={`${textColor} hover:text-primary transition-colors`}>
            <FaSearch size={18} />
          </button>

          {/* أيقونة السلة */}
          <Link href="/cart" className="relative group p-2">
            <FaShoppingBag size={22} className={`${textColor} group-hover:text-primary transition-colors`} />
            
            {cartCount > 0 && (
              <span className="absolute -top-0 -right-0 bg-primary text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-md">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

      </div>
    </nav>
  );
}