// src/components/home/CategoriesSection.jsx
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom"; // 👈 thêm
import ICON_MAP from "../../hooks/icon_map";

function getIcon(name) {
  return ICON_MAP[name] || "🛒"; // default icon nếu không khớp
}

export function CategoriesSection({ categories = [], loading, error }) {
  const scrollRef = useRef(null);
  const navigate = useNavigate(); // 👈 thêm

  const safeCategories = Array.isArray(categories) ? categories : [];

  // 👉 click 1 category → /products?category=<tên>
  const handleClickCategory = (cat) => {
    const name = cat.category_name || cat.cate_name || cat.cateName || "";
    if (!name) return;
    navigate(`/products?category=${encodeURIComponent(name)}`);
  };

  const scrollLeft = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">
            Shop by category
          </h2>
        </div>
        <div className="grid grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 h-28 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">
            Shop by category
          </h2>
        </div>
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Shop by category</h2>
        <button
          type="button"
          onClick={() => navigate("/products")} // 👈 View all → tất cả sản phẩm
          className="text-blue-600 font-medium hover:underline flex items-center gap-1"
        >
          View all <ChevronRight size={18} />
        </button>
      </div>

      {/* Carousel với 2 mũi tên */}
      <div className="relative">
        {/* Nút trái */}
        <button
          type="button"
          onClick={scrollLeft}
          className="hidden md:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white shadow-md border border-slate-200 hover:bg-slate-50 z-10"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Vùng scroll ngang */}
        <div ref={scrollRef} className="overflow-x-auto no-scrollbar">
          <div className="flex gap-4 min-w-max">
            {safeCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleClickCategory(cat)} // 👈 click 1 ô
                className="flex-none w-40 bg-white rounded-xl p-6 text-center cursor-pointer hover:shadow-lg hover:border-blue-200 transition group border border-transparent"
              >
                <div className="text-5xl mb-3 group-hover:scale-110 transition">
                  {getIcon(
                    cat.category_name || cat.cate_name || cat.cateName || ""
                  )}
                </div>
                <p className="font-medium text-slate-700 group-hover:text-blue-600">
                  {cat.category_name || cat.cate_name || cat.cateName}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Nút phải */}
        <button
          type="button"
          onClick={scrollRight}
          className="hidden md:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-9 h-9 rounded-full bg-white shadow-md border border-slate-200 hover:bg-slate-50 z-10"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
