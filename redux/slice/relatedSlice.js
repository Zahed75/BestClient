import { createSlice } from "@reduxjs/toolkit";

const getInitialRelatedState = () => {
  if (typeof window !== "undefined") {
    const storedRelatedProducts = localStorage.getItem("relatedProducts");
    return storedRelatedProducts ? JSON.parse(storedRelatedProducts) : [];
  }
  return [];
};

const initialRelatedState = {
  items: getInitialRelatedState(),
};

const saveRelatedToLocalStorage = (items) => {
  localStorage.setItem("relatedProducts", JSON.stringify(items));
};

const relatedProductsSlice = createSlice({
  name: "relatedProducts",
  initialState: initialRelatedState,
  reducers: {
    addRelatedProduct: (state, action) => {
      const product = action.payload;
      const existingProduct = state.items.find(
        (item) => item._id === product._id
      );
      if (!existingProduct) {
        if (state.items.length >= 4) {
          state.items.shift();
        }
        state.items.push({ ...product });
      } else {
        state.items = state.items.filter((item) => item._id !== product._id);
        state.items.push({ ...product });
      }
      saveRelatedToLocalStorage(state.items);
    },
    clearRelatedProducts: (state) => {
      state.items = [];
      saveRelatedToLocalStorage(state.items);
    },
  },
});

export const { addRelatedProduct, clearRelatedProducts } =
  relatedProductsSlice.actions;

export default relatedProductsSlice.reducer;
