import { getProducts, getCategories, Product } from "@/app/lib/api";
import Link from "next/link";
import Image from "next/image";
import { FaFilter, FaThLarge } from "react-icons/fa";

export default async function ProductsPage() {
  // جلب البيانات من السيرفر بشكل متوازي لتحسين السرعة
  const [products, categories]: [Product[], string[]] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <main className="min-h-screen bg-[#fcfcfc] pb-20">
      
      {/* قسم العنوان العلوي - Hero Header */}
      <div className="bg-dark text-white py-20 mb-12 relative overflow-hidden">
        {/* لمسة تصميمية خلفية */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Our <span className="text-primary">Collection</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Explored our curated selection of premium goods. From high-end electronics 
            to artisanal jewelry, find exactly what fits your lifestyle.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* شريط جانبي: التصنيفات - Sidebar */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="sticky top-28">
              <div className="flex items-center gap-2 mb-8 uppercase tracking-[0.2em] text-xs font-black text-gray-400">
                <FaFilter className="text-primary" />
                <span>Filter by Category</span>
              </div>
              
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/products" 
                    className="flex items-center justify-between px-5 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm text-dark font-bold hover:border-primary hover:text-primary transition-all group"
                  >
                    All Products
                    <span className="bg-gray-100 group-hover:bg-primary group-hover:text-white px-2 py-0.5 rounded-md text-[10px] transition-colors">
                      {products.length}
                    </span>
                  </Link>
                </li>
                {categories.map((cat) => (
                  <li key={cat}>
                    <Link 
                      href={`/products/category/${cat}`} 
                      className="flex items-center px-5 py-4 rounded-2xl text-gray-500 font-semibold hover:bg-white hover:shadow-md hover:text-dark transition-all capitalize border border-transparent"
                    >
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* بطاقة عرض ترويجية صغيرة في الجانب */}
              <div className="mt-12 bg-primary rounded-[2rem] p-8 text-white relative overflow-hidden">
                 <div className="relative z-10">
                    <p className="font-bold text-xl mb-2">Free Shipping</p>
                    <p className="text-sm opacity-80 mb-4">On all orders over $200. Shop more, save more!</p>
                    <button className="text-xs font-black uppercase tracking-widest bg-white text-primary px-4 py-2 rounded-full">Learn More</button>
                 </div>
                 <FaThLarge className="absolute -bottom-4 -right-4 text-white/10 text-8xl rotate-12" />
              </div>
            </div>
          </aside>

          {/* شبكة المنتجات - Products Grid */}
          <div className="flex-1">
            {/* أدوات التحكم العلوية */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-400 font-medium">Result: <span className="text-dark font-bold">{products.length} Items</span></span>
              </div>
              
              <div className="flex items-center gap-3">
                <label className="text-xs font-bold uppercase text-gray-400">Sort By:</label>
                <select className="bg-gray-50 border-none rounded-xl px-4 py-2.5 text-sm font-bold text-dark focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer">
                  <option>Newest Arrivals</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* قائمة المنتجات */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className="group bg-white border border-gray-100 rounded-[2rem] p-2 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 flex flex-col"
                >
                  {/* حاوية الصورة */}
                  <div className="relative h-72 w-full overflow-hidden rounded-[1.8rem] bg-[#f9f9f9] transition-all">
                    <Image 
                      src={product.image} 
                      alt={product.title}
                      fill
                      className="object-contain p-10 transform group-hover:scale-110 transition duration-700 ease-in-out"
                    />
                    {/* وسم سريع على الصورة */}
                    <div className="absolute top-4 left-4">
                       <span className="bg-white/90 backdrop-blur-sm text-dark px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-sm">
                         {product.category}
                       </span>
                    </div>
                  </div>

                  {/* تفاصيل المنتج */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-bold text-dark text-lg mb-3 line-clamp-2 min-h-[3.5rem] group-hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-gray-400 uppercase">Price</span>
                        <p className="text-2xl font-black text-dark">
                          ${product.price}
                        </p>
                      </div>
                      
                      <Link 
                        href={`/products/${product.id}`} 
                        className="bg-dark text-white w-12 h-12 rounded-2xl flex items-center justify-center hover:bg-primary transition-all shadow-lg active:scale-90"
                      >
                        <FaThLarge size={18} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}