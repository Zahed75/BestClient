import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
  outlets: [],
  status: "idle",
  error: null,
  outletDrawerOpen: false,
  selectedOutlet:null,
};

// export const fetchOutlets = createAsyncThunk(
//   "outlets/fetchOutlets",
//   async () => {
//     const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
//     const path = "/inventory/check-products-availability";

//     // Construct the productIds object for the body
//     const  
//       productIds= [
//         "66efb4601e77eb9ea0fd66fe",
//         "66efbfaa72f01ba45c58b9f5",
//         "671386ed684974849f08c04a"
//       ]
//     ;

//     const url = `${API_ENDPOINT}${path}`; // Construct the URL
//     console.log(url);

//     const user = localStorage.getItem("customer");
//     const token = user ? JSON.parse(user).accessToken : "";

//     // Configure Axios request
//     const config = {
//       headers: {
//         "Authorization": `Bearer ${token}`,
//         "Content-Type": "application/json"
//       }
//     };

//     try {
//       // Make the request with Axios
//       const response = await axios.get(url, { headers: config.headers, data: productIds });
//       console.log(response.data);
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching outlets:", error);
//       throw error;
//     }
//   }
// );

export const fetchOutlets = createAsyncThunk(
  "outlets/fetchOutlets",
  async () => {
    const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
    const path = "/inventory/check-products-availability";

    // Retrieve cartItems from local storage
    const cartItems = localStorage.getItem("cartItems");

    // Initialize productIds array
    let productIds = [];

    // Check if cartItems exist
    if (cartItems) {
      // Parse the retrieved JSON string
      const parsedCartItems = JSON.parse(cartItems);
      
      // Extract product IDs into an array
      productIds = parsedCartItems.map(item => item._id);
    }

    // Construct the payload for productIds as a JSON string
    const requestBody = {
      productIds: productIds
    };
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
    console.log(requestBody);
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
      console.log(outlet?._id);
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
