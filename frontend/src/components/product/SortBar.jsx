export default function SortBar({
  sortBy,
  onSortChange,
  sortMode, // all | popular | rating
  onSortModeChange, // function(mode)
  resultCount,
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      {/* Bên trái: thông tin số kết quả */}
      <p className="text-sm text-white/80">
        Tìm thấy <span className="font-semibold">{resultCount}</span> sản phẩm
      </p>

      {/* Bên phải: các nút sort theo API + sort theo giá */}
      <div className="flex items-center gap-3">
        {/* 🔵 Nút Phổ biến / Đánh giá / Tất cả → điều khiển sortMode */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onSortModeChange?.("popular")}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium border transition ${
              sortMode === "popular"
                ? "bg-white/80 text-slate-900 border-white"
                : "bg-white/10 text-white/80 border-white/20 hover:bg-white/20"
            }`}
          >
            Phổ biến
          </button>

          <button
            type="button"
            onClick={() => onSortModeChange?.("rating")}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium border transition ${
              sortMode === "rating"
                ? "bg-white/80 text-slate-900 border-white"
                : "bg-white/10 text-white/80 border-white/20 hover:bg-white/20"
            }`}
          >
            Đánh giá
          </button>

          <button
            type="button"
            onClick={() => onSortModeChange?.("all")}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium border transition ${
              sortMode === "all"
                ? "bg-white/80 text-slate-900 border-white"
                : "bg-white/10 text-white/80 border-white/20 hover:bg-white/20"
            }`}
          >
            Tất cả
          </button>
        </div>

        {/* 🟣 Sort theo giá (FE) như cũ */}
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-white/10 border border-white/20 text-xs text-white/90 px-3 py-1.5 rounded-lg focus:outline-none"
        >
          <option value="default" className="text-black">
            Mặc định
          </option>
          <option value="price-asc" className="text-black">
            Giá tăng dần
          </option>
          <option value="price-desc" className="text-black">
            Giá giảm dần
          </option>
        </select>
      </div>
    </div>
  );
}
