import React from 'react'
import Navbar from '../components/website/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/website/Footer'

export default function WebsiteLayout() {
  return (
    <div>
        <Navbar />
        <Outlet />
        <Footer />
    </div>
  )
}
