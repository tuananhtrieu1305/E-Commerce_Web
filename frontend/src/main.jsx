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
import AdminPage from "./pages/admin/AdminPage.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import ManageUsers from "./pages/admin/ManageUsers.jsx";
import ManageAdmins from "./pages/admin/ManageAdmins.jsx";
import ManageOrders from "./pages/admin/ManageOrders.jsx";
import ManageProducts from "./pages/admin/ManageProducts.jsx";
import { ConfigProvider } from "antd";
import enUS from "antd/locale/en_US";

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
  {
    path: "/admin",
    element: <AdminPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/admin/users",
        element: <ManageUsers />,
      },
      {
        path: "/admin/admins",
        element: <ManageAdmins />,
      },
      {
        path: "/admin/orders",
        element: <ManageOrders />,
      },
      {
        path: "/admin/products",
        element: <ManageProducts />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider locale={enUS}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </StrictMode>
);
