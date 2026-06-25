import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WebsiteLayout from "./layouts/WebsiteLayout";
import Home from "./pages/Home";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./admin/Dashboard";
import ManageProducts from "./admin/ManageProducts";
import Shop from "./pages/Shop";
import Categories from "./admin/Categories";
import Notfound from "./pages/Not-found";
import AddCategory from "./admin/AddCategory";
import EditCategory from "./admin/EditCategory";
import Brands from "./admin/Brands";
import AddBrand from "./admin/AddBrand";
import EditBrand from "./admin/EditBrand";
import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/Cartpage";
import WishlistPage from "./pages/WishlistPage";

export default function App() {
  const allrouter = createBrowserRouter([
    {
      path: "/",
      element: <WebsiteLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "products", element: <Shop /> },
        { path: "product-detail/:id", element: <ProductDetail /> },
        { path: "cart", element: <CartPage /> },
        { path: "wishlist", element: <WishlistPage /> },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "products", element: <ManageProducts /> },
        { path: "categories", element: <Categories /> },
        { path: "brands", element: <Brands /> },
        { path: "categories/AddCategory", element: <AddCategory /> },
        { path: "AddBrand", element: <AddBrand /> },
        {
          path: "categories/EditCategory/:category_id",
          element: <EditCategory />,
        },
        {
          path: "brands/EditBrand/:brand_id",
          element: <EditBrand />,
        },
        {
          path: "products/AddProduct",
          element: <AddProduct />,
        },
        {
          path: "products/EditProduct/:product_id",
          element: <EditProduct />,
        },
      ],
    },
    {
      path: "*",
      element: <Notfound />,
    },
  ]);

  return <RouterProvider router={allrouter} />;
}
