import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, Plus, ArrowUpDown, Eye } from 'lucide-react';
import { GetCategories, DeleteCategoryApi } from '../api/AllApi';
import { Link } from 'react-router-dom';
import { notify } from '../helper/helper';
import DeleteButton from '../components/admin/Deletebutton';
import StatusBtn from '../components/admin/StatusBtn';

export default function CategoryTable() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        setLoading(true);
        const response = await GetCategories();
        const Categoryresponse = response.allCategories;

        if (response && Categoryresponse) {
          setCategories(Categoryresponse);
        } else if (Array.isArray(response)) {
          setCategories(response);
        } else if (response && response.categories) {
          setCategories(response.categories);
        }
      } catch (error) {
        console.error("Error fetching categories into table:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTableData();
  }, []);

  // 🗑️ 2. Fully Wired Async Delete Execution Layer
  const handleDelete = async (id, categoryName) => {
    // Premium dynamic confirm check sequence
    if (window.confirm(`ARE YOU SURE YOU WANT TO DELETE THE "${categoryName.toUpperCase()}" CATEGORY BLOCK?`)) {
      try {
        // Core network call to endpoint backend handler
        const response = await DeleteCategoryApi(id);

        if (response.success) {
          notify(response.message || "Data purged successfully.", true);

          // 🔄 UI Matrix Mutation: Filter layout node instantly
          setCategories((prevCategories) =>
            prevCategories.filter((cat) => cat._id !== id)
          );
        }
      } catch (error) {
        console.error("Purge operation dropped:", error);
        const errorMsg = error?.message || "Internal network pipe error during deletion.";
        notify(errorMsg, false);
      }
    }
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
          <h3 className="font-black text-gray-900 text-md tracking-tight uppercase">CATEGORY MATRIX</h3>
          <p className="text-[10px] font-bold text-gray-400 tracking-tight mt-0.5 uppercase">Manage system catalogs, visibility states, and database records</p>
        </div>
        <Link to={"/admin/AddCategory"}>
          <button className="flex items-center justify-center gap-2 bg-[#008A5E] hover:bg-[#00734e] text-white text-[10px] font-black tracking-widest uppercase px-5 py-3 rounded-xl transition-all shadow-sm shadow-[#008A5E]/10 self-start sm:self-center">
            <Plus className="w-3.5 h-3.5" />
            <span>ADD NEW CATEGORY</span>
          </button>
        </Link>
      </div>

      {/* 📊 RESPONSIVE TABLE CONTAINER */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {categories.length === 0 ? (
            <div className="p-12 text-center text-xs font-black text-gray-400 uppercase tracking-wider">
              No live records found in database collection cluster.
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50/70 border-b border-gray-100">
                <tr className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                  <th className="py-4 px-6">IMAGE</th>
                  <th className="py-4 px-6 cursor-pointer hover:text-gray-600 transition-colors">
                    <div className="flex items-center gap-1.5">
                      <span>CATEGORY NAME</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-4 px-6">SLUG/ROUTE</th>
                  <th className="py-4 px-6">STATUS</th>
                  <th className="py-4 px-6 text-right">ACTIONS</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50 text-xs font-bold tracking-tight text-gray-700">
                {categories.map((cat) => (
                  <tr key={cat._id} className="hover:bg-gray-50/50 transition-colors border-b border-gray-100 last:border-0">

                    {/* COLUMN 1: IMAGE AVATAR */}
                    <td className="py-4 px-6 whitespace-nowrap align-middle">
                      <div className="relative w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden flex items-center justify-center shadow-sm">
                        <img
                          src={cat.image && cat.image.startsWith('http') ? cat.image : `http://localhost:7000${cat.image}`}
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

                    {/* COLUMN 4: STATUS & FLAGS (Clean Flex Row Alignment) */}
                    <td className="py-4 px-6 whitespace-nowrap align-middle">
                      <div className="flex items-center gap-2">

                        {/* Visibility Badge */}
                        <StatusBtn value={cat.status}
                          id={cat._id}
                          field="status"
                          endpoint="category" />

                        {/* Top Banner Placement Badge */}
                        <StatusBtn value={cat.is_top}
                          id={cat._id}
                          field="is_top"
                          endpoint="category" />

                      </div>
                    </td>

                    {/* COLUMN 5: ACTIONS CONTROLS */}
                    <td className="py-4 px-6 whitespace-nowrap text-right align-middle">
                      <div className="flex items-center justify-end gap-2">
                        <Link to={`/admin/categories/EditCategory/${cat._id}`}>
                          <button title="Edit Category" className="p-2 text-blue-500 hover:text-blue-600 border border-blue-50 hover:bg-blue-50/50 rounded-xl transition-all shadow-sm">
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                        </Link>


                        <DeleteButton
                          id={cat._id}
                          itemName={cat.name}
                          apiFunction={DeleteCategoryApi}
                          onSuccess={(deletedId) => {
                            setCategories((prev) => prev.filter((item) => item._id !== deletedId));
                          }}
                        />
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="bg-gray-50/40 px-6 py-3 border-t border-gray-100 flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider">
          <span>Total Records: {categories.length} Entries</span>
          <span>Live Sync Status: Active Cluster Connected</span>
        </div>

      </div>
    </div>
  );
}