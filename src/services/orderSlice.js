import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { postOrder } from '../utils/api';

export const submit = createAsyncThunk(
  'order/submitOrder',
  async (order, thunkApi) => {
    try {
      const ingredientsId = order.ingredients.map(item => item._id);
      const bunId = order.bun._id;
      const allFoodIds = [bunId, ...ingredientsId, bunId];
      return await postOrder({ ingredients: allFoodIds })
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

const initialState = {
  number: null,
  orderFetchStatus: false,
  orderError: false,
  isOpen: false
};


const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    hideOrderModal: (state) => {
      state.isOpen = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submit.pending, (state) => {
        state.orderFetchStatus = true;
        state.orderError = false
      })
      .addCase(submit.fulfilled, (state, action) => {
        state.number = action.payload.order.number.toString();
        state.orderFetchStatus = false;
        state.isOpen = true
      })
      .addCase(submit.rejected, (state, action) => {
        state.orderFetchStatus = false;
        state.orderError = true;
        console.error(action.payload);
        state.number = null
      });
  },
});

export default orderSlice.reducer;
export const { hideOrderModal } = orderSlice.actions