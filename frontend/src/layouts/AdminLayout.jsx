import React from 'react'
import Header from '../components/admin/Header'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/admin/Sidebar'



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
    </div>
  )
}


