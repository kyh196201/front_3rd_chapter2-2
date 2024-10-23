import { useState } from 'react';
import { ProductData } from '../../services/product';

interface Props {
  onAddProduct: (data: ProductData) => void;
}

export const AddProductForm = ({ onAddProduct }: Props) => {
  const [productForm, setProductForm] = useState<ProductData>({
    name: '',
    price: 0,
    stock: 0,
    discounts: [],
  });

  const handleClickAddButton = () => {
    onAddProduct(productForm);
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductForm({ ...productForm, name: e.target.value });
  };

  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductForm({ ...productForm, price: parseInt(e.target.value) });
  };

  const handleChangeStock = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductForm({ ...productForm, stock: parseInt(e.target.value) });
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="text-xl font-semibold mb-2">새 상품 추가</h3>

      <div className="mb-2">
        <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
          상품명
        </label>
        <input
          id="productName"
          type="text"
          value={productForm.name}
          onChange={handleChangeName}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-2">
        <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">
          가격
        </label>
        <input
          id="productPrice"
          type="number"
          value={productForm.price}
          onChange={handleChangePrice}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-2">
        <label htmlFor="productStock" className="block text-sm font-medium text-gray-700">
          재고
        </label>
        <input
          id="productStock"
          type="number"
          value={productForm.stock}
          onChange={handleChangeStock}
          className="w-full p-2 border rounded"
        />
      </div>

      <button onClick={handleClickAddButton} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        추가
      </button>
    </div>
  );
};
