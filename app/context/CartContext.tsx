"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "../lib/api";

// 1. تعريف شكل العنصر داخل السلة
export interface CartItem extends Product {
  quantity: number;
}

// 2. تعريف وظائف الـ Context (أضفنا updateQuantity هنا)
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void; // الدالة المطلوبة
  totalPrice: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // 3. استرجاع السلة من LocalStorage عند بدء التشغيل فقط
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  // 4. حفظ السلة في LocalStorage تلقائياً عند أي تغيير يطرأ عليها
  useEffect(() => {
    if (cart.length > 0 || localStorage.getItem("cart")) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  // دالة إضافة منتج للسلة
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // 5. دالة تحديث الكمية (الزيادة والنقصان) - هي التي كانت تنقصك
  const updateQuantity = (id: number, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0) // إذا أصبحت الكمية 0، يتم حذف المنتج تلقائياً
    );
  };

  // دالة حذف منتج نهائياً
  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // حساب السعر الكلي
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  
  // حساب عدد المنتجات الإجمالي
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider 
      value={{ cart, addToCart, removeFromCart, updateQuantity, totalPrice, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom Hook لسهولة الاستخدام
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};