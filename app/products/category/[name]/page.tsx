import { getProductsByCategory, getCategories, Product } from "@/app/lib/api";
import Link from "next/link";
import Image from "next/image";

interface Props {
  params: Promise<{ name: string }>;
}

export default async function CategoryPage({ params }: Props) {
  // فك تشفير اسم التصنيف من الرابط
  const { name } = await params;
  const decodedName = decodeURIComponent(name);

  // جلب المنتجات الخاصة بهذا التصنيف فقط + قائمة التصنيفات للجانب
  const [products, categories]: [Product[], string[]] = await Promise.all([
    getProductsByCategory(decodedName),
    getCategories(),
  ]);

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Header الصنف */}
      <div className="bg-primary/10 py-12 mb-12">
        <div className="container mx-auto px-6">
          <Link href="/products" className="text-primary text-sm font-bold mb-4 block hover:underline">
            ← All Collections
          </Link>
          <h1 className="text-4xl font-black text-dark capitalize">
            {decodedName}
          </h1>
          <p className="text-gray-600 mt-2">Found {products.length} items in this category</p>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <h3 className="font-bold text-xl mb-6 pb-2 border-b">Other Categories</h3>
            <ul className="space-y-4">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link 
                    href={`/products/category/${cat}`} 
                    className={`capitalize transition ${
                      cat === decodedName ? "text-primary font-bold" : "text-gray-600 hover:text-primary"
                    }`}
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          {/* Grid المنتجات */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 flex-1">
            {products.map((product) => (
              <div key={product.id} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-xl transition flex flex-col h-full">
                <div className="relative h-48 w-full mb-6 bg-gray-50 rounded-xl">
                  <Image 
                    src={product.image} 
                    alt={product.title}
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <h3 className="font-bold text-dark mb-2 line-clamp-2">{product.title}</h3>
                <p className="text-primary font-black text-xl mb-4">${product.price}</p>
                <Link 
                  href={`/products/${product.id}`} 
                  className="mt-auto w-full text-center border border-dark text-dark py-2 rounded-lg font-bold hover:bg-dark hover:text-white transition"
                >
                  View Product
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}