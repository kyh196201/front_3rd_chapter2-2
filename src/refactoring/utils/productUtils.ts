import { Product } from '../../types';
import { updateObject } from './objectUtils';

/**
 * 제품에서 특정 인덱스의 할인을 제거하고 새로운 Product 객체를 반환합니다.
 *
 * @param {Product} product - 할인을 제거할 Product 객체
 * @param {number} discountIndex - 제거할 할인의 인덱스
 * @returns {Product} 지정된 할인이 제거된 새로운 Product 객체
 */
export const removeDiscountFromProduct = (product: Product, discountIndex: number) => {
  const newDiscounts = product.discounts.filter((_, i) => i !== discountIndex);
  const updatedProduct = updateObject(product, { discounts: newDiscounts });

  return updatedProduct;
};
