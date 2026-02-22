import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as OrderService from "@/Services/Dashboard/Order/OrderService";

const initialState = {
  orders: [],
  loading: false,
  error: null,
  // loadingCreate: false,
  // loadingEdit: false,
  // loadingDelete: false,
  filters: {
    search: "string",
    status: "string",
    customer_name: "string",
    tanggal: "string",
    per_page: 0,
  },
  pagination: {
    current_page: 1,
    last_page: 1,
    per_page: 15,
    total: 0,
    from: 1,
    to: 1,
    next_page: null,
    prev_page: null,
  },
};

export const fetchOrders = createAsyncThunk("dashboard/order/fetchOrders", async (params = {}, { rejectedWithValue }) => {
  try {
    const response = await OrderService.getAllOrders(params);
    if (!response.success) {
      return rejectedWithValue(response.message || "Failed to fetch orders");
    }

    return response.data;
  } catch (error) {
    return rejectedWithValue({
      message: error?.message || "Failed to fetch orders",
    });
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.pagination = {
          current_page: parseInt(action.payload.pagination.current_page),
          last_page: parseInt(action.payload.pagination.last_page),
          per_page: parseInt(action.payload.pagination.per_page),
          total: parseInt(action.payload.pagination.total),
          from: parseInt(action.payload.pagination.from),
          to: parseInt(action.payload.pagination.to),
          next_page: action.payload.pagination.next_page ? parseInt(action.payload.pagination.next_page) : null,
          prev_page: action.payload.pagination.prev_page ? parseInt(action.payload.pagination.prev_page) : null,
        };
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch orders";
      });
  },
});

export default orderSlice.reducer;
