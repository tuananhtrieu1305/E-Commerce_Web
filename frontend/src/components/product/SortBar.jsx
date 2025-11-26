// Sort Bar Component
export default function SortBar({ sortBy, onSortChange, resultCount }) {
  const sortOptions = [
    { value: "default", label: "Liên quan" },
    { value: "popular", label: "Phổ biến" },
    { value: "rating-desc", label: "Đánh giá" },
    { value: "price-asc", label: "Giá tăng" },
    { value: "price-desc", label: "Giá giảm" },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm text-white/80 font-medium">Sắp xếp:</span>
          <div className="flex flex-wrap gap-2">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onSortChange(option.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  sortBy === option.value
                    ? "bg-white/30 text-white border border-white/40 shadow-lg"
                    : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        <div className="text-sm text-white/80">
          <span className="font-bold text-white">{resultCount}</span> sản phẩm
        </div>
      </div>
    </div>
  );
}
