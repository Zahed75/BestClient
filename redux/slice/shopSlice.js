import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: {
    category: "",
    brand: "",
    priceRange: [0, 543200],
  },
  pagination: {
    currentPage: 1,
    itemsPerPage: 9,
  },
  sorting: "default", // default, pricehtl, pricelth
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setCategoryFilter: (state, action) => {
      state.filters.category = action.payload;
      state.pagination.currentPage = 1; // Reset page when filter changes
    },
    setBrandFilter: (state, action) => {
      state.filters.brand = action.payload;
      state.pagination.currentPage = 1; // Reset page when filter changes
    },
    setPriceRange: (state, action) => {
      state.filters.priceRange = action.payload;
      state.pagination.currentPage = 1; // Reset page when filter changes
    },
    setSorting: (state, action) => {
      state.sorting = action.payload;
      state.pagination.currentPage = 1; // Reset page when sorting changes
    },
    setItemsPerPage: (state, action) => {
      state.pagination.itemsPerPage = action.payload;
      state.pagination.currentPage = 1; // Reset page when items per page changes
    },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
  },
});

export const {
  setCategoryFilter,
  setBrandFilter,
  setPriceRange,
  setSorting,
  setItemsPerPage,
  setCurrentPage,
} = shopSlice.actions;

export default shopSlice.reducer;
