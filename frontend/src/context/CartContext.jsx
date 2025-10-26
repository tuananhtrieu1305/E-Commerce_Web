import React, { createContext, useContext, useState, useEffect, useCallback,useRef } from 'react';
import { getCart, apiRemoveItem,apiAddItem ,apiSetQty} from '../services/cartService';

// 1. Tạo Context
const CartContext = createContext(null);

// 2. Tạo Provider Component
export function CartProvider({ children }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const debounceTimerRef = useRef(null);

    // TODO: Lấy userId từ AuthContext của bạn
    // Tạm thời dùng ID mặc định từ service
    const userId = 1; 

    // Định dạng tiền tệ
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount || 0);
    };

    // Hàm tải giỏ hàng
    const fetchCart = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const cartItems = await getCart(userId);
            setItems(cartItems || []);
        } catch (err) {
            setError(err.message);
            setItems([]); // Xóa item nếu có lỗi
        } finally {
            setLoading(false);
        }
    }, [userId]); // Chỉ tạo lại hàm nếu userId thay đổi

    // Tải giỏ hàng lần đầu khi component được mount
    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    // Hàm thay đổi số lượng
    const setItemQuantity = useCallback(
    (productId, newQty) => {
      // 1. Hủy timer cũ nếu có
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // 2. Hiển thị loading
      setLoading(true);

      // 3. Cập nhật UI ngay lập tức (Optimistic Update)
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.productId === productId ? { ...item, quantity: newQty } : item
        )
      );

      // 4. Đặt timer mới (debounce)
      debounceTimerRef.current = setTimeout(async () => {
        try {
          // 5. Gọi API PUT
          const updatedCart = await apiSetQty(
            userId,
            productId,
            newQty
          );
          // 6. Cập nhật state với dữ liệu chuẩn từ server
          if (updatedCart && updatedCart.items) {
            setItems(updatedCart.items);
          } else {
            await fetchCart(); // Tải lại nếu API không trả về đúng
          }
        } catch (err) {
          message.error(err.message || "Lỗi cập nhật số lượng");
          // Nếu lỗi, tải lại giỏ hàng để khôi phục
          await fetchCart();
        } finally {
          setLoading(false);
          debounceTimerRef.current = null;
        }
      }, 250); // <-- Chờ 750ms
    },
    [userId, fetchCart] // Thêm fetchCart vào dependencies
  );

    // Hàm xóa item
    const removeItem = async (itemId) => {
        // Thêm xác nhận
        if (!confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
            return;
        }
        
        try {
            setLoading(true);
            setError(null);
            // API (DELETE) không trả về gì (void)
            await apiRemoveItem(userId, itemId);
            // Tải lại giỏ hàng sau khi xóa thành công
            await fetchCart();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // 3. Cung cấp state và các hàm cho component con
    const value = {
        items,
        setItems,
        loading,
        error,
        fetchCart,
        setItemQuantity,
        removeItem,
        formatCurrency,
        cartCount: items.reduce((total, item) => total + (item.quantity || 0), 0),
        subtotal: items.reduce((total, item) => total + parseFloat(item.lineTotal || 0), 0),
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

// 4. Tạo custom Hook (để dễ sử dụng)
export const useCart = () => {
    const context = useContext(CartContext);
    if (context === null) {
        throw new Error('useCart phải được dùng bên trong CartProvider');
    }
    return context;
};

