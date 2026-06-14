import React, { useRef, useState } from 'react';
import { FolderPlus, Image, Type, Link2, ToggleLeft, ArrowLeft, X } from 'lucide-react';
import axiosinstance from '../helper/helper';
import { useNavigate, Link } from 'react-router-dom';
import { notify } from '../helper/helper';
import { slugCreate } from '../helper/helper';

export default function AddBrand() {
  const navigate = useNavigate();
  const nameRef = useRef(null);
  const slugRef = useRef(null);
  const statusRef = useRef(null); // 🔥 Added status ref mapping
  const imageInputRef = useRef(null);

  // States for enhanced User Experience
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  function generateSlug() {
        const name = nameRef.current.value;
        const slug = slugCreate(name);
        slugRef.current.value = slug;
    }

  // 2. 🖼️ Live Image Preview Handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB Validation check
        notify("Image size should be less than 2MB", false);
        e.target.value = "";
        return;
      }
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Reset Image Picker UI
  const clearImage = () => {
    setImagePreview(null);
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  // 3. 🚀 Form Submission Handler
  function SubmmitHandler(event) {
    event.preventDefault();
    
    const brandName = nameRef.current.value.trim();
    const brandSlug = slugRef.current.value.trim();
    const brandStatus = statusRef.current.checked;
    const brandImage = imageInputRef.current.files[0];

    // Frontend validation guard layers
    if (!brandName || !brandSlug) {
      notify("Metadata inputs cannot be empty", false);
      return;
    }
    if (!brandImage) {
      notify("Please upload a category cover image asset", false);
      return;
    }

    setIsSubmitting(true); // Loading tracker layer activated

    const formData = new FormData();
    formData.append("name", brandName); // Unified layout aesthetics
    formData.append("slug", brandSlug);
    formData.append("status", brandStatus); // 🔥 Missing status payload injected
    formData.append("image", brandImage);

    axiosinstance.post("/brand/create", formData)
      .then((res) => {
        if (res.data.success) {
          notify(res?.data?.message || "Category injected successfully", true);
          navigate("/admin/brands");
        }
      })
      .catch((err) => {
        const message = err?.response?.data?.message || err?.message || "Something went wrong";
        notify(message, false);
      })
      .finally(() => {
        setIsSubmitting(false); // Release blocker layer
      });
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 antialiased">

      {/* BACK BUTTON */}
      <Link 
        to="/admin/categories" 
        className="inline-flex items-center gap-1 text-[10px] font-black text-gray-400 hover:text-gray-600 transition-colors uppercase tracking-wider mb-4"
      >
        <ArrowLeft className="w-3 h-3" />
        <span>Back to Matrix</span>
      </Link>

      {/* HEADER */}
      <div className="border-b border-gray-100 pb-5 mb-6">
        <h3 className="font-black text-gray-900 text-md tracking-tight uppercase">
          CREATE NEW BRAND
        </h3>
        <p className="text-[10px] font-bold text-gray-400 tracking-tight mt-0.5 uppercase">
          Inject binary asset streams and catalog metadata into the core database cluster
        </p>
      </div>

      {/* FORM */}
      <form onSubmit={SubmmitHandler} className="space-y-5 bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">

        {/* CATEGORY NAME */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-[10px] font-black text-gray-400 uppercase tracking-wider">
            <Type className="w-3 h-3" />
            Brand Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            ref={nameRef}
            onChange={generateSlug} 
            placeholder="E.G. FRESH BAKERY"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold tracking-tight text-gray-700  focus:outline-none focus:border-[#008A5E] focus:bg-white transition-all"
          />
        </div>

        {/* Brand SLUG */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-[10px] font-black text-gray-400 uppercase tracking-wider">
            <Link2 className="w-3 h-3" />
            URL Slug / Route <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            ref={slugRef}
            placeholder="E.G. fresh-bakery"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-mono tracking-tight text-gray-500 lowercase focus:outline-none focus:border-[#008A5E] focus:bg-white transition-all"
          />
        </div>

        {/* IMAGE UPLOAD WITH PREMIUM LIVE PREVIEW CONTAINER */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-[10px] font-black text-gray-400 uppercase tracking-wider">
            <Image className="w-3 h-3" />
            Brand Cover Image <span className="text-rose-500">*</span>
          </label>

          <div className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-100 rounded-xl relative">
            <div className="relative w-16 h-16 rounded-xl bg-white border border-gray-100 overflow-hidden flex items-center justify-center flex-shrink-0 shadow-sm">
              {imagePreview ? (
                <>
                  <img src={imagePreview} alt="Live preview" className="w-full h-full object-cover" />
                  <button 
                    type="button" 
                    onClick={clearImage}
                    className="absolute top-0.5 right-0.5 p-0.5 bg-rose-500 text-white rounded-md hover:bg-rose-600 transition-colors"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </>
              ) : (
                <Image className="w-5 h-5 text-gray-300" />
              )}
            </div>

            <input
              type="file"
              name='image'
              ref={imageInputRef} // ✨ Linked input reference for file checking
              onChange={handleImageChange} // 🔥 Preview rendering trigger
              accept="image/*"
              className="text-xs font-bold text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-wider file:bg-[#008A5E]/10 file:text-[#008A5E] hover:file:bg-[#008A5E]/20 file:transition-all cursor-pointer w-full"
            />
          </div>
        </div>

        {/* STATUS TOGGLE */}
        <div className="flex items-center justify-between p-4 bg-gray-50/50 border border-gray-100 rounded-xl">
          <div className="flex items-center gap-1.5">
            <ToggleLeft className="w-4 h-4 text-gray-400" />
            <div>
              <div className="text-[10px] font-black text-gray-800 uppercase tracking-wider">
                Visibility Status
              </div>
              <div className="text-[9px] font-bold text-gray-400 uppercase tracking-tight">
                Toggle database live visibility state
              </div>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              ref={statusRef} // ✨ Ref linked mapping
              defaultChecked
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-gray-200 rounded-full peer-checked:after:translate-x-full peer-checked:bg-[#008A5E] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
          </label>
        </div>

        {/* SUBMIT BUTTON WITH DISABLE LOADER PREVENTER */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex items-center justify-center gap-2 bg-[#008A5E] hover:bg-[#00734e] text-white text-[10px] font-black tracking-widest uppercase py-3.5 rounded-xl transition-all shadow-sm shadow-[#008A5E]/10 mt-2 ${isSubmitting ? 'opacity-60 cursor-not-allowed animate-pulse' : ''}`}
        >
          <FolderPlus className="w-4 h-4" />
          <span>{isSubmitting ? "INJECTING CLUSTER DATA..." : "EXECUTE CATEGORY INJECTION"}</span>
        </button>

      </form>

    </div>
  );
}