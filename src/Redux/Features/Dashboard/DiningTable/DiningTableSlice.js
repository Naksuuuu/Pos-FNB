import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import DiningTableService from "@/Services/Dashboard/DiningTable/DiningTableService";

const initialState = {
  diningTables: [],
  loading: false,
  error: null,
  loadingCreate: false,
  loadingEdit: false,
  loadingDelete: false,
  loadingBulkDelete: false,
  pagination: {
    current_page: 1,
    last_page: 1,
    per_page: 15,
    total: 0,
    from: 1,
    to: 1,
    prev_page: null,
    next_page: null,
  },
  statistic: {
    available_count: 0,
    occupied_count: 0,
    total_table: 0,
  },
  filters: {
    search: null,
    status: null,
    sort_by: "created_at",
    sort_direction: "desc",
  },
};

export const fetchDiningTables = createAsyncThunk("dashboard/diningTable/fetchDiningTables", async (params = {}, { rejectWithValue }) => {
  try {
    const response = await DiningTableService.tables(params);
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

export const createDiningTable = createAsyncThunk("dashboard/diningTable/createDiningTable", async (tableData, { rejectWithValue }) => {
  try {
    const response = await DiningTableService.create(tableData);
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

export const editDiningTable = createAsyncThunk("dashboard/diningTable/editDiningTable", async ([tableId, tableData], { rejectWithValue }) => {
  try {
    const response = await DiningTableService.edit(tableId, tableData);
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

export const deleteDiningTable = createAsyncThunk("dashboard/diningTable/deleteDiningTable", async (tableId, { rejectWithValue }) => {
  try {
    const response = await DiningTableService.delete(tableId);
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

export const bulkDeleteDiningTables = createAsyncThunk("dashboard/diningTable/bulkDeleteDiningTables", async (tableIds, { rejectWithValue }) => {
  try {
    const response = await DiningTableService.bulkDelete(tableIds);
    if (response.success && response.status === 200) {
      return response;
    }
  } catch (error) {
    return rejectWithValue({
      message: error?.message || "Failed to delete dining tables",
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
        state.statistic = {
          available_count: parseInt(action.payload.statistic.available_count),
          occupied_count: parseInt(action.payload.statistic.occupied_count),
          total_table: parseInt(action.payload.statistic.total_table),
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
      })
      .addCase(bulkDeleteDiningTables.pending, (state) => {
        state.loadingBulkDelete = true;
      })
      .addCase(bulkDeleteDiningTables.fulfilled, (state) => {
        state.loadingBulkDelete = false;
      })
      .addCase(bulkDeleteDiningTables.rejected, (state) => {
        state.loadingBulkDelete = false;
      });
  },
});

export default diningTableSlice.reducer;
