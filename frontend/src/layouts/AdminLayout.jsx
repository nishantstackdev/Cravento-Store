import React from 'react'
import Header from '../components/admin/Header'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/admin/Sidebar'
import { ToastContainer } from 'react-toastify'


export default function AdminLayout() {
  return (
    <div className="w-full h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}


