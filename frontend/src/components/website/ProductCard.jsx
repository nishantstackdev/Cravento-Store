import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddtoCart from "./AddtoCart";

// ⏳ LOCAL COUNTDOWN TIMER COMPONENT
const SaleTimer = ({ isHorizontal = false }) => {
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60);
  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Agar horizontal card hai, toh absolute positioning ki jagah standard layout bhejenge taaki flex container me set ho sake
  if (isHorizontal) {
    return (
      <div className="w-fit bg-red-600 text-white font-black text-[7px] md:text-[8px] uppercase tracking-widest px-2 py-0.5 rounded-md shadow-sm animate-pulse flex items-center space-x-1">
        <span className="w-1 h-1 bg-white rounded-full inline-block"></span>
        <span>SALE {formatTime(timeLeft)}</span>
      </div>
    );
  }

  // Default absolute layout grid layout ke liye
  return (
    <div className="absolute top-2.5 left-2.5 bg-red-600 text-white font-black text-[7px] md:text-[8px] uppercase tracking-widest px-2 py-0.5 rounded-md shadow-md animate-pulse z-20 flex items-center space-x-1">
      <span className="w-1 h-1 bg-white rounded-full inline-block"></span>
      <span>SALE {formatTime(timeLeft)}</span>
    </div>
  );
};

// 🎴 MAIN COMPONENT
const ProductCard = ({ product, variant = "grid" }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const currentProduct = product || {};
  const baseUrl = "http://localhost:7000";
  const isPopular = currentProduct.is_popular === true;

  const mainThumbnail = currentProduct.thumbnail
    ? `${baseUrl}${currentProduct.thumbnail}`
    : "/placeholder.png";
  const hasGallery = currentProduct.images && currentProduct.images.length > 0;
  const secondaryImage = hasGallery
    ? `${baseUrl}${currentProduct.images[0]}`
    : mainThumbnail;

  let discountPercentage = 0;
  if (currentProduct.original_price && currentProduct.final_price) {
    const diff = currentProduct.original_price - currentProduct.final_price;
    if (diff > 0)
      discountPercentage = Math.round(
        (diff / currentProduct.original_price) * 100,
      );
  }

  // ==========================================
  // ⚡ LAYOUT 2: HORIZONTAL VARIANT
  // ==========================================
  if (variant === "horizontal") {
    return (

      <div
        className={`w-full bg-white rounded-2xl border p-4 grid grid-cols-12 gap-4 items-center transition-all duration-300 ${isPopular
          ? "border-emerald-600/20 bg-emerald-50/5"
          : "border-neutral-100 hover:border-neutral-200"
          }`}
      >
        {/* Left Image Partition (cols 5) */}
        <div className="col-span-5 aspect-square bg-neutral-50 rounded-xl relative overflow-hidden flex items-center justify-center p-2 flex-shrink-0">
          <Link
            to={`/product-detail/${currentProduct._id}`}
            className="block w-full"
          >
            {discountPercentage > 0 && (
              <span className="absolute top-1.5 left-1.5 bg-red-500 text-white font-black text-[8px] px-1.5 py-0.5 rounded z-10 uppercase tracking-wider">
                -{discountPercentage}%
              </span>
            )}

            <img
              src={mainThumbnail}
              alt={currentProduct.name}
              className="max-w-[90%] max-h-[90%] object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </div>

        {/* Right Content Partition (cols 7) */}
        <div className="col-span-7 flex flex-col justify-between space-y-2 min-w-0">
          <div className="space-y-1">
            {/* ⚡ CATCH FIXED: Agar product popular hai toh product heading ke upar sale timer chalega */}
            {isPopular && <SaleTimer isHorizontal={true} />}

            <h3 className="text-xs md:text-sm font-black text-neutral-800 line-clamp-2 leading-tight hover:text-emerald-600 transition-colors pt-0.5">
              {currentProduct.name}
            </h3>

            {/* ⭐ Stars rating */}
            <div className="flex items-center space-x-0.5 mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="w-2.5 h-2.5 fill-amber-400"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-[9px] text-neutral-400 font-bold pl-1">
                (4)
              </span>
            </div>
          </div>

          {/* Price Metrics Row */}
          <div className="flex items-baseline space-x-2">
            <span className="text-xs text-neutral-400 line-through">
              ₹{currentProduct.original_price}
            </span>
            <span className="text-sm font-black text-emerald-600">
              ₹{currentProduct.final_price}
            </span>
          </div>

          <AddtoCart stock={currentProduct.stock} />
        </div>
      </div>
    );
  }

  // ==========================================
  // ⚡ LAYOUT 1: STANDARD GRID VARIANT (Default)
  // ==========================================
  return (

    <div
      className={`w-full max-w-[200px] my-2 bg-white rounded-2xl border transition-all duration-500 ease-out group flex flex-col overflow-hidden relative mx-auto ${isPopular
          ? "border-amber-400 shadow-[0_8px_20px_rgba(245,158,11,0.08)] scale-[1.01]"
          : "border-gray-100 hover:border-gray-200/60 shadow-[0_4px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
        }`}
    >
      {/* Image Section */}
      <div className="w-full aspect-square bg-neutral-50/70 relative overflow-hidden flex items-center justify-center p-3">

        {/* Sale Badge */}
        {isPopular ? (
          <>
            <SaleTimer />

            {discountPercentage > 0 && (
              <span className="absolute top-2.5 right-2.5 bg-amber-500 text-neutral-900 font-black text-[8px] tracking-wider px-2 py-0.5 rounded-md z-20 shadow-sm">
                {discountPercentage}% OFF
              </span>
            )}
          </>
        ) : (
          discountPercentage > 0 && (
            <span className="absolute top-2.5 left-2.5 bg-red-500 text-white font-extrabold text-[8px] tracking-widest px-1.5 py-0.5 rounded-md z-10 shadow-sm">
              Save {discountPercentage}%
            </span>
          )
        )}

        {/* Wishlist */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`absolute p-2 bg-white/80 backdrop-blur-md border border-white/40 rounded-full shadow-sm z-30 transition-all duration-300 ${isPopular
              ? "top-10 right-2.5"
              : "top-2.5 right-2.5 opacity-0 group-hover:opacity-100"
            }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={`w-3 h-3 ${isWishlisted
                ? "fill-red-500 stroke-red-500"
                : "fill-none stroke-neutral-800"
              }`}
            strokeWidth="2.5"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>

        {/* Only Images Clickable */}
        <Link
          to={`/product-detail/${currentProduct._id}`}
          className="absolute inset-0 flex items-center justify-center"
        >
          <img
            src={mainThumbnail}
            alt={currentProduct.name}
            className="absolute w-[80%] h-[80%] object-contain mix-blend-multiply transition-all duration-700 ease-in-out group-hover:opacity-0 group-hover:scale-95 z-10"
          />

          <img
            src={secondaryImage}
            alt={`${currentProduct.name} 2`}
            className="absolute w-[80%] h-[80%] object-contain mix-blend-multiply opacity-0 scale-105 transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:scale-100 z-0"
          />
        </Link>
      </div>

      {/* Content Section */}
      <div className="p-3 flex flex-col flex-grow justify-between bg-white space-y-2">
        <div className="space-y-1">
          <span
            className={`text-[8px] font-black tracking-widest uppercase block ${isPopular ? "text-amber-500" : "text-neutral-400"
              }`}
          >
            {isPopular ? "🔥 Best Seller" : "Organic Fresh"}
          </span>

          <h3 className="text-[12px] font-medium text-neutral-800 line-clamp-2 leading-tight min-h-[32px]">
            {currentProduct.name}
          </h3>
        </div>

        <div className="flex items-end justify-between pt-1">
          <div className="flex flex-col">
            {currentProduct.original_price >
              currentProduct.final_price && (
                <span className="text-[9px] text-neutral-400 line-through">
                  ₹{currentProduct.original_price}
                </span>
              )}

            <span className="text-xs font-black text-neutral-900">
              ₹{currentProduct.final_price}
            </span>
          </div>
        </div>

        <AddtoCart stock={currentProduct.stock} />
      </div>
    </div>
  );
};

export default ProductCard;