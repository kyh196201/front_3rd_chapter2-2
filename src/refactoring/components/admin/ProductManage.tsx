import { useState } from 'react';
import { Product } from '../../../types';
import { Accordion } from '../ui/Accordion';
import { useAccordions } from '../../hooks/useAccordions';
import { AddProductForm } from './AddProductForm';
import { createProduct, ProductData } from '../../services/product';
import { EditProductForm } from './EditProductForm';
import { useToggle } from '../../hooks/useToggle';

interface Props {
  products: Product[];
  onProductUpdate: (updatedProduct: Product) => void;
  onProductAdd: (newProduct: Product) => void;
}

export const ProductManage = ({ products, onProductUpdate, onProductAdd }: Props) => {
  const { isOpen: isAccordionOpen, toggle: toggleAccordion } = useAccordions<Product['id']>();
  const [showNewProductForm, toggleNewProductForm] = useToggle(false);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // handleEditProduct 함수 수정
  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
  };

  // 수정 완료 핸들러 함수 추가
  const handleEditComplete = (updatedProduct: Product) => {
    onProductUpdate(updatedProduct);
    setEditingProduct(null);
  };

  const handleAddDiscount = (updatedProduct: Product) => {
    if (updatedProduct && editingProduct) {
      // Entity
      onProductUpdate(updatedProduct);

      // View
      setEditingProduct(updatedProduct);
    }
  };

  const handleRemoveDiscount = (updatedProduct: Product) => {
    if (updatedProduct && editingProduct) {
      onProductUpdate(updatedProduct);
      setEditingProduct(updatedProduct);
    }
  };

  const handleAddNewProduct = (data: ProductData) => {
    const newProduct = createProduct(data);
    onProductAdd(newProduct);
    toggleNewProductForm();
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
      <button
        onClick={toggleNewProductForm}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
      >
        {showNewProductForm ? '취소' : '새 상품 추가'}
      </button>

      {/* 새 상품 추가 폼 */}
      {showNewProductForm && <AddProductForm onAddProduct={handleAddNewProduct} />}

      <div className="space-y-2">
        {products.map((product, index) => (
          <Accordion
            testId={`product-${index + 1}`}
            key={product.id}
            title={`${product.name} - ${product.price}원 (재고: ${product.stock})`}
            isOpen={isAccordionOpen(product.id)}
            onToggle={() => toggleAccordion(product.id)}
          >
            {editingProduct && editingProduct.id === product.id ? (
              <EditProductForm
                initialProduct={editingProduct}
                onAddDiscount={handleAddDiscount}
                onRemoveDiscount={handleRemoveDiscount}
                onEditComplete={handleEditComplete}
              />
            ) : (
              <div>
                {product.discounts.map((discount, index) => (
                  <div key={index} className="mb-2">
                    <span>
                      {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
                    </span>
                  </div>
                ))}
                <button
                  data-testid="modify-button"
                  onClick={() => handleEditProduct(product)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-2"
                >
                  수정
                </button>
              </div>
            )}
          </Accordion>
        ))}
      </div>
    </div>
  );
};
