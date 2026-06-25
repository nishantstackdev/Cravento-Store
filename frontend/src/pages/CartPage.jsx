import React from 'react';

export default function CartPage() {
  // Static dummy data representing items in the cart
  const cartItems = [
    {
      id: 1,
      name: "Fresh Premium Banana Robusta",
      price: 40,
      originalPrice: 50,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&auto=format&fit=crop&q=60",
      spec: "500g (Approx. 3-4 pcs)"
    },
    {
      id: 2,
      name: "Farmer Live Plant Grape Fruit Black Grapes",
      price: 299,
      originalPrice: 499,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1537084642907-629340c7e59c?w=500&auto=format&fit=crop&q=60",
      spec: "Grafted Hybrid Live Plant"
    }
  ];

  return (
    <div className="bg-neutral-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {cartItems.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-2xl border border-neutral-200 p-4 sm:p-6 shadow-xs flex flex-col sm:flex-row justify-between gap-6"
              >
                {/* Product Image & Details */}
                <div className="flex gap-4 sm:gap-6">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-neutral-800 line-clamp-1">{item.name}</h3>
                      <p className="text-xs text-neutral-400 mt-1">{item.spec}</p>
                    </div>
                    {/* Price Tag for Mobile Display */}
                    <div className="sm:hidden mt-2 flex items-baseline gap-2">
                      <span className="text-base font-extrabold text-emerald-600">₹{item.price}</span>
                      <span className="text-xs text-neutral-400 line-through">₹{item.originalPrice}</span>
                    </div>
                    {/* Static Action Buttons */}
                    <button className="text-left text-xs font-semibold text-red-500 hover:text-red-600 mt-2 w-max">
                      Remove
                    </button>
                  </div>
                </div>

                {/* Pricing & Static Quantity Control */}
                <div className="flex sm:flex-col justify-between sm:items-end items-center shrink-0 border-t sm:border-t-0 pt-4 sm:pt-0 border-neutral-100">
                  {/* Price Tag for Desktop */}
                  <div className="hidden sm:flex flex-col items-end">
                    <span className="text-lg font-extrabold text-emerald-600">₹{item.price}</span>
                    <span className="text-xs text-neutral-400 line-through">₹{item.originalPrice}</span>
                  </div>

                  {/* Static Quantity Selector Wrapper */}
                  <div className="flex items-center border border-neutral-200 rounded-xl bg-neutral-50 p-1">
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-500 hover:bg-white text-sm font-bold transition-all">
                      -
                    </button>
                    <span className="w-10 text-center text-sm font-bold text-neutral-800">
                      {item.quantity}
                    </span>
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-500 hover:bg-white text-sm font-bold transition-all">
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Order Summary Summary Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs sticky top-6">
              <h2 className="text-lg font-bold text-neutral-800 mb-6">Order Summary</h2>
              
              <div className="flex flex-col gap-4 text-sm border-b border-neutral-100 pb-4">
                <div className="flex justify-between text-neutral-500 font-medium">
                  <span>Price (3 items)</span>
                  <span>₹379</span>
                </div>
                <div className="flex justify-between text-neutral-500 font-medium">
                  <span>Discount</span>
                  <span className="text-emerald-600">-₹20</span>
                </div>
                <div className="flex justify-between text-neutral-500 font-medium">
                  <span>Delivery Charges</span>
                  <span className="text-emerald-600">Free</span>
                </div>
              </div>

              <div className="flex justify-between items-center py-5">
                <span className="text-base font-bold text-neutral-800">Total Amount</span>
                <span className="text-xl font-black text-neutral-900">₹359</span>
              </div>

              <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition-colors shadow-sm tracking-wide uppercase">
                Proceed to Checkout
              </button>

              <p className="text-[11px] text-center text-neutral-400 mt-4 font-medium">
                Safe and Secure Payments. Easy returns. 100% Authentic products.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}