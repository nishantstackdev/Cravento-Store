import React from 'react'
import subposter1 from "../assets/home/sub-banner-5.jpg"
import subposter2 from "../assets/home/sub-banner-6.jpg"
 
export default function Subposters() {
  return (
    <div className="max-w-7xl mx-auto px-3 py-4">
    <div className="grid grid-cols-1  lg:grid-cols-2 gap-4">
  
      {/* Banner 1 */}
      <div className="relative overflow-hidden rounded-md group cursor-pointer">
        <img
          src={subposter1}
          alt="banner1"
          className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
        />
  
        <div className="absolute top-1/2 right-3 -translate-y-1/2">
          <p className="text-sm uppercase tracking-wide text-gray-700">
            100% ALL FRESH ITEMS
          </p>
  
          <h2 className="text-xl md:text-3xl font-semibold mt-2 leading-tight">
            Once Upon A Farm <br />
            Overnight Oats
          </h2>
  
          <button className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-md font-medium">
            SHOP NOW
          </button>
        </div>
      </div>
  
      {/* Banner 2 */}
      <div className="relative overflow-hidden rounded-md group cursor-pointer">
        <img
          src={subposter2}
          alt="banner2"
          className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
        />
  
        <div className="absolute top-1/2 right-3 -translate-y-1/2">
          <p className="text-sm uppercase tracking-wide">
            SALE! 20% OFF
          </p>
  
          <h2 className="text-xl md:text-3xl font-semibold mt-2 leading-tight">
            Undefined Tool <br />
            IRadix 2700
          </h2>
  
          <button className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-md font-medium">
            SHOP NOW
          </button>
        </div>
      </div>
  
    </div>
  </div>
  )
}
