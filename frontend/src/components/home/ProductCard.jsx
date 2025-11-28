import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({
  id,
  title = "Product Name",
  price = 0,
  productInfo = "",
  stock = 0,
  categoryName = "Danh mục",
  sellerName = "Người bán",
  imageUrl,
}) {
  const navigate = useNavigate();

  // Format giá VND
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Lấy icon dựa trên category
  const getCategoryIcon = (categoryName) => {
    const iconMap = {
      Furniture: "🛋️",
      Computer: "💻",
      Smartphone: "📱",
      Headphones: "🎧",
      Monitor: "🖥️",
      Laptop: "💻",
      Gaming: "🎮",
      Camera: "📷",
      "Smart Watch": "⌚",
      Speaker: "🔊",
      Audio: "🎧",
    };
    return iconMap[categoryName] || "📦";
  };

  // Chọn gradient màu ngẫu nhiên (nếu không có ảnh thật)
  const gradients = [
    "from-slate-400 to-slate-600",
    "from-blue-400 to-blue-600",
    "from-purple-400 to-purple-600",
    "from-pink-400 to-purple-600",
    "from-green-400 to-green-600",
  ];
  const bgGradient = gradients[Math.floor(Math.random() * gradients.length)];
  const icon = getCategoryIcon(categoryName);

  const handleClick = () => {
    if (!id) return;
    navigate(`/products/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition group cursor-pointer overflow-hidden h-[400px]"
    >
      {/* Product Image */}
      <div
        className={`bg-gradient-to-br ${bgGradient} h-[200px] flex items-center justify-center text-7xl overflow-hidden relative`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100/40 to-transparent backdrop-blur-sm" />
        {imageUrl ? (
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}${imageUrl}`}
            alt={title}
            className="relative w-full h-full object-cover"
          />
        ) : (
          <span className="relative">{icon}</span>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-slate-800 line-clamp-2 group-hover:text-blue-600 text-lg">
          {title}
        </h3>

        <p className="text-xs text-slate-500 line-clamp-2">{productInfo}</p>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-slate-900">
            {formatPrice(price)}
          </span>
        </div>

        {/* Seller + Category + Stock */}
        <div className="flex justify-between items-center text-xs text-slate-500">
          <span className="truncate max-w-[60%]">
            Người bán: <span className="font-medium">{sellerName}</span>
          </span>
          <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded">
            {categoryName}
          </span>
        </div>

        <div className="text-xs text-slate-400">
          Còn lại: <span className="font-medium text-slate-600">{stock}</span>{" "}
          sản phẩm
        </div>
      </div>
    </div>
  );
}
