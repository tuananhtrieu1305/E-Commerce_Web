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
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
