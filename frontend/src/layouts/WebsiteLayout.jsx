import React from "react";
import Navbar from "../components/website/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/website/Footer";
import ScrollToTop from "../components/website/ScrollToTop";

export default function WebsiteLayout() {
  return (
    <div>
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
