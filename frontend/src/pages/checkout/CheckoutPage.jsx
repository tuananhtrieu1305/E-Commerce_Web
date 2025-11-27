import React, { useState, useMemo } from "react";
import { useCheckout } from "../../context/CheckoutContext.jsx";
import {
  Input,
  Button,
  Spin,
  Empty,
  message,
  Card,
  Radio,
  Divider,
  Space,
  Typography
} from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createVnpayPayment } from "../../services/OrderAPI.js"; 
import { EnvironmentOutlined, PhoneOutlined, FileTextOutlined, ArrowLeftOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export default function CheckoutPage() {
  const {
    items,
    loading,
    phone,
    setPhone,
    address,
    setAddress,
    note,
    setNote,
    paymentMethod,
    setPaymentMethod,
    handleSubmitOrder,
  } = useCheckout();

  const [isProcessing, setIsProcessing] = useState(false);
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const selectedIds = query.get("selected")
    ? query.get("selected").split(",").map((id) => Number(id))
    : [];

  const selectedItems = useMemo(() => {
    return items.filter((item) => selectedIds.includes(item.productId));
  }, [items, selectedIds]);

  const totalCost = selectedItems.reduce(
    (sum, item) => sum + (item.unitPrice || 0) * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (!address || !phone) {
      message.error("Vui lòng nhập đầy đủ địa chỉ và số điện thoại!");
      return;
    }

    setIsProcessing(true);
    try {
      const savedOrder = await handleSubmitOrder(
        selectedItems,
        totalCost,
        paymentMethod
      );
      // console.log("LOG KIỂM TRA savedOrder:", savedOrder);

      if (savedOrder?.status === 400) {
        throw new Error(savedOrder.message);
      }

      if (paymentMethod === "COD") {
        message.success("Đặt hàng thành công!");
        setIsProcessing(false);
        return;
      }

      if (paymentMethod === "BANK") {
        const response = await createVnpayPayment(savedOrder.id);
        if (response?.paymentUrl) {
          window.location.href = response.paymentUrl;
        } else {
          throw new Error("Không thể lấy URL thanh toán VNPay.");
        }
      }

    } catch (err) {
      console.error("ERR:", err);
      message.error(err.message || "Có lỗi xảy ra khi đặt hàng");
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Spin size="large" tip="Đang tải thông tin..." />
      </div>
    );
  }

  if (selectedItems.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Empty 
          description="Không có sản phẩm nào để thanh toán" 
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        >
          <Link to="/cart">
            <Button type="primary">Quay lại giỏ hàng</Button>
          </Link>
        </Empty>
      </div>
    );
  }

  // --- UI CHÍNH ---
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-6 flex items-center">
          <Link to="/cart" className="mr-4 text-gray-500 hover:text-blue-600 transition-colors">
            <ArrowLeftOutlined style={{ fontSize: '20px' }} />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 m-0">Thanh toán</h1>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
          
          <div className="lg:col-span-7 space-y-6">
            <Card 
              title={<span className="text-lg font-semibold"><EnvironmentOutlined /> Thông tin giao hàng</span>} 
              className="shadow-sm rounded-lg"
            >
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại <span className="text-red-500">*</span></label>
                  <Input
                    size="large"
                    prefix={<PhoneOutlined className="text-gray-400" />}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Nhập số điện thoại liên hệ"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ nhận hàng <span className="text-red-500">*</span></label>
                  <Input.TextArea
                    size="large"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Số nhà, tên đường, phường/xã, quận/huyện..."
                    autoSize={{ minRows: 2, maxRows: 4 }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú đơn hàng</label>
                  <Input.TextArea
                    size="large"
                    prefix={<FileTextOutlined className="text-gray-400" />}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Ví dụ: Giao hàng giờ hành chính, gọi trước khi giao..."
                    rows={2}
                  />
                </div>
              </Space>
            </Card>

            <Card 
              title={<span className="text-lg font-semibold">Phương thức thanh toán</span>} 
              className="shadow-sm rounded-lg"
            >
              <Radio.Group 
                onChange={(e) => setPaymentMethod(e.target.value)} 
                value={paymentMethod} 
                className="w-full"
              >
                <Space direction="vertical" className="w-full">
                  <Radio value="COD" className="w-full border p-4 rounded-lg hover:border-blue-500 transition-all">
                    <div className="ml-2">
                      <div className="font-medium">Thanh toán khi nhận hàng (COD)</div>
                      <div className="text-gray-500 text-sm">Thanh toán tiền mặt khi shipper giao hàng đến.</div>
                    </div>
                  </Radio>
                  
                  <Radio value="BANK" className="w-full border p-4 rounded-lg hover:border-blue-500 transition-all">
                    <div className="ml-2">
                      <div className="font-medium">Thanh toán qua VNPAY</div>
                      <div className="text-gray-500 text-sm">Quét mã QR, thẻ ATM hoặc tài khoản ngân hàng.</div>
                    </div>
                  </Radio>
                </Space>
              </Radio.Group>
            </Card>
          </div>

          <div className="lg:col-span-5 mt-8 lg:mt-0">
            <Card className="shadow-lg rounded-lg sticky top-6 border-t-4 border-t-blue-600">
              <h2 className="text-xl font-bold mb-4">Đơn hàng của bạn</h2>
              
              <div className="flow-root">
                <ul className="-my-4 divide-y divide-gray-200">
                  {selectedItems.map((item) => (
                    <li key={item.productId} className="flex py-4">
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.image ? item.image : "https://placehold.co/100x100/e2e8f0/cbd5e0?text=No+Img"}
                          alt={item.productTitle}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3 className="line-clamp-2" title={item.productTitle}>
                              {item.productTitle}
                            </h3>
                            <p className="ml-4 whitespace-nowrap">
                              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.unitPrice * item.quantity)}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">Đơn giá: {new Intl.NumberFormat('vi-VN').format(item.unitPrice)}₫</p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-500">Số lượng: x{item.quantity}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <Divider />

              <div className="space-y-2">
                <div className="flex justify-between text-base text-gray-600">
                  <p>Tạm tính</p>
                  <p>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalCost)}</p>
                </div>
                <div className="flex justify-between text-base text-gray-600">
                  <p>Phí vận chuyển</p>
                  <p className="text-green-600 font-medium">Miễn phí</p>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-dashed">
                  <p>Tổng cộng</p>
                  <p className="text-blue-600">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalCost)}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  type="primary"
                  size="large"
                  block
                  onClick={handleCheckout}
                  loading={isProcessing}
                  className="h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700 shadow-md"
                >
                  {paymentMethod === 'BANK' ? 'Thanh toán ngay' : 'Đặt hàng'}
                </Button>
              </div>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}