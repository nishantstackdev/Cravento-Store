import React, { useState } from 'react';

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Fallback Data structure setup
  const currentProduct = product || {};
  
  // Base URLs for Asset parsing
  const baseUrl = "http://localhost:7000"; 
  const mainThumbnail = currentProduct.thumbnail ? `${baseUrl}${currentProduct.thumbnail}` : "/placeholder.png";
  
  const hasGallery = currentProduct.images && currentProduct.images.length > 0;
  const secondaryImage = hasGallery ? `${baseUrl}${currentProduct.images[0]}` : mainThumbnail;

  return (
    <div className="w-full max-w-[200px] bg-white rounded-2xl border border-gray-100 hover:border-gray-200/60 shadow-[0_4px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] transition-all duration-500 ease-out group flex flex-col overflow-hidden relative mx-auto">
      
      {/* 🖼️ Image Section - Absolute Layers for Absolute Smoothness */}
      <div className="w-full aspect-square bg-neutral-50/70 relative overflow-hidden flex items-center justify-center p-3">
        
        {/* Out of Stock / Top Badge Feature if needed */}
        {currentProduct.discount_price > 0 && (
          <span className="absolute top-2.5 left-2.5 bg-red-500 text-white font-extrabold text-[8px] uppercase tracking-widest px-1.5 py-0.5 rounded-md z-10 shadow-sm">
            Save
          </span>
        )}

        {/* ❤️ Smooth Floating Heart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-2.5 right-2.5 p-2 bg-white/80 backdrop-blur-md border border-white/40 rounded-full shadow-sm z-20 
            opacity-0 scale-90 translate-y-[-4px] group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 
            transition-all duration-300 ease-out cursor-pointer hover:bg-white active:scale-90"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={`w-3.5 h-3.5 transition-colors duration-300 ${
              isWishlisted ? 'fill-red-500 stroke-red-500' : 'fill-none stroke-neutral-800'
            }`}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>

        {/* 🔄 LAYER 1: Main Image (Hover par fade out hogi) */}
        <img
          src={mainThumbnail}
          alt={currentProduct.name}
          className="absolute w-[80%] h-[80%] object-contain mix-blend-multiply transition-all duration-700 ease-in-out group-hover:opacity-0 group-hover:scale-95 z-10"
        />

        {/* 🔄 LAYER 2: Secondary Image (Hover par smoothly fade in aur scale up hogi) */}
        <img
          src={secondaryImage}
          alt={`${currentProduct.name} view 2`}
          className="absolute w-[80%] h-[80%] object-contain mix-blend-multiply opacity-0 scale-105 transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:scale-100 z-0"
        />
      </div>

      {/* 📝 Content Information & Analytics (Strictly aligned with your Image layout) */}
      <div className="p-3 flex flex-col flex-grow justify-between bg-white space-y-2">
        <div className="space-y-1">
          {/* Product Name (Sleek text style with exact dynamic heights) */}
          <h3 className="text-[12px] font-medium text-neutral-800 line-clamp-2 leading-tight min-h-[32px] group-hover:text-emerald-600 transition-colors duration-300">
            {currentProduct.name}
          </h3>

          {/* ⭐ Minimal Rating Stars Component Row */}
          <div className="flex items-center space-x-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} className="w-3 h-3 fill-amber-400" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-[10px] text-gray-400 font-medium pl-1">(4)</span>
          </div>
        </div>

        {/* 💰 Price and Quick Action Layout */}
        <div className="flex items-end justify-between pt-1">
          <div className="flex items-baseline space-x-1.5">
            <span className="text-sm font-black text-neutral-900">
              ₹{currentProduct.final_price}
            </span>
            {currentProduct.original_price > currentProduct.final_price && (
              <span className="text-[10px] text-neutral-400 line-through font-medium">
                ₹{currentProduct.original_price}
              </span>
            )}
          </div>

          {/* 🛒 Sleek Action Tag: Smooth Slide/Fade transition on card hover */}
          <button className="text-[9px] font-bold text-emerald-700 bg-emerald-50/60 hover:bg-emerald-600 hover:text-white px-2.5 py-1.5 rounded-lg border border-emerald-100 hover:border-emerald-600 transition-all duration-300 tracking-wider uppercase cursor-pointer shadow-sm">
            Add
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductCard;