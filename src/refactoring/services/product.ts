import { Product } from '../../types';

export type ProductData = Omit<Product, 'id'>;

export const createProduct = (data: ProductData): Product => {
  return {
    id: Date.now().toString(),
    name: data.name,
    price: data.price,
    stock: data.stock,
    discounts: data.discounts,
  };
};
