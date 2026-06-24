import React, { useState, useEffect } from "react";
import ProductCard from "../components/website/ProductCard"; // 👈 Apna main card core component import karo
import { GetProducts } from "../api/AllApi";
// Swiper Architecture Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// ⏳ DYNAMIC COUNTDOWN BOX (Hum isko card ke sath sync karenge)
const DealTimer = ({ initialDays }) => {
  const [timeLeft, setTimeLeft] = useState(initialDays * 24 * 60 * 60 - 4200);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const days = Math.floor(timeLeft / (24 * 3600));
  const hrs = Math.floor((timeLeft % (24 * 3600)) / 3600);
  const mins = Math.floor((timeLeft % 3600) / 60);
  const secs = timeLeft % 60;

  const timeBlocks = [
    { label: "DAYS", value: days },
    { label: "HRS", value: hrs },
    { label: "MIN", value: mins },
    { label: "SEC", value: secs },
  ];

  return (
    <div className="flex items-center space-x-1.5 py-1">
      {timeBlocks.map((block, idx) => (
        <div key={idx} className="flex flex-col items-center border border-neutral-200/60 rounded-md min-w-[38px] py-0.5 bg-white shadow-xs">
          <span className="text-xs font-black text-neutral-800 leading-none">
            {block.value.toString().padStart(2, "0")}
          </span>
          <span className="text-[6px] font-bold text-neutral-400 uppercase tracking-wider mt-0.5">
            {block.label}
          </span>
        </div>
      ))}
    </div>
  );
};

const DealOfTheDay = () => {

  const [products, setProducts] = useState([]);
  
    useEffect(() => {
      const fetchProducts = async () => {
        const res = await GetProducts({limit:8,status:true,is_popular:true});
  
        if (res && res.success) {
          setProducts(res.allProducts);
        } else {
          setProducts([]);
        }
      };
  
      fetchProducts();
    }, []);
  

  return (
    <section className="w-full py-10 px-4 max-w-7xl mx-auto bg-[#eff7f5]/40 rounded-3xl my-6">
      
      {/* 🏁 HEADER NAVIGATION PANEL */}
      <div className="flex items-center justify-between mb-8 border-b border-neutral-200/40 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:space-x-4 space-y-1 sm:space-y-0">
          <h2 className="text-xl md:text-2xl font-black text-neutral-900 tracking-tight">
            Deal Of The Day
          </h2>
          <p className="text-xs md:text-sm text-neutral-500 font-medium">
            Sale up to 30% off on selected items.
          </p>
        </div>

        {/* SWIPER BUTTON CONTROLLERS */}
        <div className="flex items-center space-x-2">
          <button className="swiper-deal-prev w-8 h-8 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-600 hover:bg-emerald-600 hover:text-white transition-all cursor-pointer shadow-sm active:scale-90">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
          </button>
          <button className="swiper-deal-next w-8 h-8 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-600 hover:bg-emerald-600 hover:text-white transition-all cursor-pointer shadow-sm active:scale-90">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          </button>
        </div>
      </div>

      {/* 🚀 CORE SWIPER SWIPE SYSTEM CONTAINER */}
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: ".swiper-deal-prev",
          nextEl: ".swiper-deal-next",
        }}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1.2, spaceBetween: 16 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
        }}
        className="w-full"
      >
        {products.map((item) => {
          // Injecting the localized countdown timer layout node into product object payload
          const richProductPayload = {
            ...item,
            children: <DealTimer initialDays={item.days_left} />
          };

          return (
            <SwiperSlide key={item._id}>
              {/* ⚡ REUSABILITY POWER: Calling global component using Horizontal rules layout */}
              <ProductCard product={richProductPayload} variant="horizontal" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default DealOfTheDay;