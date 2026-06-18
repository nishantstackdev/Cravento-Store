import React from "react";
import { X, Flame, Home, Star, Percent, FileText, ToggleLeft, Activity } from "lucide-react";
import StatusBtn from "./StatusBtn"; 

export default function ViewProductModal({ isOpen, onClose, product }) {
  // Defensive logic checking
  if (!isOpen || !product) return null;

  // Saare objects fields ke liye fallbacks safe placeholders set kar diye
  const _id = product?._id || "";
  const name = product?.name || "UNNAMED RECORD";
  const slug = product?.slug || "no-route";
  const long_description = product?.long_description || "";
  const original_price = product?.original_price || 0;
  const discount_price = product?.discount_price || 0;
  const final_price = product?.final_price || 0;
  const is_popular = !!product?.is_popular;
  const is_home = !!product?.is_home;
  const is_top = !!product?.is_top;
  const thumbnail = product?.thumbnail || "";
  const status = !!product?.status;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] overflow-hidden max-h-[90vh] flex flex-col border border-gray-100 animate-slideUp">
        
        {/* HEADER */}
        <div className="px-6 py-5 bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white flex justify-between items-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent)] pointer-events-none" />
          <div>
            <span className="text-[9px] font-black tracking-widest text-[#008A5E] bg-[#008A5E]/10 px-2.5 py-1 rounded-md uppercase">SYSTEM CONTROL PANEL</span>
            <h3 className="text-lg font-black tracking-tight mt-1 truncate max-w-lg uppercase">PRODUCT REGISTRY METRICS</h3>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-200 group">
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 overflow-y-auto space-y-6 flex-grow bg-gray-50/50">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Image Box */}
            <div className="md:col-span-5 flex flex-col gap-2">
              <div className="relative w-full h-72 bg-white border border-gray-200/60 rounded-2xl overflow-hidden flex items-center justify-center shadow-inner">
                <img 
                  src={thumbnail && thumbnail.startsWith('http') ? thumbnail : `http://localhost:7000${thumbnail}`} 
                  alt={name} 
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = "https://placehold.co/400?text=IMAGE+NOT+FOUND"; }}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-4">
              <div>
                <h4 className="text-2xl font-black text-gray-900 tracking-tight leading-tight uppercase">{name}</h4>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[10px] font-mono text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md select-all">SLUG: /{slug}</span>
                </div>
              </div>

              {/* 📊 MATRIX SWITCH CONTROLS */}
              <div className="space-y-2">
                <p className="text-[9px] font-black text-gray-400 tracking-wider uppercase flex items-center gap-1">
                  <ToggleLeft className="w-3 h-3 text-gray-500" /> Live Matrix Controls
                </p>
                
                <div className="grid grid-cols-3 gap-3 bg-white p-3.5 rounded-2xl border border-gray-200/70 shadow-sm divide-x divide-gray-100">
                  
                  {/* STATUS */}
                  <div className="flex flex-col justify-between items-start pl-1 space-y-1">
                    <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
                      <Activity className="w-2.5 h-2.5 text-emerald-500" /> System Visibility
                    </span>
                    <div className="pt-1">
                      {_id && <StatusBtn value={is_home} id={_id} field="is_home" endpoint="product" />}
                    </div>
                  </div>

                  {/* IS_TOP */}
                  <div className="flex flex-col justify-between items-start pl-3 space-y-1">
                    <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
                      <Star className="w-2.5 h-2.5 text-purple-500" /> Featured Block
                    </span>
                    <div className="pt-1">
                      {_id && <StatusBtn value={is_top} id={_id} field="is_top" endpoint="product" />}
                    </div>
                  </div>

                  {/* IS_POPULAR */}
                  <div className="flex flex-col justify-between items-start pl-3 space-y-1">
                    <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
                      <Flame className="w-2.5 h-2.5 text-red-500" /> Popular Deal
                    </span>
                    <div className="pt-1">
                      {_id && <StatusBtn value={is_popular} id={_id} field="is_popular" endpoint="product" />}
                    </div>
                  </div>

                </div>
              </div>

              {/* PRICING */}
              <div className="bg-white p-4 rounded-2xl border border-gray-200/70 shadow-sm grid grid-cols-3 gap-2 divide-x divide-gray-100">
                <div className="text-center flex flex-col justify-center">
                  <span className="text-[9px] font-black text-gray-400 tracking-wider uppercase block mb-1">M.R.P</span>
                  <span className="text-sm font-bold text-gray-400 line-through">₹{original_price.toLocaleString("en-IN")}</span>
                </div>
                <div className="text-center flex flex-col justify-center px-2">
                  <span className="text-[9px] font-black text-gray-400 tracking-wider uppercase block mb-1">DISCOUNT</span>
                  <span className="text-sm font-extrabold text-red-500">₹{discount_price.toLocaleString("en-IN")}</span>
                </div>
                <div className="text-center flex flex-col justify-center bg-emerald-50/50 rounded-xl py-1">
                  <span className="text-[9px] font-black text-emerald-700 tracking-wider uppercase block mb-0.5">NET PRICE</span>
                  <span className="text-xl font-black text-emerald-600">₹{final_price.toLocaleString("en-IN")}</span>
                </div>
              </div>

            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200/70 shadow-sm space-y-2">
            <div className="flex items-center gap-1.5 border-b border-gray-100 pb-2">
              <FileText className="w-4 h-4 text-gray-500" />
              <h5 className="text-[10px] font-black text-gray-800 uppercase tracking-wider">Product Description</h5>
            </div>
            <div className="text-gray-600 text-xs font-medium leading-relaxed max-h-48 overflow-y-auto whitespace-pre-line pr-2 select-text">
              {long_description || "No description loaded."}
            </div>
          </div>

        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 bg-white border-t border-gray-100 flex justify-end">
          <button onClick={onClose} className="bg-gray-900 hover:bg-black text-white text-[10px] font-black tracking-widest uppercase px-6 py-3 rounded-xl transition-all duration-200 shadow-md">
            DISMISS VIEWPORT
          </button>
        </div>

      </div>
    </div>
  );
}