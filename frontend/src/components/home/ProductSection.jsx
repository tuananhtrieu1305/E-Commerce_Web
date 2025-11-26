// src/components/home/SpecialOfferSection.jsx
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import ProductCard from "./ProductCard";

export function ProductSection({
  title = "Special offers",
  apiUrl, // URL API để fetch product (có thể khác nhau mỗi nơi)
  viewAllHref = "#", // link "View all"
  limit, // số lượng tối đa muốn hiển thị (optional)
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        let data = [];

        if (apiUrl) {
          const res = await fetch(apiUrl);
          if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
          const json = await res.json();

          // handle các kiểu response: [..], {data:[..]}, {content:[..]}
          if (Array.isArray(json)) {
            data = json;
          } else if (Array.isArray(json.data)) {
            data = json.data;
          } else if (Array.isArray(json.content)) {
            data = json.content;
          } else {
            console.warn("Không tìm thấy mảng product trong response", json);
            data = [];
          }
        }

        if (limit && limit > 0) {
          data = data.slice(0, limit);
        }

        setProducts(data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [apiUrl, limit]);

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
        <p className="text-center text-slate-500">Đang tải sản phẩm...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-center text-red-600">Lỗi: {error}</p>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
        </div>
        <p className="text-sm text-slate-500">Chưa có sản phẩm nào.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
        <a
          href={viewAllHref}
          className="text-blue-600 font-medium hover:underline flex items-center gap-1"
        >
          View all <ChevronRight size={18} />
        </a>
      </div>

      {/* Slider giống CategoriesSection (trượt ngang + mũi tên) */}
      <div className="relative">
        {/* Nút trái */}
        <button
          type="button"
          onClick={scrollLeft}
          className="hidden md:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white shadow-md border border-slate-200 hover:bg-slate-50 z-10"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Vùng trượt */}
        <div ref={scrollRef} className="overflow-x-auto no-scrollbar">
          <div className="flex gap-4 min-w-max">
            {products.map((product) => (
              <div key={product.id} className="flex-none w-64">
                <ProductCard
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  originalPrice={
                    product.originalPrice || product.price * 1.1 || 0
                  }
                  rating={product.rating || 0}
                  reviewCount={product.reviewCount || 0}
                  category={product.category?.cate_name || "Khác"}
                  productInfo={product.productInfo}
                  imagePath={product.imagePaths}
                />
              </div>
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
