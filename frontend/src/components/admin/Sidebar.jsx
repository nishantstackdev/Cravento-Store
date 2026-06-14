import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Layers, 
  Tag,
  ClipboardList, 
  Users, 
  Settings, 
  LogOut 
} from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  // Sidebar ke links ka array configuration
  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: ShoppingBag },
    { name: 'Categories', path: '/admin/categories', icon: Layers },
    { name: 'Brands', path: '/admin/brands', icon: Tag },
    { name: 'Orders', path: '/admin/orders', icon: ClipboardList },
    { name: 'Customers', path: '#', icon: Users },
    { name: 'Settings', path: '#', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col justify-between sticky top-0">
      <div>
        {/* Logo Section */}
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <Link to="/admin" className="text-xl font-bold tracking-tight text-gray-900 flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span>Craventa <span className="text-emerald-600 font-medium text-sm">Admin</span></span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            // Check active state mathematically based on route match
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700 shadow-sm shadow-emerald-100/50'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-600' : 'text-gray-400 group-hover:text-gray-900'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout Footer Area */}
      <div className="p-4 border-t border-gray-100">
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200">
          <LogOut className="w-5 h-5 text-red-500" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}