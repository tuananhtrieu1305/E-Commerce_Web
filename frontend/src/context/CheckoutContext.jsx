import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getCart } from "../services/cartService";
import { createOrder } from "../services/orderService";
import { getUserId } from '../utils/auth';

const CheckoutContext = createContext(null);

export const CheckoutProvider = ({ children }) => {
  const userId = getUserId() || 1;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const cartItems = await getCart(userId);
      setItems(cartItems || []);
    } catch (err) {
      setError(err.message);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const totalCost = items.reduce(
    (sum, item) => sum + parseFloat(item.lineTotal || 0),
    0
  );

  const handleSubmitOrder = async (itemsToOrder, finalTotalCost) => {
    const payload = {
      customer_id: userId,
      customer_name: customerName,
      phone,
      address,
      note,
      total_cost: finalTotalCost,
      payment_method: paymentMethod,
      order_items: itemsToOrder.map((item) => ({
        prod_id: item.productId,
        quantity: item.quantity,
      })),
    };

    const savedOrder = await createOrder(payload);
    return savedOrder;
  };

  const value = {
    items,
    loading,
    error,
    customerName,
    setCustomerName,
    phone,
    setPhone,
    address,
    setAddress,
    note,
    setNote,
    paymentMethod,
    setPaymentMethod,
    totalCost,
    fetchCart,
    handleSubmitOrder,
  };

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) throw new Error("useCheckout must be used within CheckoutProvider");
  return context;
};
