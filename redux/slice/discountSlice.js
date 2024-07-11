import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  discounts: {}, // Initial state with discounts stored as an object
};

const discountSlice = createSlice({
  name: "discount",
  initialState,
  reducers: {
    addDiscount: (state, action) => {
      const discount = action.payload;
      state.discounts = discount;
    },
  },
});

export const { addDiscount, removeDiscount } = discountSlice.actions;

export default discountSlice.reducer;
