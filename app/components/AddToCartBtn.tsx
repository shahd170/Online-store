"use client";

import { useCart } from "@/app/context/CartContext";
import { Product } from "@/app/lib/api";
import { toast } from "react-hot-toast";
import { FaShoppingCart } from "react-icons/fa";

export default function AddToCartBtn({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product);
    
    // إظهار الإشعار الأنيق
    toast.success("Added to bag!", {
      duration: 2000,
      position: "top-center",
      style: {
        background: "#1A1A1A",
        color: "#fff",
        borderRadius: "12px",
        fontSize: "14px",
        fontWeight: "bold",
      },
      icon: "🛍️",
    });
  };

  return (
    <button 
      onClick={handleAdd}
      className="w-full bg-primary text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all active:scale-95 shadow-lg shadow-primary/20"
    >
      <FaShoppingCart size={18} />
      Add to Cart
    </button>
  );
}