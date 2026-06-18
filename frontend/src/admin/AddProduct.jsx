import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { GetCategories, GetBrands } from "../api/AllApi";
import { notify } from "../helper/helper";
import axiosinstance from "../helper/helper";
import Select from "react-select";
import { Editor } from "primereact/editor";
import {
  Plus,
  ArrowLeft,
  Upload,
  DollarSign,
  Tag,
  FileText,
  Image as ImageIcon,
} from "lucide-react";

export default function AddProduct() {
  const navigate = useNavigate();

  // State
  const [categories, setCategories] = useState([]);
  // console.log(categories)
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  // States ke paas
  const [galleryImages, setGalleryImages] = useState([]);

  // Refs ke paas (Agar file input ko clear wagera karna ho baad me)
  const galleryInputRef = useRef(null);

  // Refs
  const nameRef = useRef(null);
  const slugRef = useRef(null);
  const originalPriceRef = useRef(null);
  const finalPriceRef = useRef(null);
  const discountPriceRef = useRef(null);
  const descriptionRef = useRef(null);
  const fileInputRef = useRef(null);

  // Simple local slug generator helper
  const createSlug = (text) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-");
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const [catRes, brandRes] = await Promise.all([
          GetCategories(),
          GetBrands(),
        ]);

        setCategories(
          catRes?.allCategories?.map((cat) => ({
            label: cat.name,
            value: cat._id,
          })) ||
            catRes?.allCategories?.map((cat) => ({
              label: cat.name,
              value: cat._id,
            })) ||
            [],
        );

        setBrands(
          brandRes?.allBrands?.map((brand) => ({
            label: brand.name,
            value: brand._id,
          })) ||
            brandRes?.brands?.map((brand) => ({
              label: brand.name,
              value: brand._id,
            })) ||
            [],
        );
      } catch (error) {
        console.error("Error fetching data:", error);
        notify("Failed to load initial form data", false);
      }
    };

    getData();
  }, []);

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    setGalleryImages(files);
  };

  function generateSlug() {
    const name = nameRef.current?.value || "";
    if (slugRef.current) {
      slugRef.current.value = createSlug(name);
    }
  }

  function clearForm() {
    if (nameRef.current) nameRef.current.value = "";
    if (slugRef.current) slugRef.current.value = "";
    if (originalPriceRef.current) originalPriceRef.current.value = "";
    if (finalPriceRef.current) finalPriceRef.current.value = "";
    if (discountPriceRef.current) discountPriceRef.current.value = "";
    if (descriptionRef.current) descriptionRef.current.value = "";
    if (fileInputRef.current) fileInputRef.current.value = "";
    setSelectedCategory(null);
    setSelectedBrand(null);
  }

  // 💸 CORRECTED PRICING: Calculation based on absolute flat value (MRP - Net Price)
  function calculateprice() {
    let op = Number(originalPriceRef.current?.value || 0);
    let fp = Number(finalPriceRef.current?.value || 0);

    if (op > 0 && fp > 0) {
      let dp = op - fp;
      if (discountPriceRef.current) {
        discountPriceRef.current.value = dp > 0 ? dp : 0;
      }
    }
  }

  function SubmitHandler(event) {
    event.preventDefault();

    // Frontend Alert Guard if dropdowns are empty
    if (!selectedCategory || !selectedBrand) {
      notify("Please select both Category and Brand elements", false);
      return;
    }

    setLoading(true);

    const payload = new FormData();
    payload.append("name", nameRef.current?.value || "");
    payload.append("slug", slugRef.current?.value || "");
    payload.append("long_description", descriptionRef.current?.value || ""); // Checked naming convention matching backend
    payload.append("original_price", originalPriceRef.current?.value || "0");
    payload.append("final_price", finalPriceRef.current?.value || "0");
    payload.append("discount_price", discountPriceRef.current?.value || "0");
    payload.append("category_id", selectedCategory?.value || "");
    payload.append("brand_id", selectedBrand?.value || ""); // Matching exact MERN schema case

    if (fileInputRef.current?.files[0]) {
      payload.append("thumbnail", fileInputRef.current.files[0]);
    } else {
      setLoading(false);
      notify("Please select a valid Thumbnail product image", false);
      return;
    }

    if (galleryImages.length > 0) {
      galleryImages.forEach((file) => {
        payload.append("images", file);
      });
    }

    axiosinstance
      .post("/product/create", payload)
      .then((res) => {
        if (res.data?.success) {
          notify(res?.data?.message || "Product created successfully", true);
          clearForm();
          navigate("/admin/Products");
        }
      })
      .catch((err) => {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Something went wrong during product entry pipeline";
        notify(message, false);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 antialiased">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-5 mb-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-xl text-gray-500"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div>
            <h3 className="font-black text-gray-900 text-md uppercase">
              INJECT PRODUCT RECOGNITION
            </h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">
              Register items into live database pipelines
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={SubmitHandler}
        className="grid grid-cols-1 md:grid-cols-12 gap-6"
      >
        {/* LEFT */}
        <div className="md:col-span-7 space-y-5">
          {/* Identity */}
          <div className="bg-white p-5 rounded-2xl border shadow-sm">
            <div className="flex items-center gap-2 border-b pb-2">
              <Tag className="w-4 h-4 text-gray-400" />
              <span className="text-[10px] font-black uppercase text-gray-500">
                Identity Registers
              </span>
            </div>

            <div className="grid gap-4 mt-4">
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400">
                  Product Name
                </label>
                <input
                  type="text"
                  ref={nameRef}
                  onChange={generateSlug}
                  placeholder="Organic Orange Juice"
                  className="w-full mt-1 px-4 py-2.5 bg-gray-50 border rounded-xl text-xs uppercase font-bold"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-gray-400">
                  System Slug Path
                </label>
                <input
                  type="text"
                  ref={slugRef}
                  readOnly
                  placeholder="slug-auto-generated"
                  className="w-full mt-1 px-4 py-2.5 bg-gray-100 border rounded-xl text-xs font-mono text-gray-500"
                />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white p-5 rounded-2xl border shadow-sm">
            <div className="flex items-center gap-2 border-b pb-2">
              <DollarSign className="w-4 h-4 text-gray-400" />
              <span className="text-[10px] font-black uppercase text-gray-500">
                Pricing Evaluation Matrix
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4">
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400">
                  M.R.P
                </label>
                <input
                  type="number"
                  ref={originalPriceRef}
                  onChange={calculateprice} // Added here as well
                  required
                  placeholder="249"
                  className="w-full mt-1 px-3 py-2.5 bg-gray-50 border rounded-xl text-xs font-bold"
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-gray-400">
                  Net Price
                </label>
                <input
                  type="number"
                  ref={finalPriceRef}
                  onChange={calculateprice}
                  required
                  placeholder="189"
                  className="w-full mt-1 px-3 py-2.5 bg-gray-50 border rounded-xl text-xs font-bold"
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-gray-400">
                  Discount
                </label>
                <input
                  type="number"
                  ref={discountPriceRef}
                  readOnly // Kept read-only for system auto sync calculations
                  placeholder="60"
                  className="w-full mt-1 px-3 py-2.5 bg-gray-100 border rounded-xl text-xs font-bold text-red-500"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white p-5 rounded-2xl border shadow-sm">
            <div className="flex items-center gap-2 border-b pb-2">
              <FileText className="w-4 h-4 text-gray-400" />
              <span className="text-[10px] font-black uppercase text-gray-500">
                Catalog Content Fields
              </span>
            </div>
            <textarea
              rows="5"
              ref={descriptionRef}
              required
              placeholder="Write product description..."
              className="w-full mt-4 p-4 bg-gray-50 border rounded-xl text-xs resize-none font-medium leading-relaxed"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="md:col-span-5 space-y-5">
          {/* Category & Brand mapped with react-select */}
          <div className="bg-white p-5 rounded-2xl border shadow-sm">
            <div className="flex items-center gap-2 border-b pb-2">
              <Plus className="w-4 h-4 text-gray-400" />
              <span className="text-[10px] font-black uppercase text-gray-500">
                Cluster Mappings
              </span>
            </div>

            <div className="space-y-4 mt-4">
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 mb-1 block">
                  Assign Category
                </label>
                <Select
                  options={categories}
                  value={selectedCategory}
                  onChange={setSelectedCategory}
                  placeholder="Choose Category"
                  className="text-xs"
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 mb-1 block">
                  Assign Brand
                </label>
                <Select
                  options={brands}
                  value={selectedBrand}
                  onChange={setSelectedBrand}
                  placeholder="Choose Brand"
                  className="text-xs"
                />
              </div>
            </div>
          </div>

          {/* Upload */}
          <div className="bg-white p-5 rounded-2xl border shadow-sm">
            <div className="flex items-center gap-2 border-b pb-2">
              <ImageIcon className="w-4 h-4 text-gray-400" />
              <span className="text-[10px] font-black uppercase text-gray-500">
                Thumbnail Upload
              </span>
            </div>

            <div className="mt-4">
              <label className="w-full h-48 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                <Upload className="w-8 h-8 text-gray-400" />
                <span className="text-[10px] font-black mt-2">
                  SELECT MEDIA BLOCK
                </span>
                <input
                  type="file"
                  ref={fileInputRef}
                  name="thumbnail"
                  className="hidden"
                  accept="image/*"
                  required
                />
              </label>
            </div>

            <div className="space-y-2 col-span-2">
              <label className="text-xs font-black uppercase text-gray-500 tracking-wider">
                Product Gallery Images (Multiple)
              </label>
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl p-4 bg-gray-50 hover:bg-gray-100 transition-all relative">
                <input
                  type="file"
                  ref={galleryInputRef}
                  onChange={handleGalleryChange}
                  multiple // ⚡ Yeh click karne par multiple files select karne dega
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="text-center space-y-1">
                  <p className="text-xs font-bold text-gray-600">
                    {galleryImages.length > 0
                      ? `🔥 ${galleryImages.length} Images Selected`
                      : "Click to upload product gallery"}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    PNG, JPG up to 5MB total
                  </p>
                </div>
              </div>

              {/* Mini Preview Blocks (Optional: Selected files ke naam dikhane ke liye) */}
              {galleryImages.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {galleryImages.map((file, index) => (
                    <span
                      key={index}
                      className="text-[9px] font-mono bg-white border border-gray-200 px-2 py-0.5 rounded-md text-gray-500 max-w-[120px] truncate"
                    >
                      {file.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3.5 rounded-xl text-[10px] font-black uppercase disabled:bg-gray-400 tracking-wider transition-colors active:scale-98 shadow-md"
          >
            {loading ? "COMMITTING..." : "COMMIT TO CLUSTER"}
          </button>
        </div>
      </form>
    </div>
  );
}
