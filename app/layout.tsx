import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";
import { LanguageProvider } from "./context/LanguageContext"; // استيراد مزود اللغة
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "متجر شهد وفاطمة | S&F Store",
  description: "اكتشف أفضل المنتجات المختارة بعناية في متجر شهد وفاطمة",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // ملاحظة: الـ LanguageProvider سيقوم بتحديث lang و dir تلقائياً 
    // ولكن نضع القيم الافتراضية هنا لتجنب وميض المحتوى (Content Flash)
    <html lang="ar" dir="rtl">
      <body className={inter.className}>
        <LanguageProvider>
          <CartProvider>
            <Toaster 
              position="top-center" 
              reverseOrder={false} 
              toastOptions={{
                // تنسيق التنبيهات ليكون متناسقاً مع التصميم الفخم
                style: {
                  borderRadius: '1rem',
                  background: '#333',
                  color: '#fff',
                  fontFamily: 'inherit'
                },
              }}
            />
            
            <Navbar />
            
            <main className="pt-24 min-h-screen transition-all duration-500">
              {children}
            </main>
            
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}