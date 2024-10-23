import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  outlets: [],
  status: "idle",
  error: null,
  outletDrawerOpen: false,
  selectedOutlet:null,
};

export const fetchOutlets = createAsyncThunk(
  "outlets/fetchOutlets",
  async () => {
    const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
    const path = "/outlet/getAllOutlet";
    const url = `${API_ENDPOINT}${path}`;

    const user = localStorage.getItem("customer");
    const token = user ? JSON.parse(user).accessToken : "";

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching outlets:", error);
      throw error;
    }
  }
);

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
    setSelectedOutlet:(state,action)=>{
      const outlet = action.payload;
      state.selectedOutlet=outlet?._id;
    }
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOutlets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOutlets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.outlets = action.payload;
      })
      .addCase(fetchOutlets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
    openOutletDrawer,
    closeOutletDrawer,
    getAllOutlets,
    setSelectedOutlet,
} = outletSlice.actions;

export default outletSlice.reducer;
