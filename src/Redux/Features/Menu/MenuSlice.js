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
        state.menus = action.payload;
      })
      .addCase(fetchMenus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});
export default menuSlice.reducer;
