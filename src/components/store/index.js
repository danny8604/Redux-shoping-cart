import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "./cart";
import uiSliceReducer from "./ui.js";

const store = configureStore({
  reducer: { cart: cartSliceReducer, show: uiSliceReducer },
});

export default store;
