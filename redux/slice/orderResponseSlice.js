import { createSlice } from '@reduxjs/toolkit';

const orderResponseSlice = createSlice({
  name: 'orderResponse',
  initialState: {},
  reducers: {
    setOrderResponse: (state, action) => {
      return action.payload;
    },
    clearOrderResponse: () => ({}), 
  },
});

export const { setOrderResponse, clearOrderResponse } = orderResponseSlice.actions;

export default orderResponseSlice.reducer;
