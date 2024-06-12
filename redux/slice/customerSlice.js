import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
  if (typeof window !== "undefined") {
    const storedCustomer = localStorage.getItem("customer");
    return storedCustomer ? JSON.parse(storedCustomer) : {};
  }
  return {};
};

const initialState = {
  items: getInitialState(),
};

const saveToLocalStorage = (items) => {
  localStorage.setItem("customer", JSON.stringify(items));
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    addCustomerInfo: (state, action) => {
      const customer = action.payload;
      state.items = customer;
      saveToLocalStorage(state.items);
    },
  },
});

export const { addCustomerInfo } = customerSlice.actions;

export default customerSlice.reducer;
