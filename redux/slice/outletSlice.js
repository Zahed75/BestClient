import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  outletDrawerOpen: false,
};

const outletSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openOutletDrawer: (state) => {
      state.outletDrawerOpen = true;
    },
    closeOutletDrawer: (state) => {
      state.outletDrawerOpen = false;
    },
  },
});

export const {
    openOutletDrawer,
    closeOutletDrawer,
} = outletSlice.actions;

export default outletSlice.reducer;
