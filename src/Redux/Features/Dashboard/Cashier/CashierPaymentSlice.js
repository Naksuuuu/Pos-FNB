import CashierService from "@/Services/Dashboard/Cashier/CashierService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  submittedOrders: [],
  loadingSubmittedOrders: false,
  loadingPayment: false,
  loadingUpdateStatus: false,
  error: null,
  pagination: {
    current_page: 1,
    last_page: 1,
    per_page: 100,
    total: 0,
    from: 1,
    to: 1,
    next_page: null,
    prev_page: null,
  },
};

export const fetchSubmittedOrders = createAsyncThunk("dashboard/cashierPayment/fetchSubmittedOrders", async (params = {}, { rejectWithValue }) => {
  try {
    const response = await CashierService.orders({ ...params });
    if (!response.success) {
      return rejectWithValue(response.message || "Failed to fetch submitted orders");
    }
    return response.data;
  } catch (error) {
    return rejectWithValue({
      message: error?.message || "Failed to fetch submitted orders",
    });
  }
});

export const payOrder = createAsyncThunk("dashboard/cashierPayment/payOrder", async (payload, { rejectWithValue }) => {
  try {
    const response = await CashierService.paymentOrder(payload);
    if (response.success && (response.status === 200 || response.status === 201)) {
      return response;
    }

    return rejectWithValue({
      message: response?.message || "Failed to process payment",
    });
  } catch (error) {
    return rejectWithValue({
      message: error?.message || "Failed to process payment",
      status: error?.status,
    });
  }
});

export const updateOrderStatus = createAsyncThunk("dashboard/cashierPayment/updateOrderStatus", async ([orderId, payload], { rejectWithValue }) => {
  try {
    const response = await CashierService.updateOrderStatus(orderId, payload);
    if (response.success && (response.status === 200 || response.status === 201)) {
      return response;
    }

    return rejectWithValue({
      message: response?.message || "Failed to update order status",
    });
  } catch (error) {
    return rejectWithValue({
      message: error?.message || "Failed to update order status",
      status: error?.status,
    });
  }
});

const cashierPaymentSlice = createSlice({
  name: "cashierPayment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubmittedOrders.pending, (state) => {
        state.loadingSubmittedOrders = true;
        state.error = null;
      })
      .addCase(fetchSubmittedOrders.fulfilled, (state, action) => {
        state.loadingSubmittedOrders = false;
        state.submittedOrders = action.payload.orders;
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
      .addCase(fetchSubmittedOrders.rejected, (state, action) => {
        state.loadingSubmittedOrders = false;
        state.error = action.payload?.message || action.error.message;
      })
      .addCase(payOrder.pending, (state) => {
        state.loadingPayment = true;
      })
      .addCase(payOrder.fulfilled, (state) => {
        state.loadingPayment = false;
      })
      .addCase(payOrder.rejected, (state, action) => {
        state.loadingPayment = false;
        state.error = action.payload?.message || action.error.message;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.loadingUpdateStatus = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state) => {
        state.loadingUpdateStatus = false;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loadingUpdateStatus = false;
        state.error = action.payload?.message || action.error.message;
      });
  },
});

export default cashierPaymentSlice.reducer;
