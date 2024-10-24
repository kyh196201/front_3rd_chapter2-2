import { CartItem, Coupon, Product } from '../../types';

export const getMaxApplicableDiscount = (item: CartItem) => {
  const { product, quantity } = item;

  const discount = product.discounts.reduce((maxDiscount, d) => {
    return quantity >= d.quantity && d.rate > maxDiscount ? d.rate : maxDiscount;
  }, 0);

  return discount;
};

export const calculateItemTotal = (item: CartItem) => {
  const { product, quantity } = item;

  const discount = getMaxApplicableDiscount(item);

  return product.price * quantity * (1 - discount);
};

export const calculateCartTotal = (cart: CartItem[], selectedCoupon: Coupon | null) => {
  const totalBeforeDiscount = cart.reduce((total, { product, quantity }) => {
    return total + product.price * quantity;
  }, 0);

  let totalAfterDiscount = cart.reduce((total, { product, quantity }) => {
    const discount = product.discounts.reduce((maxDiscount, d) => {
      return quantity >= d.quantity && d.rate > maxDiscount ? d.rate : maxDiscount;
    }, 0);

    return total + product.price * quantity * (1 - discount);
  }, 0);

  let totalDiscount = totalBeforeDiscount - totalAfterDiscount;

  // 쿠폰 적용
  if (selectedCoupon) {
    if (selectedCoupon.discountType === 'amount') {
      totalAfterDiscount = Math.max(0, totalAfterDiscount - selectedCoupon.discountValue);
    } else {
      totalAfterDiscount *= 1 - selectedCoupon.discountValue / 100;
    }
    totalDiscount = totalBeforeDiscount - totalAfterDiscount;
  }

  return {
    totalBeforeDiscount: Math.round(totalBeforeDiscount),
    totalAfterDiscount: Math.round(totalAfterDiscount),
    totalDiscount: Math.round(totalDiscount),
  };
};

export const updateCartItemQuantity = (cart: CartItem[], productId: string, newQuantity: number): CartItem[] => {
  const newCart = cart
    .map((item) => {
      if (item.product.id === productId) {
        const maxQuantity = item.product.stock;
        const updatedQuantity = Math.max(0, Math.min(newQuantity, maxQuantity));
        return updatedQuantity > 0 ? { ...item, quantity: updatedQuantity } : null;
      }
      return item;
    })
    .filter((item): item is CartItem => item !== null);

  return newCart;
};

export const getAppliedDiscount = (item: CartItem) => {
  const { discounts } = item.product;
  const { quantity } = item;
  let appliedDiscount = 0;
  for (const discount of discounts) {
    if (quantity >= discount.quantity) {
      appliedDiscount = Math.max(appliedDiscount, discount.rate);
    }
  }
  return appliedDiscount;
};

export const getRemainingStock = (cart: CartItem[], product: Product) => {
  const cartItem = cart.find((item) => item.product.id === product.id);
  return product.stock - (cartItem?.quantity || 0);
};
