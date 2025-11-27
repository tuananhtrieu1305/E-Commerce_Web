import React, { useEffect, useState } from 'react';
import { Table, Tag, Typography, Button, message, Card, Tooltip } from 'antd';
import { EyeOutlined, CreditCardOutlined, HistoryOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { getUserId } from '../../utils/auth';
import { getOrderHistory ,createVnpayPayment } from '../../services/OrderAPI';
const { Title, Text } = Typography;

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const userId = localStorage.getItem("account_id")

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await getOrderHistory(userId);
        setOrders(res);
      } catch (error) {
        message.error("Lỗi không tải được lịch sử đơn hàng");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [userId]);

  const handleRepay = async (orderId) => {
    try {
      message.loading({ content: "Đang chuyển hướng...", key: "pay_loading" });
      const res = await createVnpayPayment(orderId);
      const paymentUrl = res.paymentUrl || res.data?.paymentUrl;

      if (paymentUrl) {
         window.location.href = paymentUrl;
      } else {
         message.error({ content: "Không lấy được link thanh toán", key: "pay_loading" });
      }

    } catch (error) {
      console.error(error);
      message.error({ content: "Lỗi tạo link thanh toán", key: "pay_loading" });
    }
  };

  const columns = [
    {
      title: 'Mã Đơn',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      align: 'center',
      render: (text) => <Text strong>#{text}</Text>,
    },
    {
      title: 'Sản phẩm',
      key: 'products',
      render: (_, record) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {record.order_items?.map((item, index) => (
            <div key={index} style={{ fontSize: '14px' }}>
              • <span style={{ fontWeight: 500 }}>{item.product_name}</span> 
              <span style={{ color: '#888', marginLeft: 8 }}>x{item.item_quantity}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 160,
      align: 'center',
      render: (date) => date ? new Date(date).toLocaleString('vi-VN', {
        day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute:'2-digit'
      }) : '',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total_cost', 
      key: 'total_cost',
      width: 150,
      align: 'right', 
      render: (val) => (
        <span style={{ color: '#d4380d', fontWeight: 'bold', fontSize: '15px' }}>
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val)}
        </span>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'payment_status',
      key: 'payment_status',
      width: 160,
      align: 'center',
      render: (status) => {
        let color = status === 'PAID' ? 'success' : status === 'FAILED' ? 'error' : 'warning';
        let text = status === 'PAID' ? 'Đã thanh toán' : status === 'FAILED' ? 'Thất bại' : 'Chờ thanh toán';
        return <Tag color={color} style={{ minWidth: 100, textAlign: 'center' }}>{text}</Tag>;
      }
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 140,
      align: 'center',
      render: (_, record) => {
        if (record.payment_status === 'PAID') {
          return (
            <Link to={`/order-detail/${record.id}`}>
               <Tooltip title="Xem chi tiết đơn hàng">
                  <Button icon={<EyeOutlined />}>Chi tiết</Button>
               </Tooltip>
            </Link>
          );
        }
        return (
          <Button 
            type="primary" 
            danger 
            icon={<CreditCardOutlined />} 
            onClick={() => handleRepay(record.id)}
          >
            Thanh toán
          </Button>
        );
      },
    },
  ];

  return (
    <div style={{ padding: '40px', background: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
            <HistoryOutlined style={{ fontSize: 28, marginRight: 10, color: '#1890ff' }} />
            <Title level={2} style={{ marginBottom: 0 }}>Lịch sử đơn hàng</Title>
        </div>

        <Card bordered={false} style={{ borderRadius: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <Table 
            rowKey="id"
            columns={columns} 
            dataSource={orders} 
            loading={loading}
            
            pagination={{ 
              pageSize: 10,           
              showSizeChanger: false, 
              position: ['bottomCenter'], 
              showTotal: (total) => `Tổng ${total} đơn hàng` 
            }}
          />
        </Card>
      </div>
    </div>
  );
}