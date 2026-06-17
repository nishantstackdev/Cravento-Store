import React from 'react'
import { useState, useEffect } from 'react';
import { GetProducts } from '../api/AllApi';
import { Link } from 'react-router-dom';
import { Edit2, Trash2, Plus, ArrowUpDown, Eye } from 'lucide-react';
import { notify } from '../helper/helper';
import StatusBtn from '../components/admin/StatusBtn';
import ViewProductModal from '../components/admin/ViewProductModal';

export default function ManageProducts() {
  const [Products, setproducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        setLoading(true);
        const response = await GetProducts();
        const Productresponse = response?.allProducts;

        if (response && Productresponse) {
          setproducts(Productresponse);
        } else if (Array.isArray(response)) {
          setproducts(response);
        } else if (response && response.Products) {
          setproducts(response.Products);
        } else {
          setproducts([]); // 👈 Fallback: Agar kuch na mile toh empty array set karo, undefined nahi!
        }
      } catch (error) {
        console.error("Error fetching products into table:", error);
        setproducts([]); // 👈 Fallback: Error aane par bhi array empty rahe taaki page na fate
      } finally {
        setLoading(false);
      }


    };

    fetchTableData();
  }, []);

  // Eye button handler - Fixed variable reference
  const handleViewClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="w-full min-h-[40vh] flex items-center justify-center">
        <div className="text-[10px] font-black text-gray-400 tracking-widest uppercase animate-pulse">
          FETCHING CLUSTER DATA PIPELINE...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 antialiased">

      {/* 🔝 TABLE CONTROL HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-5 mb-6">
        <div>
          <h3 className="font-black text-gray-900 text-md tracking-tight uppercase">PRODUCT MATRIX</h3>
          <p className="text-[10px] font-bold text-gray-400 tracking-tight mt-0.5 uppercase">Manage product records, pricing, visibility, and warehouse stock</p>
        </div>
        {/* Link updated to AddProduct */}
        <Link to={"/admin/AddProduct"}>
          <button className="flex items-center justify-center gap-2 bg-[#008A5E] hover:bg-[#00734e] text-white text-[10px] font-black tracking-widest uppercase px-5 py-3 rounded-xl transition-all shadow-sm shadow-[#008A5E]/10 self-start sm:self-center">
            <Plus className="w-3.5 h-3.5" />
            <span>ADD NEW PRODUCT</span>
          </button>
        </Link>
      </div>

      {/* 📊 RESPONSIVE TABLE CONTAINER */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {Products.length === 0 ? (
            <div className="p-12 text-center text-xs font-black text-gray-400 uppercase tracking-wider">
              No live records found in database collection cluster.
            </div>
          ) : (
            <>
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50/70 border-b border-gray-100">
                  <tr className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                    <th className="py-4 px-6">IMAGE</th>
                    <th className="py-4 px-6 cursor-pointer hover:text-gray-600 transition-colors">
                      <div className="flex items-center gap-1.5">
                        <span>PRODUCT NAME</span>
                        <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th className="py-4 px-6">SLUG/ROUTE</th>
                    <th className="py-4 px-6">STATUS</th>
                    <th className="py-4 px-6 text-right">ACTIONS</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-50 text-xs font-bold tracking-tight text-gray-700">
                  {Products.map((cat) => (
                    <tr key={cat._id} className="hover:bg-gray-50/50 transition-colors border-b border-gray-100 last:border-0">

                      {/* COLUMN 1: IMAGE AVATAR */}
                      <td className="py-4 px-6 whitespace-nowrap align-middle">
                        <div className="relative w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden flex items-center justify-center shadow-sm">
                          <img
                            src={cat.thumbnail && cat.thumbnail.startsWith('http') ? cat.thumbnail : `http://localhost:7000${cat.thumbnail}`}
                            alt={cat.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = "https://placehold.co/150?text=NO+IMAGE";
                            }}
                          />
                        </div>
                      </td>

                      {/* COLUMN 2: NAME */}
                      <td className="py-4 px-6 whitespace-nowrap align-middle">
                        <div className="font-black text-gray-900 uppercase tracking-wide">
                          {cat.name}
                        </div>
                        <div className="text-[9px] text-gray-400 font-mono mt-0.5 select-all">
                          {cat._id}
                        </div>
                      </td>

                      {/* COLUMN 3: SLUG */}
                      <td className="py-4 px-6 whitespace-nowrap font-mono text-gray-500 text-[11px] align-middle">
                        /{cat.slug}
                      </td>

                      {/* COLUMN 4: STATUS */}
                      <td className="py-4 px-6 whitespace-nowrap align-middle">
                        <div className="flex items-center gap-2">
                          <StatusBtn
                            value={cat.status}
                            id={cat._id}
                            field="status"
                            endpoint="Product"
                          />
                        </div>
                      </td>

                      {/* COLUMN 5: ACTIONS */}
                      <td className="py-4 px-6 whitespace-nowrap text-right align-middle">
                        <div className="flex items-center justify-end gap-2">

                          {/* 👁️ EYE BUTTON - FIXED LOGIC (cat passed instead of prod) */}
                          <button
                            onClick={() => handleViewClick(cat)}
                            className="p-2 text-blue-600 hover:bg-blue-50 border border-blue-50 rounded-xl transition-all shadow-sm flex items-center justify-center"
                            title="View Product"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {/* 📝 EDIT BUTTON */}
                          <Link to={`/admin/EditProduct/${cat._id}`}>
                            <button title="Edit Product" className="p-2 text-emerald-600 hover:text-emerald-700 border border-emerald-50 hover:bg-emerald-50/50 rounded-xl transition-all shadow-sm">
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                          </Link>

                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>

              {/* MODAL MOUNTED SAFELY OUTSIDE */}
              {/* ManageProducts.jsx ke bilkul bottom me jahan modal hai, use isse badlo */}
              {isModalOpen && selectedProduct && (
                <ViewProductModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  product={Array.isArray(Products) ? Products.find((p) => p?._id === selectedProduct?._id) : selectedProduct}
                />
              )}
            </>
          )}
        </div>

        <div className="bg-gray-50/40 px-6 py-3 border-t border-gray-100 flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider">
          <span>Total Records: {Products.length} Entries</span>
          <span>Live Sync Status: Active Cluster Connected</span>
        </div>

      </div>
    </div>
  )
}