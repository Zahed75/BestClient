import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: {
    category: "",
    categoryName:"",
    brand: "",
    brandName:"",
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
      // state.filters.category = action.payload;
      const category = action.payload;
      state.filters.category = category === "All Categories" ? "" : category?._id;
      state.filters.categoryName = category === "All Categories" ? "" : category?.categoryName;
      state.pagination.currentPage = 1; // Reset page when filter changes
    },
    setBrandFilter: (state, action) => {
      const brand = action.payload;
      state.filters.brand = brand?._id ? brand._id :"";
      state.filters.brandName = brand?.name;
      state.pagination.currentPage = 1; 
    },
    setPriceRange: (state, action) => {
      state.filters.priceRange = action.payload;
      state.pagination.currentPage = 1; 
    },
    setSorting: (state, action) => {
      state.sorting = action.payload;
      state.pagination.currentPage = 1; 
    },
    setItemsPerPage: (state, action) => {
      state.pagination.itemsPerPage = action.payload;
      state.pagination.currentPage = 1; 
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
