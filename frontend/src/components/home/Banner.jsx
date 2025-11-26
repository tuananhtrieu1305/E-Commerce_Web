import { ChevronLeft, ChevronRight } from "lucide-react";

// ========== COMPONENTS ==========
export function Banner({
  banner,
  currentIndex,
  totalBanners,
  onPrev,
  onNext,
  onIndicatorClick,
}) {
  return (
    <div className="relative z-10 max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
      <div className="flex-1 pt-32">
        <h1 className="text-6xl font-bold text-white mb-4">{banner.title}</h1>
        <p className="text-white/70 mb-8 text-lg max-w-xl">{banner.subtitle}</p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition">
          Discover more
        </button>
      </div>

      <div className="text-9xl opacity-20">🎧</div>

      {/* Banner Controls */}
      <button
        onClick={onPrev}
        className="absolute left-1 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur hover:bg-white/30 rounded-full p-3 transition z-20 border border-white/20"
      >
        <ChevronLeft size={28} className="text-white" />
      </button>
      <button
        onClick={onNext}
        className="absolute right-1 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur hover:bg-white/30 rounded-full p-3 transition z-20 border border-white/20"
      >
        <ChevronRight size={28} className="text-white" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {Array.from({ length: totalBanners }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => onIndicatorClick(idx)}
            className={`h-2 rounded-full transition ${
              idx === currentIndex ? "bg-white w-8" : "bg-white/40 w-2"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
