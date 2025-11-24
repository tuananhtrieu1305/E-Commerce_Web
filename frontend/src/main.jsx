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
import { CheckoutProvider } from "./context/CheckoutContext.jsx";
import CheckoutPage from "./pages/checkout/CheckoutPage.jsx";
import PaymentReturnPage from "./pages/checkout/PaymentReturnPage.jsx";
import OrderHistoryPage from './pages/client/OrderHistoryPage.jsx';
import OrderDetailPage from './pages/client/OrderDetailPage.jsx';

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
        path: "/cart", 
        element: <CartPage />,
      },
      {
        path: "/payment-result", 
        element: <PaymentReturnPage  />,
      },

      {
        path: "/profile/orders", 
        element: <OrderHistoryPage  />,
      },
      {
        path: "/order-detail/:id", 
        element: <OrderDetailPage  />,
      },
    

      {
        path: "/checkout",
        element: (
          <CheckoutProvider>
            <CheckoutPage />
          </CheckoutProvider>
        ),
      }
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

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider locale={enUS}>
      <CartProvider> 
        <RouterProvider router={router} />
      </CartProvider> 
    </ConfigProvider>
  </StrictMode>
);
