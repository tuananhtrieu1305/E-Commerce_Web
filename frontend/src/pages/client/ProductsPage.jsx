import React, { useState, useEffect } from "react";
import { Header } from "../../components/home/Header";
import FilterSidebar from "../../components/product/FilterSidebar";
import SortBar from "../../components/product/SortBar";
import ProductCard from "../../components/home/ProductCard";
import { useNavigate } from "react-router-dom";
import { getProduct } from "../../services/ProductAPI"; // ⬅ dùng lại hàm bạn gửi

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [sortBy, setSortBy] = useState("default");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 🔵 Build query string để truyền vào getProduct()
  const buildQuery = () => {
    const params = {};

    if (selectedCategory) params.category_name = selectedCategory;
    if (searchQuery) params.title = searchQuery;
    if (priceRange.min > 0) params.minPrice = priceRange.min;
    if (priceRange.max !== Infinity) params.maxPrice = priceRange.max;

    const queryString = new URLSearchParams(params).toString();

    return queryString ? `?${queryString}` : "";
  };

  // 🔵 Fetch bằng chính hàm của bạn
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const query = buildQuery(); // build ?key=value
      const res = await getProduct(query); // dùng API bạn gửi'
      const data = res.data || [];
      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔵 Fetch mỗi khi filter thay đổi
  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchQuery, priceRange]);

  // 🔵 Sort FE
  useEffect(() => {
    let result = [...products];

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [sortBy, products]);

  const categories = [...new Set(products.map((p) => p.category?.cate_name))];

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setPriceRange({ min: 0, max: Infinity });
    setSortBy("default");
  };

  const handleProductClick = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#112D60] via-[#2F446A] to-[#B6C0C5]">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <div className="max-w-7xl mx-auto px-6 pt-28 pb-10">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <FilterSidebar
              categories={categories.filter(Boolean)}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              onResetFilters={handleResetFilters}
            />
          </div>

          {/* Products */}
          <div className="col-span-12 lg:col-span-9">
            <div className="mb-5">
              <SortBar
                sortBy={sortBy}
                onSortChange={setSortBy}
                resultCount={filteredProducts.length}
              />
            </div>

            {loading ? (
              <div className="text-center py-20 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
                <p className="mt-4 text-white">Đang tải sản phẩm...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center bg-white/10 backdrop-blur-md p-10 rounded-xl border border-white/20">
                <p className="text-white mb-4">Không có sản phẩm nào</p>
                <button
                  onClick={handleResetFilters}
                  className="text-white bg-white/20 px-6 py-2 rounded-md"
                >
                  Xóa bộ lọc
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    productInfo={product.productInfo}
                    price={product.price}
                    stock={product.stock}
                    categoryName={product.category?.cate_name}
                    sellerName={product.seller?.seller_name}
                    imageUrl={
                      product.imagePaths?.[0]?.image_path
                        ? `http://localhost:8081${product.imagePaths[0].image_path}`
                        : null
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
