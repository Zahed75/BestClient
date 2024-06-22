import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
  if (typeof window !== "undefined") {
    const storedWishlist = localStorage.getItem("wishlistItems");
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  }
  return [];
};

const initialState = {
  items: getInitialState(),
};

const saveToLocalStorage = (items) => {
  localStorage.setItem("wishlistItems", JSON.stringify(items));
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;
      const existingProduct = state.items.find(
        (item) => item._id === product._id
      );
      if (!existingProduct) {
        state.items.push({ ...product });
      }
      saveToLocalStorage(state.items);
    },
    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item._id !== productId);
      saveToLocalStorage(state.items);
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
