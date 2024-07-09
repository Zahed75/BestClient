import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "@/redux/slice/categorySlice";
import productsReducer from "@/redux/slice/productsSlice";
import cartReducer from "@/redux/slice/cartSlice";
import customerReducer from "@/redux/slice/customerSlice";
import wishlistReducer from "@/redux/slice/wishlistSlice";
import relatedProductsReducer from "@/redux/slice/relatedSlice";

const store = configureStore({
  reducer: {
    categories: categoryReducer,
    products: productsReducer,
    cart: cartReducer,
    customer: customerReducer,
    wishlist: wishlistReducer,
    relatedProducts: relatedProductsReducer,
  },
});

export default store;
