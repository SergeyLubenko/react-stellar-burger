import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDataIngredients } from "../utils/api";

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  async () => {
    const response = await getDataIngredients();
    return response.data;
  }
);

const initialState = {
  ingredients: [],
  status: false,
  error: false,
};

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.status = true;
        state.error = false;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.status = false;
        state.error = false;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.status = false;
        state.error = true;
        state.ingredients = [];
      });
  },
});

export default ingredientsSlice.reducer;
