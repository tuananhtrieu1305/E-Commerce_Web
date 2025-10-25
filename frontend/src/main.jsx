import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BookPage from "./pages/client/BookPage.jsx";
import AboutPage from "./pages/client/AboutPage.jsx";
import HomePage from "./pages/client/HomePage.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import RegisterPage from "./pages/auth/RegisterPage.jsx";
import CartPage from "./pages/cart/CartPage.jsx";
import { ConfigProvider } from "antd";
import enUS from "antd/es/calendar/locale/en_US.js";
import { CartProvider } from "./context/CartContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/book",
        element: <BookPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/cart", // <-- THÊM ROUTE NÀY
        element: <CartPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

// Cập nhật hàm render
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider locale={enUS}>
      <CartProvider> {/* <-- BỌC Ở ĐÂY */}
        <RouterProvider router={router} />
      </CartProvider> {/* <-- BỌC Ở ĐÂY */}
    </ConfigProvider>
  </StrictMode>
);
