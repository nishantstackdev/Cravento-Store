import React from 'react';
import { Link } from 'react-router-dom';

export default function WishlistPage() {
  // Static dummy data representing items saved in the wishlist
  const wishlistItems = [
    {
      id: 1,
      name: "Fresh Premium Banana Robusta",
      price: 40,
      originalPrice: 50,
      stock: true,
      image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&auto=format&fit=crop&q=60",
      spec: "500g (Approx. 3-4 pcs)"
    },
    {
      id: 2,
      name: "Farmer Live Plant Grape Fruit Black Grapes",
      price: 299,
      originalPrice: 499,
      stock: true,
      image: "https://images.unsplash.com/photo-1537084642907-629340c7e59c?w=500&auto=format&fit=crop&q=60",
      spec: "Grafted Hybrid Live Plant"
    },
    {
      id: 3,
      name: "Saffola Active Refined Cooking Oil",
      price: 175,
      originalPrice: 210,
      stock: false, // Testing out of stock UI layout
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=60",
      spec: "1 Litre Pouch"
    }
  ];

  return (
    <div className="bg-neutral-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 pb-5 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">My Wishlist</h1>
            <p className="text-sm text-neutral-500 mt-1">You have {wishlistItems.length} items saved in your wishlist</p>
          </div>
          <Link 
            to="/products" 
            className="text-sm font-semibold text-[#008A4B] hover:text-[#00703C] transition-colors hidden sm:block"
          >
            Continue Shopping &rarr;
          </Link>
        </div>

        {/* Wishlist Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs flex flex-col group relative"
            >
              {/* Delete / Remove Action Button */}
              <button 
                className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-xs p-2 rounded-full text-neutral-400 hover:text-red-500 hover:bg-white shadow-xs transition-all border border-neutral-100"
                title="Remove from Wishlist"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Product Image Wrapper */}
              <div className="w-full aspect-square bg-neutral-100 relative overflow-hidden border-b border-neutral-100 shrink-0">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Stock Status Badge for UI clarity */}
                {!item.stock && (
                  <span className="absolute bottom-3 left-3 bg-neutral-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-1 rounded-md tracking-wider uppercase">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Product Info Content Block */}
              <div className="p-5 flex flex-col justify-between flex-1 gap-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-neutral-400 tracking-wider uppercase">{item.spec}</span>
                  <h3 className="text-base font-bold text-neutral-800 line-clamp-2 min-h-[44px]">
                    {item.name}
                  </h3>
                  
                  {/* Pricing Fields */}
                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-lg font-black text-emerald-600">₹{item.price}</span>
                    <span className="text-xs text-neutral-400 line-through font-medium">₹{item.originalPrice}</span>
                  </div>
                </div>

                {/* Call-to-Action Add-to-Cart Action Button */}
                <button
                  disabled={!item.stock}
                  className={`w-full py-2.5 px-4 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 border shadow-xs flex items-center justify-center gap-2
                    ${item.stock 
                      ? "bg-[#008A4B] text-white border-[#008A4B] hover:bg-[#00703C] hover:border-[#00703C] active:scale-[0.98]" 
                      : "bg-neutral-100 text-neutral-400 border-neutral-200 cursor-not-allowed"
                    }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}