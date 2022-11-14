import { createSlice } from "@reduxjs/toolkit";

const cartInitialState = {
  items: [],
  totalQuantity: 0,
  changed: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },

    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      }
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
    },

    removeItemFormCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.changed = true;
      if (existingItem.quantity <= 1) {
        state.items = state.items.filter((item) => item.id !== id);
      }
      if (!(existingItem.quantity <= 1)) {
        existingItem.quantity--;
        existingItem.totalPrice += existingItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
