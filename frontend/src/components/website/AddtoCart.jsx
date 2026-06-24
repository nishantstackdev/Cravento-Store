import React from 'react';

export default function AddtoCart({ stock }) {
  // ⚡ Availability condition tracker
  const isAvailable = stock === true || stock > 0;

  return (
    <div className="w-full pt-1">
      {isAvailable ? (
        /* 🟩 CASE 1: AVAILABLE (Exact UI representation as per your reference snapshot) */
        <button 
          onClick={(e) => {
            e.preventDefault();
            console.log("Cart Linked successfully");
          }}
          className="w-full bg-[#009663] text-white font-extrabold text-[11px] md:text-[12px] uppercase tracking-wider py-2 px-4 rounded-[22px] transition-all duration-300 hover:bg-[#007d52] active:scale-[0.98] cursor-pointer text-center leading-tight shadow-xs flex flex-col items-center justify-center min-h-[40px]"
        >
          <span>ADD TO</span>
          <span className="mt-0.5">CART</span>
        </button>
      ) : (
        /* 🟥 CASE 2: UNAVAILABLE / OUT OF STOCK STATE */
        <button 
          disabled
          className="w-full bg-neutral-100 text-neutral-400 font-extrabold text-[11px] md:text-[12px] uppercase tracking-wider py-4 px-4 rounded-[22px] border border-neutral-200/60 cursor-not-allowed text-center leading-tight flex flex-col items-center justify-center min-h-[52px] select-none"
        >
          <span>UNAVAILABLE</span>
        </button>
      )}
    </div>
  );
}