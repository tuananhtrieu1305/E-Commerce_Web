import { Search, Heart, User, ShoppingCart, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Header({ searchQuery, onSearchChange }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token"); // 👈 kiểm tra đăng nhập

  return (
    <header className="absolute top-6 left-6 right-6 z-50">
      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/30 px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          <div
            className="text-2xl font-bold text-white whitespace-nowrap cursor-pointer"
            onClick={() => navigate("/")}
          >
            NEXTPICK
          </div>

          {/* Search box */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center bg-white/20 backdrop-blur-md rounded-lg px-4 py-2 border border-white/30">
              <Search size={20} className="text-white/60 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="bg-transparent ml-2 outline-none w-full text-white placeholder-white/60 text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange("")}
                  className="text-white/60 hover:text-white transition ml-2"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Right section */}
          <div className="flex gap-4 items-center text-white/80">
            {!token ? (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-1.5 rounded-lg bg-white/20 border border-white/30 text-white hover:bg-white/30 transition"
                >
                  Login
                </button>

                <button
                  onClick={() => navigate("/register")}
                  className="px-4 py-1.5 rounded-lg bg-white/50 hover:bg-blue-600 text-white transition"
                >
                  Register
                </button>
              </>
            ) : (
              <>
                <Heart
                  size={24}
                  className="cursor-pointer hover:text-red-200 transition"
                />
                <User
                  size={24}
                  className="cursor-pointer hover:text-white transition"
                  onClick={() => navigate("/profile")}
                />
                <ShoppingCart
                  size={24}
                  className="cursor-pointer hover:text-white transition"
                  onClick={() => navigate("/cart")}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
