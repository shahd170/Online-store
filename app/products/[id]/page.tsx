import { getProductById, getProducts } from "@/app/lib/api";
import Image from "next/image";
import Link from "next/link";
import { FaStar, FaArrowLeft, FaArrowRight, FaCheckCircle, FaTruck, FaShieldAlt } from "react-icons/fa";
import AddToCartBtn from "@/app/components/AddToCartBtn";
import ProductDetailsClient from "@/app/components/ProductDetailsClient"; // مكون جديد للترجمة

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductDetails({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
        <Link href="/products" className="btn-primary mt-6">
          Return to shopping
        </Link>
      </div>
    );
  }

  const allProducts = await getProducts();
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    // نغلف المحتوى بمكون Client للتعامل مع الترجمة ديناميكياً
    <ProductDetailsClient product={product} relatedProducts={relatedProducts} />
  );
}