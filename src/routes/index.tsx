import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import Products from "../pages/Products/Products";
import Login from "../pages/Login/Login";
import Layout from "../components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        path: "products",
        element: <Products />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);
