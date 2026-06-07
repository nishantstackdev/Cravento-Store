import React from 'react';
import { 
  TrendingUp, 
  ShoppingBag, 
  DollarSign, 
  Boxes, 
  Search, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  Percent 
} from 'lucide-react';

export default function Dashboard() {
  const stats = [
    {
      title: "Total Sells",
      value: "12,463",
      percentage: "+12.5%",
      icon: TrendingUp,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
      sparkColor: "bg-emerald-500"
    },
    {
      title: "Orders Value",
      value: "$78,596",
      percentage: "+8.2%",
      icon: DollarSign,
      color: "bg-violet-50 text-violet-600 border-violet-100",
      sparkColor: "bg-violet-500"
    },
    {
      title: "Daily Orders",
      value: "95,789",
      percentage: "-3.1%",
      icon: ShoppingBag,
      color: "bg-amber-50 text-amber-600 border-amber-100",
      sparkColor: "bg-amber-500"
    },
    {
      title: "Daily Revenue",
      value: "$41,954",
      percentage: "+18.4%",
      icon: Percent,
      color: "bg-rose-50 text-rose-600 border-rose-100",
      sparkColor: "bg-rose-500"
    },
  ];

  const orders = [
    {
      product: "Creative Plants",
      id: "#ORD-95420",
      date: "20 Sep - 03.00AM",
      price: "$637.50",
      status: "Success",
      img: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=80&q=80"
    },
    {
      product: "Sticky Calendar",
      id: "#ORD-84121",
      date: "12 Mar - 08.12AM",
      price: "$637.50",
      status: "Waiting",
      img: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=80&q=80"
    },
    {
      product: "Crystal Mug",
      id: "#ORD-36425",
      date: "16 Feb - 10.00AM",
      price: "$637.50",
      status: "Success",
      img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=80&q=80"
    },
    {
      product: "Motion Table Lamp",
      id: "#ORD-10992",
      date: "10 Jun - 12.30AM",
      price: "$637.50",
      status: "Canceled",
      img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=80&q=80"
    },
  ];

  const customers = [
    { name: "Junsung Park", email: "junsung@example.com", initial: "JP", bg: "bg-emerald-100 text-emerald-700" },
    { name: "Yongjae Choi", email: "yongjae@example.com", initial: "YC", bg: "bg-violet-100 text-violet-700" },
    { name: "Seonil Jong", email: "seonil@example.com", initial: "SJ", bg: "bg-amber-100 text-amber-700" },
    { name: "Joohee Min", email: "joohee@example.com", initial: "JM", bg: "bg-rose-100 text-rose-700" },
    { name: "Sojung Kim", email: "sojung@example.com", initial: "SK", bg: "bg-cyan-100 text-cyan-700" },
  ];

  const sellers = [
    { name: "Gary Waters", product: "Clothes", sold: 650, price: "$37.50", earning: "$24,375", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80" },
    { name: "Edwin Hegan", product: "Shoes", sold: 956, price: "$24.75", earning: "$23,661", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=80&q=80" },
    { name: "Aaron Hegan", product: "Electronics", sold: 348, price: "$104.50", earning: "$36,402", avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=80&q=80" },
    { name: "Ralph Waters", product: "Mobile", sold: 100, price: "$150.25", earning: "$15,025", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=80&q=80" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* 📊 SECTION 1: TOP KPI METRICS CARDS */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-xs font-semibold tracking-wider text-gray-400 uppercase">{item.title}</p>
                  <h3 className="text-2xl font-bold text-gray-800 tracking-tight">{item.value}</h3>
                </div>
                <div className={`p-3 rounded-xl border ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              {/* Fake Micro Sparkline Wave */}
              <div className="mt-6 flex items-center justify-between">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-lg ${item.percentage.startsWith('+') ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                  {item.percentage}
                </span>
                <div className="flex items-end space-x-0.5 h-6 w-24">
                  {[40, 70, 55, 85, 45, 90, 65, 100].map((h, i) => (
                    <div key={i} className={`w-full rounded-t-sm opacity-60 ${item.sparkColor}`} style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 📈 SECTION 2: ORDERS & SALES BAR CHARTS */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Recent Orders Table Component */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-6 gap-4 border-b border-gray-50">
            <div>
              <h3 className="font-bold text-gray-800 text-lg">Recent Orders</h3>
              <p className="text-xs text-gray-400 mt-0.5">Real-time incoming product checkout streams</p>
            </div>
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                placeholder="Search transaction..."
                className="bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-emerald-500 focus:bg-white w-full sm:w-48 transition-all"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="p-4">Product Info</th>
                  <th className="p-4">Order Date</th>
                  <th className="p-4">Price</th>
                  <th className="p-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                {orders.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 flex items-center space-x-3">
                      <img src={item.img} alt={item.product} className="w-10 h-10 rounded-xl object-cover border border-gray-100" />
                      <div>
                        <p className="font-semibold text-gray-800">{item.product}</p>
                        <p className="text-xs text-gray-400 font-medium">{item.id}</p>
                      </div>
                    </td>
                    <td className="p-4 text-gray-500 font-medium text-xs">{item.date}</td>
                    <td className="p-4 font-bold text-gray-800">{item.price}</td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center space-x-1.5 rounded-xl px-2.5 py-1 text-xs font-semibold tracking-wide ${
                        item.status === "Success" ? "bg-emerald-50 text-emerald-700" :
                        item.status === "Waiting" ? "bg-amber-50 text-amber-700" : "bg-rose-50 text-rose-700"
                      }`}>
                        {item.status === "Success" && <CheckCircle2 className="w-3.5 h-3.5" />}
                        {item.status === "Waiting" && <Clock className="w-3.5 h-3.5" />}
                        {item.status === "Canceled" && <XCircle className="w-3.5 h-3.5" />}
                        <span>{item.status}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sales Overview Advanced Layout */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-gray-800 text-lg">Sales Overview</h3>
            <p className="text-xs text-gray-400 mt-0.5">Monthly revenue statistics breakdown</p>
          </div>

          <div className="mt-8 flex h-52 items-end justify-between gap-2.5 px-2">
            {[70, 85, 45, 100, 60, 80, 55, 84, 40, 92, 75, 88].map((height, i) => (
              <div key={i} className="group relative flex-1 flex flex-col items-center h-full justify-end">
                {/* Tooltip Hover Bubble */}
                <span className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-[10px] px-1.5 py-0.5 rounded shadow font-bold z-10">
                  {height}%
                </span>
                <div 
                  className="w-full rounded-t-lg bg-gradient-to-t from-cyan-500 to-cyan-400 group-hover:from-emerald-500 group-hover:to-emerald-400 transition-all duration-300" 
                  style={{ height: `${height}%` }} 
                />
              </div>
            ))}
          </div>
          
          <div className="mt-4 border-t border-gray-50 pt-4 flex justify-between text-[11px] font-bold text-gray-400 uppercase tracking-wider px-1">
            <span>Jan</span><span>Apr</span><span>Aug</span><span>Dec</span>
          </div>
        </div>
      </div>

      {/* 👥 SECTION 3: RECENT CUSTOMERS & DONUT SEGMENTS */}
      <div className="grid gap-6 lg:grid-cols-12">
        
        {/* Recent Customers */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-800 text-lg">Recent Customers</h3>
          <p className="text-xs text-gray-400 mt-0.5 border-b border-gray-50 pb-3">New buyer acquisitions</p>
          <div className="mt-4 space-y-3.5">
            {customers.map((customer, i) => (
              <div key={i} className="flex items-center justify-between group p-1 rounded-xl hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-xl font-bold flex items-center justify-center shadow-sm ${customer.bg}`}>
                    {customer.initial}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{customer.name}</p>
                    <p className="text-xs text-gray-400">{customer.email}</p>
                  </div>
                </div>
                <button className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue By Category Segment */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-gray-800 text-lg">Revenue By Category</h3>
            <p className="text-xs text-gray-400 mt-0.5">Top performing inventory segments</p>
          </div>

          <div className="flex justify-center py-4">
            <div className="relative h-40 w-40 rounded-full border-[18px] border-slate-100 flex items-center justify-center ring-8 ring-cyan-500/10">
              {/* Fake nested colored slice border simulator wrapper */}
              <div className="absolute inset-[-18px] rounded-full border-[18px] border-transparent border-t-cyan-500 border-r-violet-400 rotate-45 pointer-events-none" />
              <div className="text-center">
                <h4 className="text-xl font-extrabold text-gray-800 tracking-tight">Grocery</h4>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mt-0.5">480 Sold</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs font-bold text-gray-500 border-t border-gray-50 pt-4">
            <div className="flex items-center space-x-2"><span className="w-2.5 h-2.5 rounded bg-cyan-500 inline-block" /><span>Fruits & Veg</span></div>
            <div className="flex items-center space-x-2"><span className="w-2.5 h-2.5 rounded bg-violet-400 inline-block" /><span>Beverages</span></div>
            <div className="flex items-center space-x-2"><span className="w-2.5 h-2.5 rounded bg-amber-400 inline-block" /><span>Dairy Items</span></div>
            <div className="flex items-center space-x-2"><span className="w-2.5 h-2.5 rounded bg-rose-400 inline-block" /><span>Snacks Pack</span></div>
          </div>
        </div>

        {/* Custom Progress/Map Bars Wrapper */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-gray-800 text-lg">User Logistics</h3>
            <p className="text-xs text-gray-400 mt-0.5">Traffic sources by region volume</p>
          </div>

          <div className="space-y-4 my-auto">
            {[
              { region: 'Jaipur Urban', percentage: '65%', color: 'bg-emerald-500' },
              { region: 'Delhi NCR', percentage: '45%', color: 'bg-violet-500' },
              { region: 'Mumbai Metro', percentage: '30%', color: 'bg-amber-500' }
            ].map((reg, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-gray-600">
                  <span>{reg.region}</span>
                  <span>{reg.percentage}</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div className={`h-full rounded-full ${reg.color}`} style={{ width: reg.percentage }} />
                </div>
              </div>
            ))}
          </div>

          <div className="h-24 rounded-xl bg-slate-50 border border-dashed border-gray-200 flex items-center justify-center text-xs font-semibold text-gray-400 tracking-wide uppercase">
            Regional Tracker Map Active
          </div>
        </div>
      </div>

      {/* 🎖️ SECTION 4: TOP SELLER RANKINGS */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-6 gap-4 border-b border-gray-50">
          <div>
            <h3 className="font-bold text-gray-800 text-lg">Top Merchant Sellers Of The Month</h3>
            <p className="text-xs text-gray-400 mt-0.5">Highest grossing supply line vendors</p>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              placeholder="Search vendor..."
              className="bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-emerald-500 focus:bg-white w-full sm:w-48 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/70 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="p-4">Seller Merchant</th>
                <th className="p-4">Primary Category</th>
                <th className="p-4">Units Sold</th>
                <th className="p-4">Avg Base Price</th>
                <th className="p-4">Gross Earnings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {sellers.map((seller, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 flex items-center space-x-3">
                    <img src={seller.avatar} alt={seller.name} className="w-9 h-9 rounded-xl object-cover" />
                    <span className="font-bold text-gray-800">{seller.name}</span>
                  </td>
                  <td className="p-4"><span className="bg-gray-100 text-gray-700 font-medium text-xs px-2.5 py-1 rounded-lg">{seller.product}</span></td>
                  <td className="p-4 font-semibold text-gray-600">{seller.sold} pcs</td>
                  <td className="p-4 text-gray-500 font-medium">{seller.price}</td>
                  <td className="p-4 font-extrabold text-emerald-600">{seller.earning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}