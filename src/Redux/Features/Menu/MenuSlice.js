import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as MenuService from "../../../Services/Menu/MenuService";

const initialState = {
  menus: [],
  loading: false,
  error: null,
};

export const fetchMenus = createAsyncThunk("menu/fetchMenus", async (_, { rejectWithValue }) => {
  try {
    const response = await MenuService.getAllMenu();

    if (!response.success) {
      return rejectWithValue(response.message || "Failed to fetch menus");
    }

    return response.data; // Return the data array from API response
  } catch (error) {
    return rejectWithValue(error.message || error);
  }
});

export const createMenus = createAsyncThunk("menu/createMenus", async (menuData, { rejectWithValue }) => {
  try {
    const response = await MenuService.createMenu(menuData);
    if (response.success && response.httpcode === 201) {
      return response.data;
    }

    throw new Error(response.message || "Failed to create menu");
  } catch (error) {
    // Error sudah diproses di Base.js interceptor
    const serverErrors = error?.validationErrors || error?.data?.errors || null;

    // Convert array messages to single string if needed
    const processedErrors = serverErrors
      ? Object.entries(serverErrors).reduce((acc, [field, messages]) => {
          acc[field] = Array.isArray(messages) ? messages[0] : messages;
          return acc;
        }, {})
      : null;

    return rejectWithValue({
      message: error?.message || "Failed to create menu",
      validationErrors: processedErrors,
      allErrors: error?.allErrors || [],
      status: error?.status,
    });
  }
});

const menuSlice = createSlice({
  name: "menu",
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
        state.menus = action.payload.data;
      })
      .addCase(fetchMenus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(createMenus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMenus.fulfilled, (state, action) => {
        state.loading = false;
        state.menus.push(action.payload);
      })
      .addCase(createMenus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});
export default menuSlice.reducer;
