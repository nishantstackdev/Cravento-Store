import React from "react";
import Navbar from "../components/website/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/website/Footer";
import ScrollToTop from "../components/website/ScrollToTop";
import ReduxProvider from "../redux/ReduxProvider";

export default function WebsiteLayout() {
  return (
    <ReduxProvider>
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </ReduxProvider>
  );
}
