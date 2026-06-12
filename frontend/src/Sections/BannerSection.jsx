import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import banner1 from "../assets/home/banner1.png";
import banner2 from "../assets/home/banner2.png";

export default function BannerSlider() {
  const banners = [
    {
      image: banner1,
      badge: "EXCLUSIVE DEAL",
      title: "FRESH BAKERY ITEMS DELIVERED",
      subtitle: "Get up to 40% OFF on your first database batch injection order."
    },
    {
      image: banner2,
      badge: "NEW ARRIVALS",
      title: "ORGANIC VEGETABLES CLUSTER",
      subtitle: "100% Organic items sourced directly from core local farms."
    }
  ];

  return (
    <div className="w-full max-w-[1900px] h-[300px] sm:h-[400px] md:h-[480px] lg:h-[550px] mx-auto sm:px-4 md:px-6 rounded-2xl overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        className="h-full w-full shadow-sm rounded-2xl"
      >
        {banners.map((banner, idx) => (
          <SwiperSlide key={idx} className="relative w-full h-full group">
            
            {/* 🖼️ BACKGROUND IMAGE */}
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-cover object-center select-none"
            />

            {/* 🎴 OVERLAY LAYER (Direction changed from Left to Right: bg-gradient-to-l) */}
            <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/40 to-transparent flex items-center p-6 sm:p-12 md:p-16" />

            {/* 📝 RIGHT ALIGNED ANIMATED TEXT CONTENT BOX */}
            {/* items-end aur right-0 lagane se text box right side switch ho gaya hai */}
            <div className="absolute inset-y-0 right-0 flex flex-col justify-center items-end text-right px-8 sm:px-16 md:px-24 max-w-2xl z-10 text-white space-y-3 sm:space-y-4">
              
              {/* 🏷️ BADGE ANIMATION */}
              <span className="inline-block bg-[#008A5E] text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-md opacity-0 translate-y-[-20px] transition-all duration-700 ease-out [.swiper-slide-active_&]:opacity-100 [.swiper-slide-active_&]:translate-y-0">
                {banner.badge}
              </span>

              {/* 👑 TITLE ANIMATION */}
              <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight uppercase opacity-0 translate-y-[30px] transition-all duration-700 delay-300 ease-out [.swiper-slide-active_&]:opacity-100 [.swiper-slide-active_&]:translate-y-0">
                {banner.title}
              </h2>

              {/* 📄 SUBTITLE ANIMATION */}
              <p className="text-xs sm:text-sm md:text-base font-medium text-gray-200 tracking-tight max-w-md opacity-0 translate-y-[30px] transition-all duration-700 delay-500 ease-out [.swiper-slide-active_&]:opacity-100 [.swiper-slide-active_&]:translate-y-0">
                {banner.subtitle}
              </p>

              {/* 🛍️ CALL TO ACTION BUTTON ANIMATION */}
              <button className="opacity-0 scale-95 transition-all duration-700 delay-700 ease-out [.swiper-slide-active_&]:opacity-100 [.swiper-slide-active_&]:scale-100 mt-2 flex items-center bg-white hover:bg-gray-100 text-black text-[10px] font-black tracking-widest uppercase px-5 py-3 rounded-xl shadow-md transition-colors">
                SHOP NOW
              </button>

            </div>

          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}