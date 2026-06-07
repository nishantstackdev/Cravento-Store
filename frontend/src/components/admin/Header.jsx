import React from 'react';
import { Search, Bell, Moon, Maximize, MessageSquare } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-40">
      
      {/* Search Input Box */}
      <div className="relative w-96">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </span>
        <input
          type="text"
          placeholder="Search Mafi dashboard..."
          className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* Right Utility Icons & Profile */}
      <div className="flex items-center space-x-4">
        {/* Action Icon Buttons */}
        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-50 transition-colors">
          <Maximize className="w-5 h-5" />
        </button>
        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-50 transition-colors">
          <Moon className="w-5 h-5" />
        </button>
        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-50 transition-colors relative">
          <MessageSquare className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-500"></span>
        </button>
        
        {/* Notification Dropdown Button Trigger */}
        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-50 transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500"></span>
        </button>

        {/* Divider vertical divider rule */}
        <div className="h-6 w-[1px] bg-gray-200"></div>

        {/* Admin Profile User Info Panel */}
        <div className="flex items-center space-x-3 cursor-pointer group">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors">Nishant Mathur</p>
            <p className="text-xs font-medium text-gray-400">Admin Owner</p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
            alt="Admin Profile Avatar"
            className="w-10 h-10 rounded-xl object-cover ring-2 ring-transparent group-hover:ring-emerald-500/20 transition-all"
          />
        </div>
      </div>

    </header>
  );
}