import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import CatalogService from "@/Services/Customer/Catalog/CatalogService";

const initialState = {
  catalogs: [],
  loading: false,
  error: null,
  filters: {
    search: null,
  },
};

export const fetchCatalogs = createAsyncThunk("catalog/fetchCatalogs", async (params, { rejectWithValue }) => {
  try {
    const response = await CatalogService.catalogs(params);

    if (!response.success) {
      return rejectWithValue(response.message || "Failed to fetch catalogs");
    }

    return response.data;
  } catch (error) {
    return rejectWithValue({
      message: error?.message || "Failed to fetch catalogs",
    });
  }
});

const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatalogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCatalogs.fulfilled, (state, action) => {
        state.loading = false;
        state.catalogs = action.payload.menus;
        state.filters = action.payload.filters;
      })
      .addCase(fetchCatalogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || action.error.message;
      });
  },
});
export default catalogSlice.reducer;
