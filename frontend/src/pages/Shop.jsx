import React, { useCallback, useState } from "react";
import FilterSidebar from "../components/website/FilterSidebar";
import Pagination from "../components/website/Pagination";
import ProductGrid from "../components/website/ProductGrid";

const PRODUCTS_PER_PAGE = 8;

const Shop = () => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [paginationMeta, setPaginationMeta] = useState({ pages: 1, total: 0 });

  const handlePaginationChange = useCallback((meta) => {
    setPaginationMeta(meta);
  }, []);

  return (
    <div className="w-full min-h-screen bg-neutral-50/50 py-8 px-4 max-w-7xl mx-auto">
      
      {/* 📱 Header Row with Mobile Filter Button */}
      <div className="flex items-center justify-between border-b border-neutral-200/60 pb-4 mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-neutral-900 tracking-tight">Shop Collection</h1>
          <p className="text-xs text-neutral-400 font-medium">Discover elite trending items</p>
        </div>

        {/* ⚡ Filter Icon Button: Visible on Mobile/Tablet, Hidden on Desktop */}
        <button 
          onClick={() => setIsMobileFilterOpen(true)}
          className="lg:hidden flex items-center space-x-2 bg-white border border-neutral-200 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-neutral-700 shadow-sm active:scale-95 transition-all cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
          </svg>
          <span>Filters</span>
        </button>
      </div>

      {/* 🚀 Main Core Layout Wrapper */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* 1. FILTER SIDEBAR COMPONENT (Pass states for mobile responsiveness) */}
        <FilterSidebar 
          isOpen={isMobileFilterOpen} 
          setIsOpen={setIsMobileFilterOpen} 
        />

        {/* 2. PRODUCTS GRID & PAGINATION AREA */}
        <div className="lg:col-span-9 space-y-8">
          {/* Products Matrix */}
          <ProductGrid onPaginationChange={handlePaginationChange} />

          <Pagination
            totalPages={paginationMeta.pages}
            totalProducts={paginationMeta.total}
            perPage={PRODUCTS_PER_PAGE}
          />
        </div>

      </div>
    </div>
  );
};

export default Shop;