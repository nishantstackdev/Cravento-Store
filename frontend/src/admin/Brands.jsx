import React, { useState, useEffect } from "react";
import { Edit2, Plus, ArrowUpDown, Search, Layers, RefreshCw, AlertCircle } from "lucide-react";
import { GetBrands, DeletebrandApi } from "../api/AllApi";
import { Link } from "react-router-dom";
import { notify } from "../helper/helper";
import DeleteButton from "../components/admin/Deletebutton";
import StatusBtn from "../components/admin/StatusBtn";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // asc | desc

  // Dynamic Base URL Configuration
  const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:7000";

  const fetchTableData = async () => {
    try {
      setLoading(true);
      const response = await GetBrands();

      let fetchedData = [];
      if (response?.allBrands) {
        fetchedData = response.allBrands;
      } else if (Array.isArray(response)) {
        fetchedData = response;
      }

      setBrands(fetchedData);
      setFilteredBrands(fetchedData);
    } catch (error) {
      console.error("Error fetching brands:", error);
      notify("Failed to sync brand data stream.", false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  // 🔍 Real-time Frontend Search Filter Pipeline
  useEffect(() => {
    const data = brands.filter((b) =>
      b.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b._id?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBrands(data);
  }, [searchTerm, brands]);

  // 🔀 Alphabetical Sort Handler
  const toggleSort = () => {
    const order = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(order);
    const sorted = [...filteredBrands].sort((a, b) => {
      return order === "asc" 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    });
    setFilteredBrands(sorted);
  };

  const handleDeleteSuccess = (deletedId) => {
    setBrands((prev) => prev.filter((item) => item._id !== deletedId));
    // notify("Brand resource successfully de-allocated.", true);
  };

  // 💀 Modern Table Skeleton Component
  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6 space-y-4 animate-pulse">
        <div className="h-12 bg-gray-200/60 rounded-xl w-1/3 mb-8" />
        <div className="h-64 bg-gray-100 rounded-2xl border border-gray-200/50" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 space-y-6 antialiased selection:bg-emerald-500/10">
      
      {/* HEADER NODES */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-600" />
            <h3 className="font-black text-md uppercase tracking-tight text-gray-900">
              BRAND MATRIX
            </h3>
          </div>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
            Manage manufacturer entities and index distribution visibility
          </p>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={fetchTableData}
            className="p-3 border border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition cursor-pointer"
            title="Force Sync Pipeline"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <Link to="/admin/AddBrand">
            <button className="flex items-center gap-2 bg-[#008A5E] hover:bg-[#00744f] text-white px-5 py-3 rounded-xl text-[10px] font-black tracking-widest transition shadow-sm shadow-emerald-700/10 cursor-pointer">
              <Plus className="w-4 h-4 stroke-[3]" />
              ADD NEW BRAND
            </button>
          </Link>
        </div>
      </div>


      {/* MAIN SYSTEM DATA TABLE */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {filteredBrands.length === 0 ? (
            <div className="p-16 text-center flex flex-col items-center justify-center space-y-3">
              <div className="p-3 bg-gray-50 rounded-full border border-gray-100">
                <AlertCircle className="w-5 h-5 text-gray-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800 uppercase tracking-wide">No Brand Elements Found</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">The current filters return no index records inside local collection.</p>
              </div>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-100 text-[10px] font-black uppercase tracking-wider text-gray-400 select-none">
                  <th className="p-4 w-24 text-center">Logo Node</th>
                  <th className="p-4 cursor-pointer hover:bg-gray-100/50 transition" onClick={toggleSort}>
                    <div className="flex items-center gap-1.5">
                      BRAND DETAILS
                      <ArrowUpDown className="w-3 h-3 text-gray-400 stroke-[2.5]" />
                    </div>
                  </th>
                  <th className="p-4">Slug Node</th>
                  <th className="p-4 w-44">Runtime States</th>
                  <th className="p-4 text-right w-32">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 text-xs font-bold text-gray-700">
                {filteredBrands.map((brand) => (
                  <tr key={brand._id} className="hover:bg-gray-50/50 transition group">
                    
                    {/* IMAGE NODE */}
                    <td className="p-4 text-center">
                      <div className="w-11 h-11 rounded-lg overflow-hidden border border-gray-200 bg-gray-50/50 mx-auto transition group-hover:scale-105 shadow-sm">
                        <img
                          src={
                            brand.image
                              ? brand.image.startsWith("http") ? brand.image : `${BASE_URL}${brand.image}`
                              : "https://placehold.co/150?text=NO+IMAGE"
                          }
                          alt={brand.name}
                          className="w-full h-full object-contain p-1"
                          onError={(e) => {
                            e.target.src = "https://placehold.co/150?text=ERR";
                          }}
                        />
                      </div>
                    </td>

                    {/* IDENTITY DATA */}
                    <td className="p-4">
                      <div className="font-black text-gray-900 tracking-tight text-sm">
                        {brand.name}
                      </div>
                      <div className="text-[10px] text-gray-400 font-mono tracking-wider font-medium mt-0.5 select-all selection:bg-gray-200">
                        {brand._id}
                      </div>
                    </td>

                    {/* PATH SLUG */}
                    <td className="p-4 font-mono font-medium text-gray-500 text-[11px]">
                      <span className="text-gray-300">/</span>
                      {brand.slug}
                    </td>

                    {/* RUNTIME BEHAVIOR STATUSES */}
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1.5 scale-90 origin-left">
                        <StatusBtn
                          value={brand.status}
                          id={brand._id}
                          field="status"
                          endpoint="brand"
                        />
                        <StatusBtn
                          value={brand.is_top}
                          id={brand._id}
                          field="is_top"
                          endpoint="brand"
                        />
                      </div>
                    </td>

                    {/* PIPELINE ACTIONS */}
                    <td className="p-4">
                      <div className="flex justify-end items-center gap-1.5">
                        <Link to={`/admin/brands/EditBrand/${brand._id}`}>
                          <button className="p-2 border border-gray-200 hover:border-blue-300 hover:bg-blue-50/30 text-gray-500 hover:text-blue-600 rounded-lg transition shadow-sm cursor-pointer">
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                        </Link>

                        <DeleteButton
                          id={brand._id}
                          itemName={brand.name}
                          apiFunction={DeletebrandApi}
                          onSuccess={handleDeleteSuccess}
                        />
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* METRICS SUMMARY FOOTER */}
        <div className="p-4 bg-gray-50/50 border-t border-gray-100 text-[10px] font-black uppercase tracking-wider text-gray-400 flex justify-between select-none">
          <span>
            Total Matched Index Records: {filteredBrands.length} / {brands.length}
          </span>
          <span className="flex items-center gap-1 text-emerald-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            Live Sync Cluster Active
          </span>
        </div>

      </div>
    </div>
  );
}