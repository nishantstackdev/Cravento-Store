import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/home/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { lsTocart } from "../../redux/features/cartSlice";
import { lsTowishlist } from "../../redux/features/WishlistSlice";

export default function Navbar() {
  const cart = useSelector((store) => store.cart);
  const wishlist = useSelector((store) => store.wishlist);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(lsTocart());
    dispatch(lsTowishlist());
  }, []);
  return (
    <header className="w-full font-sans text-sm sticky top-0 z-50 shadow-sm bg-white">
      <div className="bg-[#008A4B] text-white px-4 py-2 text-xs md:text-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          {/* Promo Message */}
          <div className="text-center sm:text-left font-medium">
            Free shipping world wide for all orders over $199{" "}
            <Link to="/" className="underline hover:text-gray-200 transition">
              Shop Now
            </Link>
          </div>

          {/* Top Right Links */}
          <div className="flex items-center gap-4 text-gray-100">
            <a href="#" className="hover:text-white transition">
              Track Order
            </a>
            <span className="text-emerald-600">|</span>
            <a href="#" className="hover:text-white transition">
              Help Center
            </a>
            <span className="text-emerald-600">|</span>

            {/* Language Selector */}
            <div className="flex items-center gap-1 cursor-pointer hover:text-white transition">
              <span className="inline-block w-4 h-3 bg-blue-900 border border-white relative overflow-hidden">
                {/* Simplified US Flag representation */}
                <div className="bg-red-600 h-1/2 w-full absolute top-0"></div>
                <div className="bg-blue-800 h-1/2 w-1/2 absolute top-0 left-0"></div>
              </span>
              <span>English</span>
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {/* Currency Selector */}
            <div className="flex items-center gap-1 cursor-pointer hover:text-white transition">
              <span>$ USD</span>
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* --- Main Header Area --- */}
      <div className="bg-white border-b border-gray-100 px-4 py-4 md:py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 lg:gap-6">
          {/* Brand Logo */}
          <Link to={"/"}>
            {/* Simple SVG icon representing the grocery basket */}

            <div className="w-[160px] text-[#008A4B] flex items-center justify-center">
              <img src={logo} className="w-full" alt="" />
            </div>
          </Link>

          {/* Search Bar Wrapper */}
          <div className="w-full md:flex-1 lg:max-w-2xl flex items-center bg-[#F5F5F5] rounded-md border border-gray-100 overflow-hidden">
            {/* Input Field */}
            <input
              type="text"
              placeholder="Search product here..."
              className="w-full bg-transparent px-4 py-2.5 text-gray-700 placeholder-gray-400 focus:outline-none"
            />
            {/* Search Button/Icon */}
            <button className="px-5 text-gray-700 hover:text-[#008A4B] transition">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>

          {/* Right Actions Block */}
          <div className="flex items-center justify-center md:justify-end gap-4 md:gap-5 lg:gap-8 w-full md:w-auto shrink-0">
            {/* Support Line */}
            <div className="hidden md:block text-left">
              <div className="text-xs text-gray-500">Need Help?</div>
              <div className="text-base font-semibold text-[#008A4B] tracking-wide">
                9876-543-210
              </div>
            </div>

            {/* Account Link */}
            <div className="flex items-center gap-2 cursor-pointer group">
              <svg
                className="w-7 h-7 text-gray-700 group-hover:text-[#008A4B] transition"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
              <div className="text-left text-xs leading-tight">
                <div className="text-gray-500">Log In</div>
                <div className="font-bold text-gray-800 group-hover:text-[#008A4B] transition">
                  Account
                </div>
              </div>
            </div>

            {/* Wishlist Icon */}
            <Link to={"/wishlist"}>
              <div className="relative cursor-pointer group">
                <svg
                  className="w-7 h-7 text-gray-700 group-hover:text-[#008A4B] transition"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
                <span className="absolute -top-1.5 -right-1.5 bg-[#008A4B] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlist.items.length || 0}
                </span>
              </div>
            </Link>

            {/* Cart Button */}
            <Link to={"/cart"}>
              <div className="flex items-center gap-2 cursor-pointer group">
                <div className="relative">
                  <svg
                    className="w-7 h-7 text-gray-700 group-hover:text-[#008A4B] transition"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                  <span className="absolute -top-1.5 -right-1.5 bg-[#008A4B] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cart.items.length || 0}
                  </span>
                </div>
                <div className="text-left text-xs leading-tight hidden sm:block">
                  <div className="font-bold text-gray-800 group-hover:text-[#008A4B] transition">
                    My Cart
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
