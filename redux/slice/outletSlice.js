import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  outlets: [],
  productAvailability: [],
  status: "idle",
  error: null,
  outletDrawerOpen: false,
  areaDrawerOpen: false,
  selectedOutlet:null,
  selectCity:"",
  selectArea:"Enter Area",
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

    // Retrieve cartItems from local storage
    // const cartItems = localStorage.getItem("cartItems");

    // // Initialize productIds array
    // let productIds = [];

    // Check if cartItems exist
    // if (cartItems) {
    //   // Parse the retrieved JSON string
    //   const parsedCartItems = JSON.parse(cartItems);
      
    //   Extract product IDs into an array
    //   productIds = parsedCartItems.map(item => item._id);
    // }
    // Check for cart items in local storage, ensure this is in a browser environment
    // if (typeof window === "undefined") return rejectWithValue("Window is not defined");

    //  const cartItems = localStorage.getItem("cartItems");
    //  const productIds = items;

    //  if (!productIds.length) return rejectWithValue("No products found in cart.");
    // Construct the payload for productIds as a JSON string

    // let productIds = [];

    // Check if cartItems exist
    // if (items) {
      // Parse the retrieved JSON string
      
    // Extract product IDs into an array
      // productIds = items.map(item => item._id);
    // }

   
   // Check for valid items
   console.log("Received items for availability check:", items);
   if (!items || items.length === 0) {
     console.error("No products found in cart.");
     return rejectWithValue("No products found in cart.");
   }

   const requestBody = {
     "productIds": items
   };

   console.log("Request Body:", requestBody); // Log the request body
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
        console.error("Error fetching product availability:", error);
        return rejectWithValue(error.message);
      }
    }
  );


// export const fetchProductIdAvailability = createAsyncThunk(
//   "productAvailability/fetchProductAvailability",
//   async (product, { rejectWithValue }) => {
//     const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
//     const path = "/inventory/check-products-availability";
    

//     console.log("Received Product for availability check:", product);
//    if (!items) {
//      console.error("No products found in cart.");
//      return rejectWithValue("No products found in cart.");
//    }

//    const requestBody = {
//      productIds: product
//    };

//    console.log("Request Body:", requestBody); // Log the request body
//     // Construct the URL without the productIds parameter for the body
//       const url = `${API_ENDPOINT}${path}`; // Keep the URL as required

//       const user = localStorage.getItem("customer");
//       const token = user ? JSON.parse(user).accessToken : "";

//       const myHeaders = new Headers();
//       myHeaders.append("Authorization", `Bearer ${token}`);
//       myHeaders.append("Content-Type", "application/json"); // Add this header

//       const requestOptions = {
//         method: "POST", // You mentioned this should remain GET
//         headers: myHeaders,
//         body: JSON.stringify(requestBody), // Send payload in the body
//         redirect: "follow",
//       };
//       console.log(requestBody);
//       try {
//         const response = await fetch(url, requestOptions);
//         if (!response.ok) {
//           throw new Error(`API request failed with status ${response.status}`);
//         }
//         return await response.json();
//       } catch (error) {
//         console.error("Error fetching product availability:", error);
//         return rejectWithValue(error.message);
//       }
//     }
// );




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
    setSelectedOutlet:(state,action)=>{
      const outlet = action.payload;
      state.selectedOutlet=outlet?._id;
    },
    setSelectCity:(state,action)=>{
      const city = action.payload;
      state.selectCity=city;
      // console.log("City",city);
    },
    setSelectArea:(state,action)=>{
      const area = action.payload;
      state.selectArea=area;
    },
    setProductId:(state,action)=>{
      const product = action.payload;
      state.productId=product;
      console.log("Product Id",product);
    },
    setItems:(state,action)=>{
      const items = action.payload;
      state.items=items;
      console.log("Items_Slice",state.items);
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
} = outletSlice.actions;

export default outletSlice.reducer;
