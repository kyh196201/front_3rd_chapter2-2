import { useState } from 'react';
import { Product } from '../../types.ts';

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState(initialProducts);

  const addProduct = (newProduct: Product) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prevProducts) => prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
  };

  return { products, updateProduct, addProduct };
};
