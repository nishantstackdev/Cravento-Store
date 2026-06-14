import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import WebsiteLayout from './layouts/WebsiteLayout'
import Home from './pages/Home'
import AdminLayout from './layouts/AdminLayout'
import Dashboard from './admin/Dashboard'
import ManageProducts from './admin/ManageProducts'
import Shop from './pages/Shop'
import Categories from './admin/Categories'
import Notfound from './pages/Not-found'
import AddCategory from './admin/AddCategory'
// 📥 1. EditCategory component ko yahan import karo (apne sahi path ke hisab se)
import EditCategory from './admin/EditCategory'
import Brands from './admin/Brands'
import AddBrand from './admin/AddBrand'
import EditBrand from './admin/EditBrand'

export default function App() {
  const allrouter = createBrowserRouter([
    {
      path: "/",
      element: <WebsiteLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "products", element: <Shop /> }
      ]
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "products", element: <ManageProducts /> },
        { path: "categories", element: <Categories /> },
        { path: "brands", element: <Brands /> },
        { path: "AddCategory", element: <AddCategory /> },
        {path: "AddBrand",element: <AddBrand />},
        {
          path: "categories/EditCategory/:category_id",
          element: <EditCategory />
        },
        {
          path: "brands/EditBrand/:brand_id",
          element: <EditBrand />
        }
      ]
    },
    {
      path: "*",
      element: <Notfound />
    }
  ]);
  
  return (
    <RouterProvider router={allrouter} />
  )
}