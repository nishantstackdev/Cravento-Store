import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
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
      {/* Header */}
      <div className="flex items-baseline justify-between border-b border-gray-100 pb-4">
        <div className="flex items-baseline space-x-3">
          <h2 className="text-xl md:text-2xl font-black text-gray-900">
            Trending Products
          </h2>

          <span className="text-xs text-gray-400 hidden sm:block">
            A grocery store is a retail store, specially made for selling food
          </span>
        </div>

        {/* Desktop swiper controls */}
        <div className="hidden lg:flex items-center space-x-2 flex-shrink-0">
          <button
            type="button"
            aria-label="Previous products"
            className="swiper-trend-prev w-8 h-8 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-600 hover:bg-emerald-600 hover:text-white transition-all cursor-pointer shadow-sm active:scale-90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next products"
            className="swiper-trend-next w-8 h-8 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-600 hover:bg-emerald-600 hover:text-white transition-all cursor-pointer shadow-sm active:scale-90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile + Tablet Swiper */}
      <div className="block lg:hidden">
        <Swiper
          spaceBetween={12}
          breakpoints={{
            0: {
              slidesPerView: 2.1,
            },
            640: {
              slidesPerView: 3.2,
            },
            768: {
              slidesPerView: 4.3,
            },
          }}
          className="w-full !overflow-visible"
        >
          {products.map((item) => (
            <SwiperSlide key={item._id}>
              <div className="py-2">
                <ProductCard product={item} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop: 6 products visible, swiper for the rest */}
      <div className="hidden lg:block">
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".swiper-trend-prev",
            nextEl: ".swiper-trend-next",
          }}
          spaceBetween={16}
          slidesPerView={6}
          className="w-full"
        >
          {products.map((item) => (
            <SwiperSlide key={item._id}>
              <ProductCard product={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
