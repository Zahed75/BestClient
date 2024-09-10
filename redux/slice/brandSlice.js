import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  brands: [], // Should be an array
  status: "idle",
  error: null,
};

export const fetchBrands = createAsyncThunk("brands/fetchBrands", async () => {
  const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
  const path = "/brand/getAll";
  const url = `${API_ENDPOINT}${path}`;

  const user = localStorage.getItem("user");
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
    const data = await response.json();

   

    return data;
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw error;
  }
});

const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.brands = action.payload.brands; // Ensure payload contains the correct data
        
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default brandSlice.reducer;
