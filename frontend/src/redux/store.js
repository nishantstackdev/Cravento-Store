import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cartSlice";
import wishlistReducer from "./features/WishlistSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    wishlist: wishlistReducer,
  },
});

export default store;