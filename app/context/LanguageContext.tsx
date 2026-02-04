"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import translations from "@/dictionaries.json";

const LanguageContext = createContext<any>(null);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  // 1. نبدأ باللغة الافتراضية
  const [lang, setLang] = useState("en");

  // 2. عند تحميل المكون لأول مرة، نبحث عن اللغة المحفوظة في localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem("app_lang");
    if (savedLang) {
      setLang(savedLang);
    }
  }, []);

  // 3. دالة تبديل اللغة مع حفظ الخيار الجديد
  const toggleLanguage = () => {
    const newLang = lang === "ar" ? "en" : "ar";
    setLang(newLang);
    localStorage.setItem("app_lang", newLang); // حفظ في المتصفح
  };

  // التأكد من تغيير اتجاه الصفحة (RTL/LTR) تلقائياً
  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  const content = translations[lang as keyof typeof translations];

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, content }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);