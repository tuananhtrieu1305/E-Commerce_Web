import React from 'react';
import { useCart } from '../../context/CartContext.jsx';
import { Empty,Button,Spin } from 'antd/lib/index.js';

// Component Spinner đơn giản
 const Spinner = () => (
    <div className="p-6 text-center">
        <div className="spinner w-8 h-8 rounded-full border-4 border-gray-200 border-t-blue-500 mx-auto animate-spin"></div>
        <p className="text-gray-600 mt-2">Đang cập nhật...</p>
    </div>
);

export default function CartPage() {
   
    // Lấy mọi thứ từ Context
    const { items, loading, error,setItemQuantity, removeItem, formatCurrency,cartCount,subtotal } = useCart();

    // Tính tổng tiền
    const totalPrice = items.reduce((total, item)  => {
        // DTO của bạn có lineTotal
        return total + (item.lineTotal || (item.unitPrice * item.quantity));
    }, 0);

    const handleQuantityChange = (item, newQty) => {
    let quantity = parseInt(newQty, 10);
    // Ràng buộc
    if (isNaN(quantity)) quantity = 1;
    if (quantity < 1) quantity = 1;
    if (quantity > 99) {
      quantity = 99;
      message.warning("Số lượng tối đa là 99");
    }
    // Gọi context
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
      <div className="lg:flex lg:space-x-8">
        {/* DANH SÁCH SẢN PHẨM (BÊN TRÁI) */}
        <div className="lg:w-2/3">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="p-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
                >
                  <div className="flex-shrink-0">
                    <img
                      className="h-24 w-24 rounded-md object-cover"
                      src={`https://placehold.co/100x100/e2e8f0/cbd5e0?text=Ảnh+SP`}
                      alt={`Ảnh sản phẩm ${item.productId}`}
                      onError={(e) => {
                        e.target.src =
                          "https://placehold.co/100x100/e2e8f0/cbd5e0?text=Ảnh+Lỗi";
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Tên sản phẩm : {item.productTitle} (ID: {item.productId})
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
                        onClick={() =>
                          handleQuantityChange(item, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1 || loading}
                        className="px-3 py-1 text-lg font-medium text-gray-600 hover:bg-gray-100 rounded-l-md disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        max="99"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item, e.target.value)
                        }
                        disabled={loading}
                        className="w-12 text-center border-l border-r border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
                        onWheel={(e) => e.currentTarget.blur()}
                      />
                      <button
                        onClick={() =>
                          handleQuantityChange(item, item.quantity + 1)
                        }
                        disabled={item.quantity >= 99 || loading}
                        className="px-3 py-1 text-lg font-medium text-gray-600 hover:bg-gray-100 rounded-r-md disabled:opacity-50 disabled:cursor-not-allowed"
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

        {/* TÓM TẮT ĐƠN HÀNG (BÊN PHẢI) */}
        <div className="lg:w-1/3 mt-8 lg:mt-0">
          <div className="bg-white shadow-md rounded-lg p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Tổng cộng</h2>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">
                Tổng ({cartCount} sản phẩm):
              </span>
              <span className="text-lg font-semibold text-gray-800">
                {formatCurrency(subtotal)}
              </span>
            </div>
            <div className="flex justify-between items-center mb-4 border-b pb-4">
              {/* <span className="text-gray-600">Giảm giá:</span> */}
              {/* <span className="text-lg font-semibold text-gray-800">
                {formatCurrency(0)}
              </span> */}
            </div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-bold text-gray-800">
                Thành tiền:
              </span>
              <span className="text-2xl font-bold text-red-600">
                {formatCurrency(subtotal)}
              </span>
            </div>
            <Button
              type="primary"
              size="large"
              block
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold"
              disabled={loading}
            >
              Tiến hành Thanh toán
            </Button>
            {loading && (
              <div className="text-center mt-4 text-gray-500">
                <Spin size="small" /> Đang cập nhật...
              </div>
            )}
          </div>
        </div>
      </div>
    );
  
  // Trả về JSX chính của trang
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Giỏ hàng của bạn
      </h1>
      {renderCartContent()}
    </div>
  );
};
