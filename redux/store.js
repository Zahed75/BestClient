import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "@/redux/slice/categorySlice";
import productsReducer from "@/redux/slice/productsSlice";
import cartReducer from "@/redux/slice/cartSlice";
import customerReducer from "@/redux/slice/customerSlice";
import wishlistReducer from "@/redux/slice/wishlistSlice";
import relatedProductsReducer from "@/redux/slice/relatedSlice";
import discountReducer from "./slice/discountSlice";
import shopReducer from "./slice/shopSlice";
import brandReducer from "./slice/brandSlice";
import orderResponseReducer from "./slice/orderResponseSlice";
import outletReducer from "./slice/outletSlice";
import citiesReducer from "./slice/citiesSlice";

const store = configureStore({
  reducer: {
    categories: categoryReducer,
    products: productsReducer,
    cart: cartReducer,
    customer: customerReducer,
    wishlist: wishlistReducer,
    relatedProducts: relatedProductsReducer,
    discount: discountReducer,
    shop: shopReducer,
    brand: brandReducer,
    orderResponse: orderResponseReducer,
    outlet: outletReducer,
    cities: citiesReducer,
  },
});

export default store;
