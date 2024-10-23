import { useState } from 'react';
import { Discount, Product } from '../../../types';

interface Props {
  initialProduct: Product;
  onAddDiscount: (updatedProduct: Product) => void;
  onRemoveDiscount: (updatedProduct: Product) => void;
  onEditComplete: (updatedProduct: Product) => void;
}

export const EditProductForm = ({ initialProduct, onAddDiscount, onRemoveDiscount, onEditComplete }: Props) => {
  const [productForm, setProductForm] = useState<Product>(initialProduct);
  const [newDiscount, setNewDiscount] = useState<Discount>({ quantity: 0, rate: 0 });

  // 새로운 핸들러 함수 추가
  const handleProductNameUpdate = (newName: string) => {
    const updatedProduct = { ...productForm, name: newName };
    setProductForm(updatedProduct);
  };

  // 새로운 핸들러 함수 추가
  const handlePriceUpdate = (newPrice: number) => {
    const updatedProduct = { ...productForm, price: newPrice };
    setProductForm(updatedProduct);
  };

  const handleStockUpdate = (newStock: number) => {
    const updatedProduct = { ...productForm, stock: newStock };
    setProductForm(updatedProduct);
  };

  const handleRemoveDiscount = (index: number) => {
    const newDiscounts = productForm.discounts.filter((_, i) => i !== index);

    const updatedProduct = {
      ...productForm,
      discounts: newDiscounts,
    };

    onRemoveDiscount(updatedProduct);
    // onProductUpdate(updatedProduct);

    setProductForm(updatedProduct);
  };

  const handleAddDiscount = () => {
    const newDiscounts = [...productForm.discounts, newDiscount];

    const updatedProduct = {
      ...productForm,
      discounts: newDiscounts,
    };

    // Entity
    onAddDiscount(updatedProduct);
    // onProductUpdate(updatedProduct);

    // View
    setProductForm(updatedProduct);

    // Entity
    setNewDiscount({ quantity: 0, rate: 0 });
  };

  // 수정 완료 핸들러 함수 추가
  const handleEditComplete = () => {
    onEditComplete(productForm);
    // onProductUpdate(editingProduct);
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block mb-1">상품명: </label>
        <input
          type="text"
          value={productForm.name}
          onChange={(e) => handleProductNameUpdate(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">가격: </label>
        <input
          type="number"
          value={productForm.price}
          onChange={(e) => handlePriceUpdate(parseInt(e.target.value))}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">재고: </label>
        <input
          type="number"
          value={productForm.stock}
          onChange={(e) => handleStockUpdate(parseInt(e.target.value))}
          className="w-full p-2 border rounded"
        />
      </div>
      {/* 할인 정보 수정 부분 */}
      <div>
        <h4 className="text-lg font-semibold mb-2">할인 정보</h4>
        {productForm.discounts.map((discount, index) => (
          <div key={index} className="flex justify-between items-center mb-2">
            <span>
              {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
            </span>
            <button
              onClick={() => handleRemoveDiscount(index)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              삭제
            </button>
          </div>
        ))}
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="수량"
            value={newDiscount.quantity}
            onChange={(e) => setNewDiscount({ ...newDiscount, quantity: parseInt(e.target.value) })}
            className="w-1/3 p-2 border rounded"
          />
          <input
            type="number"
            placeholder="할인율 (%)"
            value={newDiscount.rate * 100}
            onChange={(e) => setNewDiscount({ ...newDiscount, rate: parseInt(e.target.value) / 100 })}
            className="w-1/3 p-2 border rounded"
          />
          <button
            onClick={() => handleAddDiscount()}
            className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            할인 추가
          </button>
        </div>
      </div>
      <button
        onClick={handleEditComplete}
        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
      >
        수정 완료
      </button>
    </div>
  );
};
