"use client";

import Image from "next/image";
import Link from "next/link";
import { FaStar, FaArrowLeft, FaArrowRight, FaCheckCircle, FaTruck, FaShieldAlt } from "react-icons/fa";
import AddToCartBtn from "@/app/components/AddToCartBtn";
import { useLanguage } from "../context/LanguageContext";

export default function ProductDetailsClient({ product, relatedProducts }: any) {
  const { lang, content } = useLanguage();
  const t = content.products;
  const d = content.details;

  return (
    <div className="container mx-auto px-6 py-12">
      {/* زر العودة - يغير اتجاه السهم */}
      <Link 
        href="/products" 
        className="group flex items-center text-gray-500 hover:text-primary mb-10 w-fit transition-all font-bold"
      >
        {lang === 'ar' ? <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" /> : <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />}
        {t.back_to_collection}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* قسم الصورة */}
        <div className="lg:sticky lg:top-32 bg-white p-8 md:p-12 rounded-[2.5rem] border border-gray-100 flex justify-center items-center h-[400px] md:h-[600px] relative overflow-hidden shadow-2xl shadow-gray-100/50">
          <Image
            src={product.image}
            alt={product.title}
            fill
            priority
            className="object-contain p-6 hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* قسم التفاصيل */}
        <div className="flex flex-col">
          <div className="mb-4">
            <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
              {content.categories[product.category] || product.category}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black text-dark mb-6 leading-tight">
            {product.title}
          </h1>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FaStar 
                  key={i} 
                  className={i < Math.round(product?.rating?.rate || 0) ? "fill-current" : "text-gray-200"} 
                />
              ))}
            </div>
            <span className="text-gray-400 text-sm font-bold tracking-tighter uppercase">
              {product?.rating?.count || 0} {t.reviews}
            </span>
          </div>

          <p className="text-gray-500 leading-relaxed mb-10 text-lg">
            {product.description}
          </p>

          <div className="bg-gray-50 p-8 rounded-[2rem] mb-10 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{t.price_label}</p>
                    <span className="text-4xl font-black text-dark">${product.price}</span>
                </div>
                <div className={lang === 'ar' ? 'text-left' : 'text-right'}>
                    <div className="flex items-center gap-2 text-green-600 font-bold text-sm">
                        <FaCheckCircle /> <span>{d.in_stock}</span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1">{d.dispatch_msg}</p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <AddToCartBtn product={product} />
              </div>
              <button className="flex-1 border-2 border-dark text-dark py-4 rounded-2xl font-black hover:bg-dark hover:text-white transition-all active:scale-95">
                {t.buy_now}
              </button>
            </div>
          </div>

          {/* مميزات بصرية */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-2xl flex items-center gap-3">
              <FaTruck className="text-primary" />
              <span className="text-[10px] font-bold uppercase">{d.express_shipping}</span>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl flex items-center gap-3">
              <FaShieldAlt className="text-primary" />
              <span className="text-[10px] font-bold uppercase">{d.warranty}</span>
            </div>
          </div>
        </div>
      </div>

      {/* قسم المنتجات ذات الصلة */}
      {relatedProducts.length > 0 && (
        <div className="mt-32">
          <h2 className="text-3xl font-black mb-10 text-dark">
            {t.you_might_like.split(' ')[0]} <span className="text-primary">{t.you_might_like.split(' ').slice(1).join(' ')}</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p: any) => (
              <Link key={p.id} href={`/products/${p.id}`} className="group">
                <div className="bg-white p-6 rounded-3xl border border-gray-100 mb-4 h-48 relative overflow-hidden">
                  <Image src={p.image} alt={p.title} fill className="object-contain p-4 group-hover:scale-110 transition-transform" />
                </div>
                <h4 className="font-bold text-sm truncate">{p.title}</h4>
                <p className="text-primary font-black">${p.price}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}