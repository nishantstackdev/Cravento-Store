import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axiosinstance from "../../helper/helper";
import PriceFilter from "./PriceFilter";


const FilterSidebar = ({ isOpen, setIsOpen }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  // 🎯 URL query string se live variables read kiye
  const activeCategorySlug = searchParams.get("category_slug");
  const activeBrandSlug = searchParams.get("brand_slug");

  // Fetch Categories and Brands simultaneously on load
  useEffect(() => {
    const loadFiltersData = async () => {
      try {
        const [catRes, brandRes] = await Promise.all([
          axiosinstance.get("/category"),
          axiosinstance.get("/brand") // Replace with your exact Brand endpoint
        ]);
        if (catRes) setCategories(catRes.data.allCategories || catRes.data);
        if (brandRes) setBrands(brandRes.data.allBrands || brandRes.data);
      } catch (err) {
        console.error("Filters sidebar fetch crash:", err);
      }
    };
    loadFiltersData();
  }, []);

  // ⚡ URL Params Handler for Category
  // ⚡ Clean Category Click Handler
  const handleCategoryClick = (slug) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("page");

    if (slug) {
      newParams.set("category_slug", slug);
    } else {
      newParams.delete("category_slug");
    }
    setSearchParams(newParams);
    setIsOpen(false);
  };

  // ⚡ Clean Brand Click Handler
  const handleBrandClick = (slug) => {
    const newParams = new URLSearchParams(searchParams);

    // URL se page parameter ko bilkul saaf kar do
    newParams.delete("page");

    if (slug) {
      newParams.set("brand_slug", slug);
    } else {
      newParams.delete("brand_slug");
    }
    setSearchParams(newParams);
    setIsOpen(false);
  };

  // ⚡ Reset All Parameters Engine
  const handleReset = () => {
    setSearchParams({});
    setIsOpen(false);
  };

  // 📦 Internal Render Structure Component to prevent duplication
  const FilterContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-black text-xs uppercase tracking-wider text-neutral-400">Filters</h3>
         <button
            onClick={handleReset}
            className="text-[10px] font-bold text-red-500 hover:underline cursor-pointer"
          >
            Clear All
          </button>
      </div>

      <hr className="border-neutral-200/60" />

      {/* 🌿 1. CATEGORIES BLOCK */}
      <div>
        <h4 className="font-black text-sm text-neutral-800 mb-3 tracking-tight">Categories</h4>
        <div className="space-y-1 max-h-56 overflow-y-auto pr-1 scrollbar-thin">
          <button
            onClick={() => handleCategoryClick("")}
            className={`w-full text-left px-3 py-2 text-xs font-bold rounded-xl transition-all ${!activeCategorySlug
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/10"
                : "text-neutral-600 hover:bg-neutral-100"
              }`}
          >
            All Categories
          </button>
          {categories?.map((cat) => (
            <button
              key={cat._id}
              onClick={() => handleCategoryClick(cat.slug)}
              className={`w-full text-left px-3 py-2 text-xs font-bold rounded-xl transition-all ${activeCategorySlug === cat.slug
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/10"
                  : "text-neutral-600 hover:bg-neutral-100"
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* 🏷️ 2. BRANDS BLOCK */}
      <div>
        <h4 className="font-black text-sm text-neutral-800 mb-3 tracking-tight">Brands</h4>
        <div className="space-y-1 max-h-56 overflow-y-auto pr-1 scrollbar-thin">
          <button
            onClick={() => handleBrandClick("")}
            className={`w-full text-left px-3 py-2 text-xs font-bold rounded-xl transition-all ${!activeBrandSlug
                ? "bg-amber-500 text-white shadow-md shadow-amber-500/10"
                : "text-neutral-600 hover:bg-neutral-100"
              }`}
          >
            All Brands
          </button>
          {brands?.map((brand) => (
            <button
              key={brand._id}
              onClick={() => handleBrandClick(brand.slug)}
              className={`w-full text-left px-3 py-2 text-xs font-bold rounded-xl transition-all ${activeBrandSlug === brand.slug
                  ? "bg-amber-500 text-white shadow-md shadow-amber-500/10"
                  : "text-neutral-600 hover:bg-neutral-100"
                }`}
            >
              {brand.name}
            </button>
          ))}
        </div>
      </div>
      <PriceFilter />
    </div>
  );

  return (
    <>
      {/* 🖥️ DESKTOP PANEL: Standard Left Side Grid Column Box */}
      <aside className="hidden lg:block lg:col-span-3 lg:sticky lg:top-6 bg-white border border-neutral-100 p-5 rounded-3xl shadow-sm">
        <FilterContent />
      </aside>

      {/* 📱 MOBILE MODAL DRAWER OVERLAY WRAPPER */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-[99999] flex justify-end animate-fade-in">
          {/* Backdrop blur backdrop window screen tap closer */}
          <div
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm transition-opacity"
          />

          {/* Actual animated slide-in block layout container */}
          <div className="relative w-full max-w-xs h-full bg-white shadow-2xl p-6 flex flex-col space-y-6 overflow-y-auto animate-slide-left z-10">
            {/* Header section wrapper */}
            <div className="flex items-center justify-between border-b pb-3 border-neutral-100">
              <span className="font-black text-neutral-900 text-sm">Sort & Filter</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4 text-neutral-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Injected layout forms */}
            <FilterContent />
          </div>
        </div>
      )}
    </>
  );
};

export default FilterSidebar;