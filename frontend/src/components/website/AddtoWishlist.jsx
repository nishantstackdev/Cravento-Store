import React from "react";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../../redux/features/WishlistSlice";
import { Heart } from "lucide-react";

export default function AddtoWishlist({ product }) {
    console.log(product)
  const dispatch = useDispatch();

  const BASE_URL =
    import.meta.env.VITE_BASE_URL || "http://localhost:7000";

  const handleWishlist = () => {
    if (!product) return;

    dispatch(
      addToWishlist({
        id: product._id,
        name: product.name,
        original_price: product.original_price,
        final_price: product.final_price,
        discount_price: product.discount_price,
        thumbnail: `${BASE_URL}${product.thumbnail}`,
        stock: product.stock,
        qty: 1,
      })
    );
  };

  return (
    <button
      type="button"
      onClick={handleWishlist}
      className="cursor-pointer absolute top-2.5 right-2.5 p-2 bg-white/80 backdrop-blur-md border border-white/40 rounded-full shadow-sm z-30 hover:scale-105 transition"
    >
      <Heart size={16} strokeWidth={2.5} />
    </button>
  );
}