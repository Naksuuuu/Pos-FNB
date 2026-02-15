import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as DiningTableService from "../../../Services/DiningTable/DiningTableService";

const initialState = {
  diningTables: [],
  loading: false,
  error: null,
  loadingCreate: false,
  loadingEdit: false,
  loadingDelete: false,
};

export const fetchDiningTables = createAsyncThunk("diningTable/fetchDiningTables", async (params, { rejectWithValue }) => {
  try {
    const response = await DiningTableService.getAllDiningTables(params);
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

export const createDiningTable = createAsyncThunk("diningTable/createDiningTable", async (tableData, { rejectWithValue }) => {
  try {
    const response = await DiningTableService.createDiningTable(tableData);
    if (response.success && response.status === 201) {
      return response;
    }
    return rejectWithValue(response.message || "Failed to create dining table");
  } catch (error) {
    if (error.isValidationError) {
      return rejectWithValue({
        message: error?.message || "Failed to create dining table",
        validationErrors: error?.validationErrors,
        allErrors: error?.allErrors || [],
        status: error?.status || 400,
      });
    }

    return rejectWithValue({
      message: error?.message || "Failed to create dining table",
    });
  }
});

export const editDiningTable = createAsyncThunk("diningTable/editDiningTable", async ([tableId, tableData], { rejectWithValue }) => {
  try {
    const response = await DiningTableService.editDiningTable(tableId, tableData);
    if (response.success && response.status === 200) {
      return response;
    }
  } catch (error) {
    if (error.isValidationError) {
      return rejectWithValue({
        message: error?.message || "Failed to edit dining table",
        validationErrors: error?.validationErrors,
        allErrors: error?.allErrors || [],
        status: error?.status || 422,
      });
    }
    return rejectWithValue({
      message: error?.message || "Failed to edit dining table",
    });
  }
});

export const deleteDiningTable = createAsyncThunk("diningTable/deleteDiningTable", async (tableId, { rejectWithValue }) => {
  try {
    const response = await DiningTableService.deleteDiningTable(tableId);
    if (response.success && response.status === 200) {
      return response;
    }
    return rejectWithValue(response.message || "Failed to delete dining table");
  } catch (error) {
    return rejectWithValue({
      message: error?.message || "Failed to delete dining table",
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
      })
      .addCase(createDiningTable.pending, (state) => {
        state.loadingCreate = true;
      })
      .addCase(createDiningTable.fulfilled, (state) => {
        state.loadingCreate = false;
      })
      .addCase(createDiningTable.rejected, (state) => {
        state.loadingCreate = false;
      });
  },
});

export default diningTableSlice.reducer;
