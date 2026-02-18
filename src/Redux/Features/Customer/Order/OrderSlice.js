import { createOrder } from "@/Services/Customer/Order/OrderService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: {},
  loading: false,
  error: null,
  totalPrice: 0,
};

export const createOrders = createAsyncThunk("order/createOrder", async (orderData, { rejectWithValue }) => {
  try {
    const response = await createOrder(orderData);
    if (response.status === 201) {
      return response.data;
    }
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.data;
      })
      .addCase(createOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create order";
      });
  },
});

export default orderSlice.reducer;
