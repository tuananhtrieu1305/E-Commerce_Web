import React, { useState } from 'react';
import { useCart } from '../../context/CartContext.jsx';
import { Empty, Button, Spin } from 'antd/lib/index.js';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const {
    items,
    loading,
    error,
    setItemQuantity,
    removeItem,
    formatCurrency,
    cartCount,
    subtotal,
  } = useCart();

  const [selectedItems, setSelectedItems] = useState(items.map(i => i.id));
  const isSelected = (id) => selectedItems.includes(id);
  const toggleItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };
  const toggleAll = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items.map((i) => i.id));
    }
  };

  const handleQuantityChange = (item, newQty) => {
    let quantity = parseInt(newQty, 10);
    if (isNaN(quantity)) quantity = 1;
    if (quantity < 1) quantity = 1;
    if (quantity > 99) {
      quantity = 99;
      message.warning('Số lượng tối đa là 99');
    }
    if (quantity !== item.quantity) {
      setItemQuantity(item.productId, quantity);
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <Empty description="Giỏ hàng của bạn đang rỗng" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Giỏ hàng của bạn</h1>

      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={selectedItems.length === items.length}
            onChange={toggleAll}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2 text-gray-700">
            Tất cả ({selectedItems.length}/{items.length} sản phẩm)
          </span>
        </label>
      </div>

      <div className="lg:flex lg:space-x-8">
        <div className="lg:w-2/3">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="p-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
                >
                  <input
                    type="checkbox"
                    checked={isSelected(item.id)}
                    onChange={() => toggleItem(item.id)}
                    className="h-5 w-5 text-blue-600 mt-2 mr-2"
                  />
                  <div className="flex-shrink-0">
                    <img
                      className="h-24 w-24 rounded-md object-cover"
                      src={item.image ? item.image : "https://placehold.co/100x100/e2e8f0/cbd5e0?text=No+Image"}
                      alt={`Ảnh sản phẩm ${item.productId}`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.productTitle} (ID: {item.productId})
                    </h3>
                    <p className="text-sm text-gray-500">
                      Đơn giá: {formatCurrency(item.unitPrice)}
                    </p>
                    <Button
                      type="link"
                      danger
                      size="small"
                      onClick={() => removeItem(item.productId)}
                      className="p-0 mt-1"
                    >
                      Xóa
                    </Button>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button
                        onClick={() => handleQuantityChange(item, item.quantity - 1)}
                        disabled={item.quantity <= 1 || loading}
                        className="px-3 py-1 text-lg text-gray-600 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        max="99"
                        onChange={(e) => handleQuantityChange(item, e.target.value)}
                        disabled={loading}
                        className="w-12 text-center border-l border-r border-gray-300"
                      />
                      <button
                        onClick={() => handleQuantityChange(item, item.quantity + 1)}
                        disabled={item.quantity >= 99 || loading}
                        className="px-3 py-1 text-lg text-gray-600 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-base font-semibold text-gray-800 mt-2">
                      {formatCurrency(item.lineTotal)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:w-1/3 mt-8 lg:mt-0">
          <div className="bg-white shadow-md rounded-lg p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Tổng cộng</h2>
            <div className="flex justify-between mb-2">
              <span>Tổng ({selectedItems.length} sản phẩm):</span>
              <span className="text-lg font-semibold text-gray-800">
                {formatCurrency(
                  items.filter((i) => isSelected(i.id)).reduce((acc, i) => acc + i.lineTotal, 0)
                )}
              </span>
            </div>

           <Link to={`/checkout?selected=${items
              .filter(i => selectedItems.includes(i.id)) // 1. Lọc ra item được chọn
              .map(i => i.productId)                     // 2. Lấy Product ID của nó
              .join(',')}`}>
              <Button
                type="primary"
                size="large"
                block
                disabled={selectedItems.length === 0 || loading}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Tiến hành Thanh toán
              </Button>
            </Link>

            {loading && (
              <div className="text-center mt-4 text-gray-500">
                <Spin size="small" /> Đang cập nhật...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
