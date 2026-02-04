"use client";
import { useState, useEffect } from "react";
import { FaGlobe } from "react-icons/fa";

export default function LanguageToggle() {
  const [lang, setLang] = useState("AR");

  const toggleLanguage = () => {
    const newLang = lang === "AR" ? "EN" : "AR";
    setLang(newLang);
    
    // تغيير اتجاه الموقع بالكامل
    document.documentElement.dir = newLang === "AR" ? "rtl" : "ltr";
    document.documentElement.lang = newLang === "AR" ? "ar" : "en";
    
    // هنا يمكن إضافة منطق تغيير النصوص لاحقاً
  };

  return (
    <button 
      onClick={toggleLanguage}
      className="flex items-center gap-2 bg-white/10 hover:bg-primary/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 transition-all group"
    >
      <FaGlobe className="text-primary group-hover:rotate-180 transition-transform duration-500" />
      <span className="text-xs font-black tracking-widest">
        {lang === "AR" ? "ENGLISH" : "العربية"}
      </span>
    </button>
  );
}