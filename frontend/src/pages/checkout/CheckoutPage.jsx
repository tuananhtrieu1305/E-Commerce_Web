import React from "react";
import { useCheckout } from "../../context/CheckoutContext.jsx";
import { Input, Button, Spin, Empty, message } from "antd";
import { Link } from "react-router-dom";

export default function CheckoutPage() {
  const {
    items,
    loading,
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
    handleSubmitOrder,
  } = useCheckout();

  const handleCheckout = async () => {
  try {
    await handleSubmitOrder();
    message.success("Đặt hàng thành công!");
    // TODO: chuyển hướng hoặc reset giỏ hàng
  } catch (err) {
    // ✅ lấy message backend trả về (nếu có)
    const msg =
      err?.response?.data?.message || err.message || "Lỗi khi đặt hàng";
    message.error(msg);
  }
};
  if (loading) {
    return (
      <div className="text-center py-10">
        <Spin /> <p>Đang tải giỏ hàng...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <Empty description="Không có sản phẩm nào để thanh toán" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Thanh toán</h1>

      {/* DANH SÁCH SẢN PHẨM */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Sản phẩm</h2>
        <ul className="divide-y divide-gray-200">
          {items.map((item) => (
            <li key={item.id} className="py-2 flex justify-between">
              <div>
                {item.productTitle} x {item.quantity}
              </div>
              <div>{item.unitPrice.toLocaleString()}₫</div>
            </li>
          ))}
        </ul>
        <div className="text-right font-bold mt-2">
          Tổng cộng: {totalCost.toLocaleString()}₫
        </div>
      </div>

      {/* FORM THÔNG TIN */}
      <div className="bg-white rounded-lg shadow p-4 space-y-4">
        <Input
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Họ tên người nhận"
        />
        <Input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Số điện thoại"
        />
        <Input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Địa chỉ nhận hàng"
        />
        <Input.TextArea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Ghi chú (nếu có)"
          rows={3}
        />
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="COD">Thanh toán khi nhận hàng (COD)</option>
          <option value="BANK">Chuyển khoản ngân hàng</option>
        </select>
      </div>

      {/* NÚT ĐẶT HÀNG */}
      <div className="text-right">
        <Button
          type="primary"
          size="large"
          onClick={handleCheckout}
          loading={loading}
          className="bg-blue-600"
        >
          Đặt hàng
        </Button>
      </div>

      <div className="text-left">
        <Link to="/cart" className="text-blue-500 hover:underline">
          ← Quay lại giỏ hàng
        </Link>
      </div>
    </div>
  );
}
