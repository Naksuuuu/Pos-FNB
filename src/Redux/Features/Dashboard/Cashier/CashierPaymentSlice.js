import CashierService from "@/Services/Dashboard/Cashier/CashierService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const mapOrdersPayload = (payload = {}) => ({
  submittedOrders: payload.orders || [],
  pagination: {
    current_page: parseInt(payload.pagination?.current_page || 1),
    last_page: parseInt(payload.pagination?.last_page || 1),
    per_page: parseInt(payload.pagination?.per_page || 100),
    total: parseInt(payload.pagination?.total || 0),
    from: parseInt(payload.pagination?.from || 1),
    to: parseInt(payload.pagination?.to || 1),
    next_page: payload.pagination?.next_page ? parseInt(payload.pagination.next_page) : null,
    prev_page: payload.pagination?.prev_page ? parseInt(payload.pagination.prev_page) : null,
  },
});

const initialState = {
  submittedOrders: [],
  loadingSubmittedOrders: false,
  loadingPayment: false,
  loadingUpdateStatus: false,
  isNewOrder: false,
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

export const refetchSubmittedOrders = createAsyncThunk("dashboard/cashierPayment/refetchSubmittedOrders", async (params = {}, { rejectWithValue, getState }) => {
  try {
    const prevOrders = getState().dashboard.cashierPayment.submittedOrders || [];
    const prevIds = new Set(prevOrders.map((order) => String(order.id)));

    const response = await CashierService.orders({ ...params });
    if (!response.success) {
      return rejectWithValue({
        message: response.message || "Failed to refresh submitted orders",
      });
    }

    const nextOrders = response.data?.orders || [];
    const hasNewOrder = nextOrders.some((order) => !prevIds.has(String(order.id)));

    return {
      data: response.data,
      isNewOrder: hasNewOrder,
    };
  } catch (error) {
    return rejectWithValue({
      message: error?.message || "Failed to refresh submitted orders",
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
  reducers: {
    clearNewOrderFlag: (state) => {
      state.isNewOrder = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubmittedOrders.pending, (state) => {
        state.loadingSubmittedOrders = true;
        state.error = null;
      })
      .addCase(fetchSubmittedOrders.fulfilled, (state, action) => {
        state.loadingSubmittedOrders = false;
        const mapped = mapOrdersPayload(action.payload);
        state.submittedOrders = mapped.submittedOrders;
        state.pagination = mapped.pagination;
        state.isNewOrder = false;
      })
      .addCase(fetchSubmittedOrders.rejected, (state, action) => {
        state.loadingSubmittedOrders = false;
        state.error = action.payload?.message || action.error.message;
      })
      .addCase(refetchSubmittedOrders.fulfilled, (state, action) => {
        const mapped = mapOrdersPayload(action.payload.data);
        state.submittedOrders = mapped.submittedOrders;
        state.pagination = mapped.pagination;
        state.isNewOrder = action.payload.isNewOrder;
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

export const { clearNewOrderFlag } = cashierPaymentSlice.actions;

export default cashierPaymentSlice.reducer;
