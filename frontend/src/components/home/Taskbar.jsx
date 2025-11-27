import { useNavigate } from "react-router-dom";

export function Taskbar({ items }) {
  const navigate = useNavigate();
  const handleClickCategory = (item) => {
    navigate(`/products?category=${encodeURIComponent(item.code)}`);
  };
  return (
    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-5xl">
      <div className="bg-white/15 backdrop-blur-lg rounded-3xl border border-white/30 px-6 py-5 w-full">
        <div className="grid grid-cols-10 gap-4">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClickCategory(item)}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div className="relative bg-white/10 p-4 rounded-xl mb-2 transition duration-300 overflow-hidden flex items-center justify-center w-12 h-12 border border-white/20">
                <div className="absolute inset-0 bg-white/30 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300 rounded-xl"></div>
                <item.icon
                  size={24}
                  className="text-white group-hover:text-white transition relative z-10 duration-300"
                />
              </div>
              <p className="text-xs font-medium text-white/80 text-center group-hover:text-white transition">
                {item.label}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
