import axios from 'axios';

// تعريف شكل البيانات (Type Definition) لضمان عدم حدوث أخطاء
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
});

// 1. جلب جميع المنتجات
export const getProducts = async (): Promise<Product[]> => {
  const { data } = await api.get('/products');
  return data;
};

// 2. جلب منتج واحد بالتفاصيل
export const getProductById = async (id: string): Promise<Product> => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

// 3. جلب التصنيفات (Categories)
export const getCategories = async (): Promise<string[]> => {
  const { data } = await api.get('/products/categories');
  return data;
};

// 4. جلب منتجات حسب التصنيف
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  const { data } = await api.get(`/products/category/${category}`);
  return data;
};