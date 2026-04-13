import CashierService from "@/Services/Dashboard/Cashier/CashierService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  menus: [],
  categories: [],
  tables: [],
  loadingInit: false,
  loading: false,
  loadingCategories: false,
  loadingTables: false,
  error: null,
  loadingCreate: false,
  filters: {
    search: null,
    category_id: null,
    is_available: null,
  },
  pagination: {},
};

export const fetchMenus = createAsyncThunk("dashboard/cashierNewOrder/fetchMenus", async (params = {}, { rejectWithValue }) => {
  try {
    const response = await CashierService.menus(params);

    if (!response.success) {
      return rejectWithValue(response.message || "Failed to fetch menus");
    }

    return response.data;
  } catch (error) {
    return rejectWithValue({
      message: error?.message || "Failed to fetch menus",
    });
  }
});

export const fetchCategories = createAsyncThunk("dashboard/cashierNewOrder/fetchCategories", async (params = {}, { rejectWithValue }) => {
  try {
    const response = await CashierService.categories(params);
    if (!response.success) {
      return rejectWithValue(response.message || "Failed to fetch categories");
    }

    return response.data;
  } catch (error) {
    return rejectWithValue({
      message: error?.message || "Failed to fetch categories",
    });
  }
});

export const fetchDiningTables = createAsyncThunk("dashboard/cashierNewOrder/fetchDiningTables", async (_, { rejectWithValue }) => {
  try {
    const response = await CashierService.tables();
    if (!response.success) {
      return rejectWithValue(response.message || "Failed to fetch dining tables");
    }

    return response.data;
  } catch (error) {
    return rejectWithValue({
      message: error?.message || "Failed to fetch dining tables",
    });
  }
});

export const cashierResources = createAsyncThunk("dashboard/cashierNewOrder/cashierResources", async (params = {}, { rejectWithValue }) => {
  try {
    const [categoriesRes, tablesRes, menusRes] = await Promise.all([CashierService.categories(), CashierService.tables(), CashierService.menus(params)]);

    if (!categoriesRes.success) {
      return rejectWithValue({
        message: categoriesRes.message || "Failed to fetch categories",
      });
    }

    if (!tablesRes.success) {
      return rejectWithValue({
        message: tablesRes.message || "Failed to fetch dining tables",
      });
    }

    if (!menusRes.success) {
      return rejectWithValue({
        message: menusRes.message || "Failed to fetch menus",
      });
    }

    return {
      categories: categoriesRes.data.categories,
      tables: tablesRes.data.tables,
      menus: menusRes.data.menus,
      filters: menusRes.data.filters,
    };
  } catch (error) {
    return rejectWithValue({
      message: error?.message || "Failed to bootstrap cashier resources",
    });
  }
});

export const createOrder = createAsyncThunk("dashboard/cashierNewOrder/createOrder", async (payload, { rejectWithValue }) => {
  try {
    const response = await CashierService.createOrder(payload);
    if (response.success && (response.status === 200 || response.status === 201)) {
      return response;
    }

    return rejectWithValue({
      message: response?.message || "Failed to create order",
    });
  } catch (error) {
    return rejectWithValue({
      message: error?.message || "Failed to create order",
      status: error?.status,
      validationErrors: error?.validationErrors,
      allErrors: error?.allErrors || [],
    });
  }
});

const cashierNewOrderSlice = createSlice({
  name: "cashierNewOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenus.fulfilled, (state, action) => {
        state.loading = false;
        state.menus = action.payload.menus;
        state.filters = action.payload.filters;
      })
      .addCase(fetchMenus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error.message;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.loadingCategories = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loadingCategories = false;
        state.categories = action.payload.categories;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loadingCategories = false;
        state.error = action.payload?.message || action.error.message;
      })
      .addCase(fetchDiningTables.pending, (state) => {
        state.loadingTables = true;
      })
      .addCase(fetchDiningTables.fulfilled, (state, action) => {
        state.loadingTables = false;
        state.tables = action.payload.tables;
      })
      .addCase(fetchDiningTables.rejected, (state, action) => {
        state.loadingTables = false;
        state.error = action.payload?.message || action.error.message;
      })
      .addCase(cashierResources.pending, (state) => {
        state.loadingInit = true;
        state.error = null;
      })
      .addCase(cashierResources.fulfilled, (state, action) => {
        state.loadingInit = false;
        state.categories = action.payload.categories;
        state.tables = action.payload.tables;
        state.menus = action.payload.menus;
        state.filters = action.payload.filters;
      })
      .addCase(cashierResources.rejected, (state, action) => {
        state.loadingInit = false;
        state.error = action.payload?.message || action.error.message;
      })
      .addCase(createOrder.pending, (state) => {
        state.loadingCreate = true;
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.loadingCreate = false;
      })
      .addCase(createOrder.rejected, (state) => {
        state.loadingCreate = false;
      });
  },
});

export default cashierNewOrderSlice.reducer;
