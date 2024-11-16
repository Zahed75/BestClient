import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  outlets: [],
  productAvailability: [],
  status: "idle",
  error: null,
  outletDrawerOpen: false,
  areaDrawerOpen: false,
  selectedOutlet:null,
  selectedProductOutlet:null,
  selectCity:"",
  selectArea:"Enter Area",
  selectProductArea:"Enter Area",
  productName:"",
  productId:"",
  items: null,
};

export const fetchOutlets = createAsyncThunk(
  "outlets/fetchOutlets",
  async () => {
    const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
    const path = "/outlet/getAllOutlet";
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
      return await response.json();
    } catch (error) {
      console.error("Error fetching outlets:", error);
      throw error;
    }
  }
);


export const fetchProductAvailability = createAsyncThunk(
  "productAvailability/fetchProductAvailability",
  async (items, { rejectWithValue }) => {
    const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
    const path = "/inventory/check-products-availability";

   // Check for valid items
  //  console.log("Received items for availability check:", items);
   if (!items || items.length === 0) {
     console.error("No products found in cart.");
     return rejectWithValue("No products found in cart.");
   }

   const requestBody = {
     "productIds": [items]
   };

   console.log("Request Body:", requestBody); // Log the request body
  // console.log("Product ID",productId);
    // Construct the URL without the productIds parameter for the body
      const url = `${API_ENDPOINT}${path}`; // Keep the URL as required

      const user = localStorage.getItem("customer");
      const token = user ? JSON.parse(user).accessToken : "";

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      myHeaders.append("Content-Type", "application/json"); // Add this header

      const requestOptions = {
        method: "POST", // You mentioned this should remain GET
        headers: myHeaders,
        body: JSON.stringify(requestBody), // Send payload in the body
        redirect: "follow",
      };
      // console.log(requestBody);
      try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error("Error fetching product availability:", error);
        return rejectWithValue(error.message);
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
    openAreaDrawer: (state) => {
      state.areaDrawerOpen = true;
    },
    closeAreaDrawer: (state) => {
      state.areaDrawerOpen = false;
    },
    setSelectedOutlet: (state, action) => {
      const outlet = action.payload;
      
        state.selectedOutlet = outlet?._id;
        console.log("selectedOutlet",state.selectedOutlet);
      
    },
    setSelectCity:(state,action)=>{
      const city = action.payload;
      state.selectCity=city;
      // console.log("City",city);
    },
    setSelectArea:(state,action)=>{
      const area = action.payload;
      if ((state.productName) || (state.selectProductArea!=="Enter Area")) {
        state.selectProductArea = area;
        console.log("selectProductArea",state.selectProductArea);
      } else {
        state.selectArea=area;
        console.log("selectArea",state.selectArea);
      }
    },
    setProductId:(state,action)=>{
      const product = action.payload;
      state.productId=product;
    },
    setProductName:(state,action)=>{
      const product = action.payload;
      state.productName=product;
      console.log("product",product);
    },
    setItems:(state,action)=>{
      const items = action.payload;
      state.items=items;
    },   
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
      })
      .addCase(fetchProductAvailability.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductAvailability.fulfilled, (state, action) => {
        console.log("Product availability response:", action.payload); // Log API response
        state.status = "succeeded";
        state.productAvailability = action.payload; // Ensure correct structure here
      })
      .addCase(fetchProductAvailability.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
    openOutletDrawer,
    closeOutletDrawer,
    openAreaDrawer,
    closeAreaDrawer,
    getAllOutlets,
    setSelectedOutlet,
    setSelectCity,
    setSelectArea,
    setProductId,
    setItems,
    setProductName,
} = outletSlice.actions;

export default outletSlice.reducer;
