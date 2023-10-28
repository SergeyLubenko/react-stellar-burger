import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  myIngredient: null,
  isOpen: false,
};

const myIngredientSlice = createSlice({
  name: "myIngredient",
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      state.isOpen = true;
      state.myIngredient = action.payload;
    },
    hideIngredient: (state) => {
      state.myIngredient = null;
      state.isOpen = false;
    },
  },
});

export const { addIngredient, hideIngredient } = myIngredientSlice.actions;
export default myIngredientSlice.reducer;
