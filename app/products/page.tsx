import { getProductsByCategory, getCategories, Product } from "@/app/lib/api";
import Link from "next/link";
import Image from "next/image";
import AddToCartBtn from "@/app/components/AddToCartBtn"; // لنضيف الزر مباشرة هنا أيضاً

interface Props {
  params: Promise<{ name: string }>;
}

export default async function CategoryPage({ params }: Props) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);

  const [products, categories]: [Product[], string[]] = await Promise.all([
    getProductsByCategory(decodedName),
    getCategories(),
  ]);

  return (
    <main className="min-h-screen bg-[#F9FAFB] pb-20">
      {/* Header محسّن مع تأثير زجاجي بسيط */}
      <div className="bg-dark py-20 mb-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-primary blur-3xl"></div>
          <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-blue-500 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <nav className="mb-6">
             <Link href="/products" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 text-sm font-medium">
                <span className="text-lg">←</span> Back to Collections
             </Link>
          </nav>
          <h1 className="text-5xl font-black text-white capitalize tracking-tight">
            {decodedName}
          </h1>
          <div className="mt-4 flex items-center gap-3">
            <span className="h-1 w-12 bg-primary rounded-full"></span>
            <p className="text-gray-300 font-medium">Explore our curated {products.length} items</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar محسّن */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="sticky top-28 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-xl mb-6 text-dark flex items-center gap-2">
                Categories
              </h3>
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li key={cat}>
                    <Link 
                      href={`/products/category/${cat}`} 
                      className={`block px-4 py-3 rounded-xl capitalize transition-all duration-300 ${
                        cat === decodedName 
                        ? "bg-primary text-white shadow-md shadow-pink-100 translate-x-2" 
                        : "text-gray-500 hover:bg-gray-50 hover:text-dark hover:translate-x-1"
                      }`}
                    >
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Grid المنتجات محسّن */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 flex-1">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="group bg-white rounded-[2rem] p-6 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 flex flex-col border border-transparent hover:border-gray-100"
              >
                {/* صورة المنتج مع خلفية ناعمة */}
                <div className="relative h-64 w-full mb-6 bg-gray-50 rounded-2xl overflow-hidden">
                   <Link href={`/products/${product.id}`}>
                      <Image 
                        src={product.image} 
                        alt={product.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-contain p-8 group-hover:scale-110 transition-transform duration-700 ease-in-out"
                      />
                   </Link>
                   <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-dark border border-white">
                      ★ {product.rating.rate}
                   </div>
                </div>

                {/* التفاصيل */}
                <div className="flex flex-col flex-1 px-2">
                  <h3 className="font-bold text-dark text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                  
                  <div className="mt-auto pt-6 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                       <span className="text-2xl font-black text-dark">${product.price}</span>
                       <span className="text-xs text-gray-400 font-medium">{product.rating.count} reviews</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Link 
                        href={`/products/${product.id}`}
                        className="flex-1 text-center py-3 rounded-xl border border-gray-200 text-dark font-bold text-sm hover:bg-gray-50 transition-all"
                      >
                        Details
                      </Link>
                      <AddToCartBtn product={product} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}