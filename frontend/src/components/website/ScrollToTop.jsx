import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  // 🧭 Yeh hook current URL/route ka exact path track karta hai
  const { pathname } = useLocation();

  useEffect(() => {
    // ⚡ Jaise hi pathname badlega, page smoothly top par slide karega
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Agar instant chahiye toh 'auto' kar sakte ho
    });
  }, [pathname]);

  return null; // Isme koi HTML render nahi karni, ye sirf ek logical service hai
};

export default ScrollToTop;