import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosinstance from "../helper/helper";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { notify } from "../helper/helper";

export default function EditProduct() {
  const { product_id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [loading,setloading] = useState(false)
  const [imagePreview, setImagePreview] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    try {
      const getProductDetails = async () => {
        const response = await axiosinstance.get(`/product/${product_id}`);
        if (response.data.success) {
          const productData = response.data.allProducts;

          if (productData) {
            setName(productData.name || "");
            setSlug(productData.slug || "");

            if (productData.thumbnail) {
              const baseUrl =
                import.meta.env.VITE_BASE_URL || "http://localhost:7000";
              const cleanBaseUrl = baseUrl.endsWith("/")
                ? baseUrl
                : `${baseUrl}/`;
              const cleanImagePath = productData.thumbnail.startsWith("/")
                ? productData.thumbnail.slice(1)
                : productData.thumbnail;

              setImagePreview(`${cleanBaseUrl}${cleanImagePath}`);
            }
          }
        }
      };

      if (product_id) {
        getProductDetails();
      }
    } catch (err) {
      console.error("API Fetch Error:", err);
      notify("Failed to load category default values.", false);
    } finally {
      setFetching(false);
    }
  }, [product_id]);

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

  async function submithandler(event) {
    event.preventDefault();
    setloading(true);
    try {
      const payload = new FormData();
      payload.append("name", name);
      payload.append("slug", slug);
      if (selectedFile) {
        payload.append("thumbnail", selectedFile);
      }

      const res = await axiosinstance.patch(
        `/product/editproduct/${product_id}`,
        payload,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (res.data.success) {
        notify(res?.data?.message || "Product updated!", true);
        clearform();
        navigate("/admin/products");
      }
    } catch (err) {
      console.error("AXIOS ERROR DETECTED:", err);

      notify(
        err?.response?.data?.message || err?.message || "Update dropped",
        false,
      );
    } finally {
      setloading(false);
    }
  }

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
          Edit Product
        </h2>

        <form
          onSubmit={submithandler}
          className="space-y-5 text-xs font-bold tracking-tight text-gray-700"
        >
          {/* Category Name Input */}
          <div>
            <label className="block text-[10px] uppercase font-black text-gray-400 mb-1">
              Product Name
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
              Product Image Node
            </label>
            <div className="flex items-center gap-4">
              {/* Default Current Image ya Nayi Choosed Image ka Preview yahan dikhega */}
              {imagePreview && (
                <div className="relative w-20 h-20 rounded-xl border border-gray-200 overflow-hidden shadow-sm flex-shrink-0 bg-gray-50">
                  <img
                    src={imagePreview}
                    className="w-full h-full object-cover"
                    alt="Category Reference Node"
                    onError={(e) => {
                      e.target.src = "https://placehold.co/150?text=NO+IMAGE";
                    }}
                  />
                </div>
              )}

              {/* File Uploader Input System Area */}
              <label className="flex flex-col flex-1 h-20 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-gray-50/50 transition items-center justify-center bg-gray-50/20">
                <div className="flex flex-col items-center justify-center text-center">
                  <p className="text-[11px] text-gray-400 font-medium">
                    {selectedFile
                      ? "📁 Swap Chosen Image"
                      : "📥 Change / Upload Image"}
                  </p>
                  {selectedFile && (
                    <p className="text-[9px] text-emerald-500 mt-0.5 max-w-[150px] truncate">
                      {selectedFile.name}
                    </p>
                  )}
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
              {loading
                ? "Syncing Modifications..."
                : "Save Category Modifications"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
