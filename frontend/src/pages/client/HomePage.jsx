import React, { useState, useEffect } from "react";
import {
  Headphones,
  Monitor,
  Smartphone,
  Laptop,
  Gamepad2,
  Camera,
  Zap,
  TrendingUp,
} from "lucide-react";
import { Banner } from "../../components/home/Banner";
import { CategoriesSection } from "../../components/home/CategoriesSection";
import { FeaturesSection } from "../../components/home/FeaturesSection";
import { Footer } from "../../components/home/Footer";
import { Header } from "../../components/home/Header";
import { ProductSection } from "../../components/home/ProductSection";
import { Taskbar } from "../../components/home/Taskbar";
import { useNavigate } from "react-router-dom";
import { getProduct } from "../../services/ProductAPI";

export default function Home() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [categoryError, setCategoryError] = useState(null);

  const navigate = useNavigate();

  const banners = [
    {
      title: "Introducing the Next Generation of Sound",
      subtitle: "Experience immersive sound like before",
      color: "from-slate-700 via-slate-600 to-slate-800",
      bgPattern: "bg-gradient-to-br",
    },
    {
      title: "Laptop Performance Redefined",
      subtitle: "Powerful computing for professionals",
      color: "from-blue-700 via-slate-600 to-slate-800",
      bgPattern: "bg-gradient-to-br",
    },
    {
      title: "Innovation Meets Design",
      subtitle: "Latest tech gadgets awaits you",
      color: "from-purple-700 via-slate-600 to-slate-800",
      bgPattern: "bg-gradient-to-br",
    },
  ];

  const taskbarItems = [
    { icon: Monitor, label: "Computer" },
    { icon: Smartphone, label: "Smartphone" },
    { icon: Monitor, label: "Monitor" },
    { icon: Gamepad2, label: "Gaming" },
    { icon: Camera, label: "Camera" },
    { icon: Headphones, label: "Headphones" },
    { icon: Laptop, label: "Laptop" },
    { icon: Smartphone, label: "Smart Watch" },
    { icon: Zap, label: "Wearables" },
    { icon: TrendingUp, label: "Deals" },
  ];

  // Tự động đổi banner
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        setCategoryError(null);

        const res = await fetch("http://localhost:8081/api/category");

        if (!res.ok) {
          throw new Error(`Failed to fetch categories: ${res.status}`);
        }

        // Nếu BE trả mảng trực tiếp: [ { id, cateName }, ... ]
        const data = await res.json();

        // Nếu BE bọc { data: [...] } thì đổi thành:
        // const json = await res.json();
        // const data = json.data;
        console.log(data.data);
        setCategories(data.data || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setCategoryError("Không tải được danh mục");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);
  // Gợi ý sản phẩm theo text search (call BE)
  useEffect(() => {
    const fetchSuggestions = async () => {
      const trimmed = searchQuery.trim();
      if (!trimmed) {
        setSuggestions([]);
        return;
      }

      try {
        setIsSearching(true);
        // gọi /api/product?title=...
        const query = `?title=${encodeURIComponent(trimmed)}`;
        const res = await getProduct(query);
        const data = res.data?.data || res.data || [];

        // lấy tối đa 6 gợi ý
        setSuggestions(data.slice(0, 6));
      } catch (err) {
        console.error("Error fetching suggestions:", err);
      } finally {
        setIsSearching(false);
      }
    };

    fetchSuggestions();
  }, [searchQuery]);

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(price || 0);

  // Click 1 sản phẩm trong dropdown → sang trang chi tiết
  const handleSelectProduct = (id) => {
    if (!id) return;
    navigate(`/products/${id}`);
  };

  // Không chọn cụ thể → sang trang /products với search filter
  const handleSearchSubmit = () => {
    const trimmed = searchQuery.trim();
    if (!trimmed) {
      navigate("/products");
      return;
    }
    // Truyền query param, ProductsPage có thể đọc từ URL để set searchQuery ban đầu
    navigate(`/products?title=${encodeURIComponent(trimmed)}`);
  };

  // ... các import & state y như bạn đang có ở trên

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Banner Background */}
        <div
          className={`absolute inset-0 ${banners[currentBanner].bgPattern} ${banners[currentBanner].color}`}
        ></div>

        {/* Header */}
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        {/* 🟦 Dropdown gợi ý đã chỉnh UI */}
        {/* Dropdown gợi ý search */}
        {searchQuery.trim() && (
          <div className="absolute inset-x-0 top-24 z-30">
            {/* dùng cùng layout container với Header: max-w-7xl + mx-auto + px-6 */}
            <div className="max-w-7xl mx-auto px-6">
              <div className="w-full pointer-events-auto rounded-2xl bg-white/95 border border-white/70 shadow-[0_20px_60px_rgba(15,23,42,0.45)] backdrop-blur-2xl overflow-hidden">
                {/* Header nhỏ */}
                <div className="px-4 pt-3 pb-2 border-b border-slate-100 flex items-center justify-between">
                  <p className="text-xs text-slate-500">
                    Kết quả cho:{" "}
                    <span className="font-semibold text-slate-800">
                      “{searchQuery.trim()}”
                    </span>
                  </p>
                  {isSearching && (
                    <span className="text-xs text-slate-400">Đang tìm...</span>
                  )}
                </div>

                {/* Nội dung */}
                {suggestions.length === 0 && !isSearching ? (
                  <div className="px-4 py-4 text-xs text-slate-500">
                    Không tìm thấy sản phẩm nào phù hợp
                  </div>
                ) : (
                  <ul className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {suggestions.map((p) => (
                      <li key={p.id}>
                        <button
                          onClick={() => handleSelectProduct(p.id)}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition text-left"
                        >
                          {/* Avatar / icon nhỏ bên trái */}
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-xs font-semibold text-slate-500">
                            {p.category?.cate_name?.[0] || "P"}
                          </div>

                          {/* Thông tin sản phẩm */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-800 truncate">
                              {p.title}
                            </p>
                            <p className="text-xs text-slate-500 truncate">
                              {p.productInfo}
                            </p>
                          </div>

                          {/* Giá */}
                          <span className="text-xs font-semibold text-blue-600 whitespace-nowrap">
                            {formatPrice(p.price)}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Footer */}
                <div className="px-4 py-2 border-t border-slate-100 flex justify-end bg-slate-50/60">
                  <button
                    onClick={handleSearchSubmit}
                    className="text-xs text-blue-600 hover:text-blue-700 hover:underline font-medium"
                  >
                    Xem tất cả kết quả
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Taskbar */}
        <Taskbar items={taskbarItems} />

        {/* Banner Content */}
        <Banner
          banner={banners[currentBanner]}
          currentIndex={currentBanner}
          totalBanners={banners.length}
          onPrev={() =>
            setCurrentBanner(
              (prev) => (prev - 1 + banners.length) % banners.length
            )
          }
          onNext={() => setCurrentBanner((prev) => (prev + 1) % banners.length)}
          onIndicatorClick={(idx) => setCurrentBanner(idx)}
        />
      </div>

      {/* Features Section */}
      <FeaturesSection />

      {/* Special Offers */}
      <ProductSection
        title="popular products"
        apiUrl="http://localhost:8081/api/product/top-buyer"
      />

      {/* Categories */}
      <CategoriesSection
        categories={categories}
        loading={loadingCategories}
        error={categoryError}
      />
      <ProductSection
        title="best rate products"
        apiUrl="http://localhost:8081/api/product/top-rated"
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
