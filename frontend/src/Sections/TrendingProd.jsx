import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import axiosinstance from "../helper/helper";
import ProductCard from "../components/website/ProductCard";

export default function TrendingProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axiosinstance
      .get("/product")
      .then((res) => {
        if (res.data.success) setProducts(res.data.allProducts);
      })
      .catch(() => setProducts([]));
  }, []);

  return (
    <section className="w-full py-8 px-4 max-w-7xl mx-auto space-y-6">
      
      {/* 🔝 Minimalist Top Header */}
      <div className="flex items-baseline space-x-3 border-b border-gray-100 pb-4">
        <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
          Trending Products
        </h2>
        <span className="text-xs font-medium text-gray-400 hidden sm:inline-block">
          A grocery store is a retail store, specially made for selling food
        </span>
      </div>

      {/* 🚀 Dynamic Responsive Matrix */}
      <div>
        
        {/* 📱 Mobile UI: Invisible Swiper */}
        <div className="block md:hidden">
          <Swiper
            spaceBetween={8}
            slidesPerView={2.2} // 2.2 karne se teesra card halka sa peek karega, user ko swipe ka hint milega
            className="w-full !overflow-visible"
          >
            {products.map((item) => (
              <SwiperSlide key={item._id}>
                {/* Mobile par container limits match karne ke liye wrapper */}
                <div className="px-1 py-2">
                  <ProductCard product={item} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 🖥️ Tablet & Desktop UI: Standardizing Grid Box Spaces */}
        {/* ⚡ Yahan grid bounds aur gap ko scale kiya hai taaki gap tight ho jaye */}
        <div className="hidden md:grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {products.map((item) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </div>

      </div>
    </section>
  );
}