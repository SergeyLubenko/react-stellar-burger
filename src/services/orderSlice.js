import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { postOption } from '../utils/api';

export const submit = createAsyncThunk(
  'order/submitOrder',
  async (order, api) => {
    try {
      const ingredientsId = order.ingredients.map(item => item._id);
      const bunId = order.bun._id;
      const foodIds = [bunId, ...ingredientsId, bunId];
      return await postOption({ ingredients: foodIds })
    } catch (error) {
      return api.rejectWithValue(error);
    }
  },
);

const initialState = {
  number: null,
  status: false,
  error: false,
  isOpen: false
};


const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    orderModal: (state) => {
      state.isOpen = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submit.pending, (state) => {
        state.status = true;
        state.error = false
      })
      .addCase(submit.fulfilled, (state, action) => {
        state.number = action.payload.order.number.toString();
        state.status = false;
        state.isOpen = true
      })
      .addCase(submit.rejected, (state, action) => {
        state.status = false;
        state.error = true;
        console.error(action.payload);
        state.number = null
      });
  },
});

export default orderSlice.reducer;
export const { orderModal } = orderSlice.actions