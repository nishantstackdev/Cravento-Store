import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosinstance from "../helper/helper";
import { GetproductbyId } from "../api/AllApi";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // ⚡ Main States
  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  const baseUrl = "http://localhost:7000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GetproductbyId(id);

        // ✅ Server response verification & state setting
        if (res && res.allProducts) {
          setProduct(res.allProducts);

          // 🖼️ Initialize main image on page load
          const initialImg = res.allProducts.thumbnail
            ? `${baseUrl}${res.allProducts.thumbnail}`
            : "/placeholder.png";
          setSelectedImage(initialImg);
        }
      } catch (err) {
        console.log("Component Fetch Error:", err);
      }
    };

    fetchData();
  }, [id]);

  // Fallback calculations for main thumbnail string
  const mainThumbnail = product.thumbnail
    ? `${baseUrl}${product.thumbnail}`
    : "/placeholder.png";

  return (
    <section className="w-full py-12 px-4 max-w-7xl mx-auto bg-white">
      {/* 🧭 Back Navigation Row */}
      <div
        onClick={() => navigate("/")}
        className="flex items-center space-x-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-8 cursor-pointer hover:text-emerald-600 transition-colors w-max"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="currentColor"
          className="w-3.5 h-3.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        <span>Back to Products</span>
      </div>

      {/* 🚀 Main Split Grid Structure */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* 📸 LEFT PART: Image Gallery Frame Matrix */}
        <div className="lg:col-span-6 flex flex-col space-y-4">
          {/* Main big display box */}
          <div className="w-full aspect-square bg-neutral-50/80 border border-neutral-100 rounded-2xl flex items-center justify-center p-2 relative overflow-hidden">
            <img
              src={selectedImage || mainThumbnail}
              alt={product.name || "Product Image"}
              // ⚡ FIXED: max-w/max-h ko 95% kiya aur w-full h-full ke sath object-contain balance kiya
              className="w-full h-full max-w-[95%] max-h-[95%] object-contain mix-blend-multiply transition-all duration-300 ease-out"
            />
          </div>

          {/* Bottom Thumbnails Strip Row */}
          <div className="flex items-center space-x-3 overflow-x-auto pb-1">
            {/* Standard primary thumbnail */}
            <div
              onClick={() => setSelectedImage(mainThumbnail)}
              className={`w-20 h-20 bg-neutral-50 border rounded-xl flex items-center justify-center p-2 cursor-pointer flex-shrink-0 transition-all ${
                selectedImage === mainThumbnail
                  ? "border-emerald-500 ring-2 ring-emerald-500/10"
                  : "border-neutral-200/60 hover:border-neutral-400"
              }`}
            >
              <img
                src={mainThumbnail}
                alt="main-thumb"
                className="max-w-full max-h-full object-contain mix-blend-multiply"
              />
            </div>

            {/* Loop through extra gallery images dynamically */}
            {product.images?.map((imgUrl, idx) => {
              const fullImgUrl = imgUrl.startsWith("http")
                ? imgUrl
                : `${baseUrl}${imgUrl}`;

              return (
                <div
                  key={idx}
                  onClick={() => setSelectedImage(fullImgUrl)}
                  className={`w-20 h-20 bg-neutral-50 border rounded-xl flex items-center justify-center p-2 cursor-pointer flex-shrink-0 transition-all ${
                    selectedImage === fullImgUrl
                      ? "border-emerald-500 ring-2 ring-emerald-500/10"
                      : "border-neutral-200/60 hover:border-neutral-400"
                  }`}
                >
                  <img
                    src={fullImgUrl}
                    alt={`thumb-${idx}`}
                    className="max-w-full max-h-full object-contain mix-blend-multiply"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* 📝 RIGHT PART: Product Specification Content Info */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            {/* Dynamic Tag */}
            <span className="text-[10px] font-black tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md uppercase w-max block">
              Craventa Fresh Elite
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-neutral-900 tracking-tight leading-tight">
              {product.name || "Loading Product..."}
            </h1>
          </div>

          {/* ⭐ Rating Star Metrics Line */}
          <div className="flex items-center space-x-2 border-b border-neutral-100 pb-4">
            <div className="flex items-center space-x-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="w-4 h-4 fill-amber-400"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-neutral-500 font-semibold">
              (24 Customer Reviews)
            </span>
          </div>

          {/* 💰 Price Display Block */}
          <div className="flex items-baseline space-x-3">
            <span className="text-3xl font-black text-neutral-900">
              ₹{product.final_price || 0}
            </span>
            {product.original_price > product.final_price && (
              <>
                <span className="text-base text-neutral-400 line-through font-medium">
                  ₹{product.original_price}
                </span>
                <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-md">
                  ₹{product.original_price - product.final_price} OFF
                </span>
              </>
            )}
          </div>

          {/* 📖 Rich Description Area */}
          <p className="text-xs md:text-sm text-neutral-600 leading-relaxed font-normal">
            {product.long_description ||
              product.short_description ||
              "No description available for this product."}
          </p>

          {/* 🛒 Quantity Selection and Main Cart CTA Trigger */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 border-t border-neutral-100">
            {/* Quantity Counter box */}
            <div className="flex items-center justify-between border border-neutral-200 rounded-xl px-3 py-2 bg-neutral-50/50 w-full sm:w-32">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="text-lg font-bold text-neutral-500 hover:text-neutral-900 px-2 cursor-pointer transition-colors"
              >
                -
              </button>
              <span className="text-sm font-black text-neutral-800">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="text-lg font-bold text-neutral-500 hover:text-neutral-900 px-2 cursor-pointer transition-colors"
              >
                +
              </button>
            </div>

            {/* Heavy CTA Add to Cart Button */}
            <button className="flex-grow bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-widest py-3.5 px-6 rounded-xl transition-all duration-300 shadow-md shadow-emerald-600/10 active:scale-[0.98] cursor-pointer text-center">
              Add To Cart Portfolio
            </button>
          </div>

          {/* 📦 Trust Highlights Badges Checklist */}
          <div className="grid grid-cols-2 gap-3 pt-6 border-t border-neutral-50 text-[11px] font-semibold text-neutral-500">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold">
                ✓
              </div>
              <span>100% Organic Certified</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold">
                ✓
              </div>
              <span>Super Fast Local Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
