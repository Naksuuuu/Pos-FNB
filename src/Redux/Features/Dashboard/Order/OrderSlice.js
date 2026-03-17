import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import OrderService from "@/Services/Dashboard/Order/OrderService";

const initialState = {
  orders: [],
  loading: false,
  error: null,
  filters: {
    search: "",
    status: "",
    customer_name: "",
    date_filter: "",
    per_page: 0,
  },
  statistic: {
    total_order: 0,
    submitted: 0,
    completed: 0,
    canceled: 0,
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
    const response = await OrderService.orders(params);
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
        state.statistic = {
          total_order: parseInt(action.payload.statistic.total_order),
          submitted: parseInt(action.payload.statistic.submitted),
          completed: parseInt(action.payload.statistic.completed),
          processing: parseInt(action.payload.statistic.processing),
          canceled: parseInt(action.payload.statistic.canceled),
        };
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
        state.filters = action.payload.filters;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch orders";
      });
  },
});

export default orderSlice.reducer;
