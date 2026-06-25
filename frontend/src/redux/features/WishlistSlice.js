import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  items: [],
  original_total: 0,
  final_total: 0
}

export const WishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, { payload }) => {
      const exists =
        state.items.find(
          item => item.id === payload.id
        );

      if (exists) return;

      state.original_total +=
        Number(payload.original_price);

      state.final_total +=
        Number(payload.final_price);

      state.items.push(payload);

      localStorage.setItem(
        "wishlist",
        JSON.stringify(state)
      );
    },
    removeWishlist: (state) => {
      state.original_total = 0
      state.final_total = 0
      state.items = []

      localStorage.removeItem("wishlist")
    },
    lsTowishlist: (state) => {
      const wishlist = JSON.parse(localStorage.getItem("wishlist"))
      if (wishlist) {
        state.items = wishlist.items
        state.original_total = Number(wishlist.original_price)
        state.final_total = Number(wishlist.final_price)
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToWishlist, lsTowishlist, removeWishlist } = WishlistSlice.actions

export default WishlistSlice.reducer