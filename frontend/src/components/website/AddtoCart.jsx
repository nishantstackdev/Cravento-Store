import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTocart, qtyChange } from "../../redux/features/cartSlice";

export default function AddtoCart({ product }) {
  const cart = useSelector((store) => store.cart);
  const cartItem = cart?.items.find((item) => item.id == product._id);
  const dispatcher = useDispatch();
  const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:7000";

  return (
    <div className="w-full pt-1">
  {cartItem ? (
    /* --- Quantity Counter Control Box --- */
    <div className="flex items-center justify-between border border-[#008A4B] rounded-xl bg-emerald-50/50 p-1 overflow-hidden h-[42px] transition-all">
      {/* Minus Button */}
      <button 
       onClick={()=>dispatcher(qtyChange({id:product._id,flag : "inc"}))}
        className="w-10 h-full flex items-center justify-center text-[#008A4B] hover:bg-[#008A4B] hover:text-white rounded-lg text-lg font-bold transition-all duration-150 active:scale-90"
      >
        +
      </button>

      {/* Quantity Display */}
      <h2 className="text-base font-bold text-neutral-800 select-none px-4">
        {cartItem.qty || 0}
      </h2>

      {/* Plus Button */}
      <button 
         onClick={()=>dispatcher(qtyChange({id:product._id,flag : "dsc"}))}
        className="w-10 h-full flex items-center justify-center text-[#008A4B] hover:bg-[#008A4B] hover:text-white rounded-lg text-lg font-bold transition-all duration-150 active:scale-90"
      >
        -
      </button>
    </div>
  ) : (
    
    <button
      onClick={() => {
        dispatcher(
          addTocart({
            name: product?.name,
            original_price: product?.original_price,
            final_price: product?.final_price,
            discount_price: product?.discount_price,
            id: product?._id,
            thumbnail: `${BASE_URL}${product?.thumbnail}`,
            stock: product?.stock,
            qty: 1,
          }),
        );
      }}
      disabled={!product?.stock}
      className={`w-full h-[42px] px-4 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 border shadow-xs
        ${product?.stock 
          ? "bg-[#008A4B] text-white border-[#008A4B] hover:bg-[#00703C] hover:border-[#00703C] active:scale-[0.98]" 
          : "bg-neutral-100 text-neutral-400 border-neutral-200 cursor-not-allowed"
        }`}
    >
      {product?.stock ? (
        <div className="flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          <span>Add to Cart</span>
        </div>
      ) : (
        "Out of Stock"
      )}
    </button>
  )}
</div>
  );
}
