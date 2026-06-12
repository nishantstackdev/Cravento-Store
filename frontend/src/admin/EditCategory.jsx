import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosinstance, { notify, slugCreate } from '../helper/helper'; //
import axios from 'axios';

export default function EditCategory() {
  const { category_id } = useParams(); 
  const navigate = useNavigate();
  
  
  const [loading, setloading] = useState(false);
  const [fetching, setFetching] = useState(true); 

  
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [imagePreview, setImagePreview] = useState(""); 
  const [selectedFile, setSelectedFile] = useState(null); 

  
  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        setFetching(true);
        
        const res = await axiosinstance.get(`/category/${category_id}`);
        
        if (res.data.success) {
          
          const catData = res.data.allcategories; 
          
          if (catData) {
            setName(catData.name || "");
            setSlug(catData.slug || "");
            
            
            if (catData.image) {
              const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:7000"
              const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
              const cleanImagePath = catData.image.startsWith('/') ? catData.image.slice(1) : catData.image;
              
              setImagePreview(`${cleanBaseUrl}${cleanImagePath}`);
            }
          }
        }
      } catch (err) {
        console.error("API Fetch Error:", err);
        notify("Failed to load category default values.", false);
      } finally {
        setFetching(false);
      }
    };

    if (category_id) getCategoryDetails();
  }, [category_id]);

  
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setSlug(slugCreate(value)); 
  };

  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (selectedFile && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview); 
      }
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file)); 
    }
  };

  
  const clearform = () => {
    setName("");
    setSlug("");
    setSelectedFile(null);
    setImagePreview("");
  };

  
  const submithandler = async (event) => {
  event.preventDefault();
  setloading(true);

  try {
    const payload = new FormData();
    payload.append("name", name);
    payload.append("slug", slug);
    
    if (selectedFile) {
      payload.append("image", selectedFile);
    }
    

    
    const res = await axiosinstance.patch(`/category/editcategory/${category_id}`, payload, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    if (res.data.success) {
      notify(res?.data?.message || "Category updated!", true);
      clearform();
      navigate("/admin/categories");
    }
  } catch (err) {
    console.error("AXIOS ERROR DETECTED:", err);
    
    notify(err?.response?.data?.message || err?.message || "Update dropped", false);
  } finally {
    setloading(false);
  }
};

  
  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-sm font-black text-gray-400 tracking-widest uppercase animate-pulse">
          Loading original category data node...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white shadow-md rounded-2xl p-6 border border-gray-100">
        <h2 className="text-xl font-black text-gray-900 tracking-tight uppercase mb-6">
          Edit Category
        </h2>

        <form onSubmit={submithandler} className="space-y-5 text-xs font-bold tracking-tight text-gray-700">
          
          {/* Category Name Input */}
          <div>
            <label className="block text-[10px] uppercase font-black text-gray-400 mb-1">
              Category Name
            </label>
            <input
              value={name}
              onChange={handleNameChange}
              type="text"
              placeholder="Enter category name"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50/50"
              required
            />
          </div>

          {/* Slug Input */}
          <div>
            <label className="block text-[10px] uppercase font-black text-gray-400 mb-1">
              Slug
            </label>
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              type="text"
              placeholder="Enter slug"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono bg-gray-50/50"
              required
            />
          </div>

          {/* Image Node Wrapper */}
          <div>
            <label className="block text-[10px] uppercase font-black text-gray-400 mb-2">
              Category Image Node
            </label>
            <div className="flex items-center gap-4">
              
              {/* Default Current Image ya Nayi Choosed Image ka Preview yahan dikhega */}
              {imagePreview && (
                <div className="relative w-20 h-20 rounded-xl border border-gray-200 overflow-hidden shadow-sm flex-shrink-0 bg-gray-50">
                  <img 
                    src={imagePreview} 
                    className="w-full h-full object-cover" 
                    alt="Category Reference Node" 
                    onError={(e) => { e.target.src = "https://placehold.co/150?text=NO+IMAGE"; }}
                  />
                </div>
              )}

              {/* File Uploader Input System Area */}
              <label className="flex flex-col flex-1 h-20 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-gray-50/50 transition items-center justify-center bg-gray-50/20">
                <div className="flex flex-col items-center justify-center text-center">
                  <p className="text-[11px] text-gray-400 font-medium">
                    {selectedFile ? "📁 Swap Chosen Image" : "📥 Change / Upload Image"}
                  </p>
                  {selectedFile && <p className="text-[9px] text-emerald-500 mt-0.5 max-w-[150px] truncate">{selectedFile.name}</p>}
                </div>
                <input 
                  type="file" 
                  name="image" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>

          {/* Form CTA Actions Controls */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={clearform}
              type="button"
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 py-3 rounded-xl transition text-[10px] font-black uppercase tracking-widest cursor-pointer"
            >
              Reset Form
            </button>
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition text-[10px] font-black uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-md shadow-blue-600/10"
            >
              {loading ? "Syncing Modifications..." : "Save Category Modifications"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}