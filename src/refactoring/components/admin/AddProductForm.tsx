import { ProductData } from '../../services/product';
import { useForm } from '../../hooks/useForm';

interface Props {
  onAddProduct: (data: ProductData) => void;
}

export const AddProductForm = ({ onAddProduct }: Props) => {
  const {
    handleChange,
    handleSubmit,
    resetForm,
    formValues: productForm,
  } = useForm<ProductData>({
    initialValues: {
      name: '',
      price: 0,
      stock: 0,
      discounts: [],
    },

    onSubmit(values) {
      onAddProduct(values);
    },
  });

  return (
    <form className="bg-white p-4 rounded shadow mb-4" onSubmit={handleSubmit}>
      <h3 className="text-xl font-semibold mb-2">새 상품 추가</h3>

      <div className="mb-2">
        <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
          상품명
        </label>
        <input
          id="productName"
          type="text"
          name="name"
          value={productForm.name}
          onChange={handleChange}
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
          name="price"
          value={productForm.price}
          onChange={handleChange}
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
          name="stock"
          value={productForm.stock}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        추가
      </button>
      <button
        type="button"
        onClick={() => resetForm()}
        className="mt-1 w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
      >
        초기화
      </button>
    </form>
  );
};
