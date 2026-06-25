import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetproductbyId } from "../api/AllApi";
import ProductImageZoom from "../components/website/ProductImageZoom";
import AddtoCart from "../components/website/AddtoCart";
import banner1 from "../assets/home/extended-01.jpg"
import banner2 from "../assets/home/extended-02.jpg"

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // ⚡ Main Dynamic States
  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  const baseUrl = "http://localhost:7000";

  // 🔄 Real-time product fetch pipeline linked to the active route ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GetproductbyId(id);

        if (res && res.allProducts) {
          setProduct(res.allProducts);

          // 🖼️ Initialize standard thumbnail high-res link
          const initialImg = res.allProducts.thumbnail
            ? res.allProducts.thumbnail.startsWith("http")
              ? res.allProducts.thumbnail
              : `${baseUrl}${res.allProducts.thumbnail}`
            : "/placeholder.png";

          setSelectedImage(initialImg);
        }
      } catch (err) {
        console.log("Component Fetch Error:", err);
      }
    };

    fetchData();
  }, [id]); // 👈 Triggers re-fetch and resets image when id shifts

  // Safe fallback calculation rules for primary fallback asset strings
  const mainThumbnail = product.thumbnail
    ? product.thumbnail.startsWith("http")
      ? product.thumbnail
      : `${baseUrl}${product.thumbnail}`
    : "/placeholder.png";

  return (
    <>
      <section className="w-full py-12 px-4 max-w-7xl mx-auto bg-white">
        {/* 🧭 Back Navigation Row */}
        <div
          onClick={() => navigate("/products")}
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
          <div className="lg:col-span-6 flex flex-col space-y-4 relative z-40">
            {/* ✅ FIXED MAIN CONTAINER BOX: Configured to support floating overlay blocks */}
            <div className="w-full aspect-square bg-neutral-50/80 border border-neutral-100/70 rounded-2xl flex items-center justify-center p-4 relative overflow-visible">
              <ProductImageZoom
                src={selectedImage || mainThumbnail}
                alt={product.name || "Product Image"}
              />
            </div>

            {/* 🖼️ BOTTOM THUMBNAILS STRIP ROW */}
            <div className="flex items-center space-x-3 overflow-x-auto pb-2 scrollbar-thin select-none">
              {/* Primary Main Thumbnail Wrapper */}
              <div
                onClick={() => setSelectedImage(mainThumbnail)}
                className={`w-20 h-20 bg-neutral-50 border rounded-xl flex items-center justify-center p-2 cursor-pointer flex-shrink-0 transition-all duration-200 ${
                  selectedImage === mainThumbnail || !selectedImage
                    ? "border-emerald-500 ring-2 ring-emerald-500/10 scale-[0.96]"
                    : "border-neutral-200/70 hover:border-neutral-400"
                }`}
              >
                <img
                  src={mainThumbnail}
                  alt="main-thumb"
                  className="max-w-full max-h-full object-contain mix-blend-multiply image-render-smooth"
                />
              </div>

              {/* Loop through extra gallery images dynamically with sanitization rules */}
              {product.images?.map((imgUrl, idx) => {
                if (!imgUrl) return null;

                // Absolute path generation for the background arrays
                const fullImgUrl = imgUrl.startsWith("http")
                  ? imgUrl
                  : `${baseUrl}${imgUrl.startsWith("/") ? imgUrl : `/${imgUrl}`}`;

                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedImage(fullImgUrl)}
                    className={`w-20 h-20 bg-neutral-50 border rounded-xl flex items-center justify-center p-2 cursor-pointer flex-shrink-0 transition-all duration-200 ${
                      selectedImage === fullImgUrl
                        ? "border-emerald-500 ring-2 ring-emerald-500/10 scale-[0.96]"
                        : "border-neutral-200/70 hover:border-neutral-400"
                    }`}
                  >
                    <img
                      src={fullImgUrl}
                      alt={`thumb-${idx}`}
                      // ⚡ High quality rendering anchors injected inside components
                      className="max-w-full max-h-full object-contain mix-blend-multiply transition-opacity duration-300"
                      style={{ imageRendering: "-webkit-optimize-contrast" }}
                      onError={(e) => {
                        e.target.src = "/placeholder.png";
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* 📝 RIGHT PART: Product Specification Content Info */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
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
              {product.description ||
                product.long_description ||
                product.short_description ||
                "No description available for this product."}
            </p>

            {/* 🛒 Quantity Selection and Custom Upgraded Cart CTA Trigger */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 border-t border-neutral-100">
              {/* Quantity Counter box */}
              <div className="flex items-center justify-between border border-neutral-200 rounded-xl px-3 py-2 bg-neutral-50/50 w-full sm:w-32 flex-shrink-0 h-[52px]">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="text-lg font-bold text-neutral-500 hover:text-neutral-900 px-2 cursor-pointer transition-colors select-none"
                >
                  -
                </button>
                <span className="text-sm font-black text-neutral-800">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="text-lg font-bold text-neutral-500 hover:text-neutral-900 px-2 cursor-pointer transition-colors select-none"
                >
                  +
                </button>
              </div>

              {/* ⚡ SYNCHRONIZED CTA BUTTON */}
              <div className="flex-grow">
                <AddtoCart
                  stock={product.stock !== undefined ? product.stock : true}
                />
              </div>
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
      <section className="w-full py-2 px-4 max-w-7xl mx-auto border-red-400 rounded-2xl">
        <div className="grid gap-2 sm:grid-cols-2 grid-cols-1">
            <div>
              <img src={banner1} alt="banner-1" />
            </div>
            <div>
              <img src={banner2} alt="banner-2" />
            </div>
        </div>
        <h1 className="font-bold text-xl py-2">About Ourselves</h1>
        <p className="text-gray-400 py-3">At our grocery store, we offer a diverse selection of fresh, high-quality products to meet all your needs. From seasonal produce and premium meats to organic and gluten-free options, we’ve got something for everyone. Our bakery delivers freshly baked bread and treats daily, while pantry staples and snacks fill every aisle. With a commitment to supporting local farmers and businesses, you can trust us for quality, freshness, and affordability. Shop with us for all your grocery essentials and enjoy exceptional customer service!</p>
        <h1 className="font-bold text-xl py-2">Handmade and Unique</h1>
        <p className="text-gray-400 py-3">In teenagers, there is a rapid gain in muscle mass and an increase in height up to 10 cm! Your new Milo is specially designed to support the nutrition needs of this growth phase. Made with quality ingredients like whey and jaggery, this protein drink Milo is also enriched with select nutrients to help support the growth of bones, muscle function and immune system function. Whey has good quality protein which is easy to digest and has essential amino acids while jaggery is sourced from sugarcane which brings a rich taste to Milo. Besides jaggery, Milo has sugar naturally found in milk, cocoa and malt. Each serve of Milo has less than 1 tsp. of sucrose, typically known as ‘shakkar or cheeni’.</p>
        <h1 className="font-bold text-xl py-2">Craftsmanship</h1>
        <p className="text-gray-400 py-3">Our grocery store offers fresh, high-quality produce, premium meats, and everyday essentials at affordable prices. We provide organic and gluten-free options, along with freshly baked breads and pastries daily. With a focus on supporting local farmers and businesses, we ensure the finest products. Friendly service, quality, and convenience are at the heart of our store, making your shopping experience enjoyable and hassle-free.</p>
         <h1 className="font-bold text-xl py-2">Aesthetic Appeal</h1>
        <p className="text-gray-400 py-3">Your local grocery store offers fresh produce, premium meats, and everyday essentials at great prices. We provide organic options, gluten-free products, and freshly baked goods daily. With friendly service and a commitment to quality, we make shopping easy and enjoyable while supporting local farmers and businesses.</p>
      </section>
    </>
  );
};

export default ProductDetail;
