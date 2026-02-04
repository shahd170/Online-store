"use client";
import Link from "next/link";
import { FaLaptop, FaGem, FaTshirt, FaRunning } from "react-icons/fa";

const categories = [
  { id: 1, name: "Electronics", icon: <FaLaptop />, slug: "electronics", color: "bg-blue-500" },
  { id: 2, name: "Jewelry", icon: <FaGem />, slug: "jewelry", color: "bg-purple-500" },
  { id: 3, name: "Men's Clothing", icon: <FaTshirt />, slug: "men's clothing", color: "bg-orange-500" },
  { id: 4, name: "Women's Clothing", icon: <FaRunning />, slug: "women's clothing", color: "bg-pink-500" },
];

export default function Categories() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-black text-dark mb-2">Shop by Category</h2>
            <p className="text-gray-400 font-medium">Find exactly what you're looking for</p>
          </div>
          <Link href="/products" className="text-primary font-bold hover:underline">View All</Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link 
              key={cat.id} 
              href={`/products/category/${cat.slug}`}
              className="group bg-surface p-8 rounded-3xl flex flex-col items-center justify-center gap-4 transition-all hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 border border-transparent hover:border-gray-100"
            >
              <div className={`${cat.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform`}>
                {cat.icon}
              </div>
              <span className="font-bold text-dark group-hover:text-primary transition-colors">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}