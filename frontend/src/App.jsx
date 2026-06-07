import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import WebsiteLayout from './layouts/WebsiteLayout'
import Home from './pages/Home'
import AdminLayout from './layouts/AdminLayout'
import Dashboard from './admin/Dashboard'
import ManageProducts from './admin/ManageProducts'
import Shop from './pages/Shop'
import Categories from './admin/Categories'

export default function App() {
  const allrouter = createBrowserRouter([
    {
      path: "/",
      element: <WebsiteLayout />,
      children: [
        {
          index: true, 
          element: <Home />
        },
        {
          path: "products", 
          element: <Shop />
        }
      ]
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          index: true, 
          element: <Dashboard />
        },
        {
          path: "products", 
          element: <ManageProducts />
        },
        {
          path: "categories", 
          element: <Categories />
        }
      ]
    },
    {
      path: "*",
      element: <h1>Not found</h1>
    }
  ])
  
  return (
    <RouterProvider router={allrouter} />
  )
}
  

