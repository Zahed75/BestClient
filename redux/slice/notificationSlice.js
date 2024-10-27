import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVisible: false,
  message: "",
  timeoutId: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: (state, action) => {
      state.isVisible = true;
      state.message = action.payload;
    },
    hideNotification: (state) => {
      state.isVisible = false;
      state.message = "";
      if (state.timeoutId) {
        clearTimeout(state.timeoutId);
        state.timeoutId = null;
      }
    },
    setTimeoutId: (state, action) => {
      state.timeoutId = action.payload;
    },
  },
});

export const { showNotification, hideNotification, setTimeoutId } =
  notificationSlice.actions;

export const showNotificationWithTimeout = (message) => (dispatch) => {
  dispatch(showNotification(message));
  console.log("Notification shown", message);

  const timeoutId = setTimeout(() => {
    dispatch(hideNotification());
    console.log("Notification hidden");
  }, 4000);

  dispatch(setTimeoutId(timeoutId));
};

export default notificationSlice.reducer;
