import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as DiningTableService from "../../../Services/DiningTable/DiningTableService";

const initialState = {
  diningTables: [],
  loading: false,
  error: null,
};

export const fetchDiningTables = createAsyncThunk("diningTable/fetchDiningTables", async (_, { rejectWithValue }) => {
  try {
    const response = await DiningTableService.getAllDiningTables();
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

const diningTableSlice = createSlice({
  name: "diningTable",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiningTables.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDiningTables.fulfilled, (state, action) => {
        state.loading = false;
        state.diningTables = action.payload.tables;
      })
      .addCase(fetchDiningTables.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch dining tables";
      });
  },
});

export default diningTableSlice.reducer;
