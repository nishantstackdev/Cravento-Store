import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

// CSS url() breaks on spaces/parentheses unless quoted + encoded (gallery filenames often have both)
const toCssBackgroundImage = (url) =>
  url ? `url("${encodeURI(url)}")` : "none";

const LG_BREAKPOINT = "(min-width: 1024px)";

const ProductImageZoom = ({ src, alt = "Product Image" }) => {
  const [zoomStyle, setZoomStyle] = useState({ display: "none" });
  const [isLgScreen, setIsLgScreen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia(LG_BREAKPOINT);
    const syncScreen = () => setIsLgScreen(mq.matches);
    syncScreen();
    mq.addEventListener("change", syncScreen);
    return () => mq.removeEventListener("change", syncScreen);
  }, []);

  useEffect(() => {
    if (!isLgScreen) {
      setZoomStyle({ display: "none" });
    }
  }, [isLgScreen]);

  // Sync background image instantly when src updates
  useEffect(() => {
    if (isLgScreen && zoomStyle.display === "block") {
      setZoomStyle((prev) => ({
        ...prev,
        backgroundImage: toCssBackgroundImage(src),
      }));
    }
  }, [src, isLgScreen]);

  const handleMouseMove = (e) => {
    if (!isLgScreen || !containerRef.current) return;

    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    
    // Accurate percentage coordinates matrix
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      display: "block",
      backgroundImage: toCssBackgroundImage(src),
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: "250%", // 👈 Zoom level thoda badhaya hai clear details ke liye
      position: "fixed",
      top: `${top + window.scrollY}px`,
      left: `${left + width + 24}px`, 
      width: `${width}px`,
      height: `${height}px`,
    });
  };

  const handleMouseLeave = () => {
    if (!isLgScreen) return;
    setZoomStyle({ display: "none" });
  };

  return (
    // ⚡ FIX: Parent ko full block width/height dekar standard binding di hai
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full flex items-center justify-center cursor-default lg:cursor-zoom-in relative overflow-hidden"
    >
      {/* ⚡ FIXED IMAGE STYLING: max-w/max-h ko hata kar absolute standard width par block kiya hai */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full max-w-full max-h-full object-contain mix-blend-multiply pointer-events-none transition-all duration-150"
        style={{
          // Engine-level image quality sharpening tricks
          imageRendering: "-webkit-optimize-contrast",
          backfaceVisibility: "hidden",
        }}
      />

      {/* 🔮 PORTAL MOUNTING ENGINE */}
      {isLgScreen && zoomStyle.display === "block" &&
        createPortal(
          <div
            style={zoomStyle}
            className="bg-white border border-neutral-100 shadow-[0_25px_70px_rgba(0,0,0,0.12)] rounded-3xl z-[999999] bg-no-repeat pointer-events-none hidden lg:block"
            
          />,
          document.body
        )}
    </div>
  );
};

export default ProductImageZoom;