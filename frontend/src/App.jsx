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
        { path: "AddCategory", element: <AddCategory /> },
        
        // 🔄 2. EDIT CATEGORY KA ROUTE INJECT KIYA (Dynamic Parameter Ke Sath)
        {
          path: "categories/EditCategory/:category_id",
          element: <EditCategory />
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