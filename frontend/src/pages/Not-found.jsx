import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search, ShoppingBag, HelpCircle } from 'lucide-react';

export default function Notfound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] bg-gray-50/50 flex items-center justify-center px-4 py-16 antialiased">
      <div className="max-w-xl w-full text-center space-y-8 bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-sm">
        
        {/* 🎨 LARGE STYLISH 404 BADGE */}
        <div className="relative inline-block">
          <h1 className="text-9xl font-black text-gray-200 tracking-tighter select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-[#008A5E] text-white text-xs font-black tracking-widest uppercase px-4 py-1.5 rounded-xl shadow-md shadow-[#008A5E]/20 animate-bounce">
              PAGE NOT FOUND
            </span>
          </div>
        </div>

        {/* 📝 CORE TYPOGRAPHY MESSAGE */}
        <div className="space-y-3">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight uppercase">
            HONESTLY, THIS PAGE IS EMPTY!
          </h2>
          <p className="text-xs font-bold text-gray-400 tracking-tight uppercase max-w-sm mx-auto leading-relaxed">
            The link you clicked might be broken, or the product catalog has been permanently moved to a new route.
          </p>
        </div>

        {/* 🔍 QUICK SEARCH BAR PASSTHROUGH */}
        <div className="max-w-md mx-auto flex border border-gray-200 rounded-xl bg-gray-50 overflow-hidden focus-within:border-[#008A5E] focus-within:bg-white transition-all">
          <input 
            type="text" 
            placeholder="Search alternative products..." 
            className="w-full px-4 py-3 text-xs font-bold tracking-wide bg-transparent focus:outline-none text-gray-800 placeholder-gray-400"
          />
          <button className="px-4 text-gray-400 hover:text-[#008A5E] transition-colors border-l border-gray-100 bg-white hover:bg-gray-50">
            <Search className="w-4 h-4" />
          </button>
        </div>

        {/* 🔗 HELP HELPFUL QUICK LINKS STRIP */}
        <div className="border-t border-b border-gray-100 py-4 max-w-md mx-auto grid grid-cols-3 gap-2 text-[10px] font-black text-gray-500 uppercase tracking-wider">
          <Link to="/products" className="hover:text-[#008A5E] flex items-center justify-center gap-1.5 transition-colors">
            <ShoppingBag className="w-3.5 h-3.5 text-[#008A5E]" /> <span>Our Shop</span>
          </Link>
          <span className="text-gray-200 text-center">|</span>
          <Link to="/help" className="hover:text-[#008A5E] flex items-center justify-center gap-1.5 transition-colors">
            <HelpCircle className="w-3.5 h-3.5 text-[#008A5E]" /> <span>Get Help</span>
          </Link>
        </div>

        {/* 🛠️ ACTION BUTTONS (RESPONSIVE FLEX) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          {/* Go Back Trigger */}
          <button 
            onClick={() => navigate(-1)}
            className="w-full sm:w-1/2 border border-gray-200 hover:border-gray-300 text-gray-700 text-xs font-black tracking-widest uppercase py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 bg-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>GO BACK</span>
          </button>

          {/* Home Route Button */}
          <Link 
            to="/" 
            className="w-full sm:w-1/2 bg-[#008A5E] hover:bg-[#00734e] text-white text-xs font-black tracking-widest uppercase py-3.5 rounded-xl transition-all shadow-sm shadow-[#008A5E]/20 flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>BACK TO HOME</span>
          </Link>
        </div>

      </div>
    </div>
  );
}