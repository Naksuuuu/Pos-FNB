import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "@/Services/Dashboard/User/UserService";

const initialState = {
  users: [],
  loading: false,
  error: null,
  loadingCreate: false,
  loadingEdit: false,
  loadingDelete: false,
  filters: {
    search: null,
    sort_by: null,
    sort_direction: null,
  },
  statistic: {
    total_user: 0,
    admin_count: 0,
    cashier_count: 0,
  },
  pagination: null,
};

export const fetchUsers = createAsyncThunk("dashboard/user/fetchUsers", async (params = {}, { rejectWithValue }) => {
  try {
    const response = await UserService.users(params);
    if (!response.success) {
      return rejectWithValue(response.message || "Failed to fetch users");
    }

    return response.data;
  } catch (error) {
    return rejectWithValue({
      message: error?.message || "Failed to fetch users",
    });
  }
});

export const createUser = createAsyncThunk("dashboard/user/createUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await UserService.create(userData);
    if (response.success && (response.status === 200 || response.status === 201)) {
      return response;
    }
    throw new Error(response.message || "Failed to create user");
  } catch (error) {
    if (error?.isValidationError) {
      return rejectWithValue({
        message: error?.message || "Failed to create user",
        validationErrors: error?.validationErrors,
        allErrors: error?.allErrors || [],
      });
    }
    return rejectWithValue({
      message: error?.message || "Failed to create user",
    });
  }
});

export const editUser = createAsyncThunk("dashboard/user/editUser", async ([userId, userData], { rejectWithValue }) => {
  try {
    const response = await UserService.edit(userId, userData);
    if (response.success && response.status === 200) {
      return response;
    }
    throw new Error(response.message || "Failed to edit user");
  } catch (error) {
    if (error?.isValidationError) {
      return rejectWithValue({
        message: error?.message || "Failed to edit user",
        validationErrors: error?.validationErrors,
        allErrors: error?.allErrors || [],
      });
    }
    return rejectWithValue({
      message: error?.message || "Failed to edit user",
    });
  }
});

export const deleteUser = createAsyncThunk("dashboard/user/deleteUser", async (userId, { rejectWithValue }) => {
  try {
    const response = await UserService.delete(userId);
    if (response.success && response.status === 200) {
      return response;
    }
    throw new Error(response.message || "Failed to delete user");
  } catch (error) {
    return rejectWithValue({
      message: error?.message || "Failed to delete user",
    });
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.filters = action.payload.filters;
        state.statistic = action.payload.statistic;
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
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || action.error.message;
      })
      .addCase(createUser.pending, (state) => {
        state.loadingCreate = true;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.loadingCreate = false;
      })
      .addCase(createUser.rejected, (state) => {
        state.loadingCreate = false;
      })
      .addCase(editUser.pending, (state) => {
        state.loadingEdit = true;
      })
      .addCase(editUser.fulfilled, (state) => {
        state.loadingEdit = false;
      })
      .addCase(editUser.rejected, (state) => {
        state.loadingEdit = false;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loadingDelete = true;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loadingDelete = false;
      })
      .addCase(deleteUser.rejected, (state) => {
        state.loadingDelete = false;
      });
  },
});
export default userSlice.reducer;
