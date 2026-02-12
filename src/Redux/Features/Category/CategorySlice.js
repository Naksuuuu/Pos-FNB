import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as CategoryService from "../../../Services/Category/CategoryService";

const initialState = {
  categories: [],
  loading: false,
  error: null,
  loadingCreate: false,
  loadingEdit: false,
  loadingDelete: false,
  filters: {
    search: null,
  },
};

export const fetchCategories = createAsyncThunk("category/fetchCategories", async (params, { rejectWithValue }) => {
  try {
    const response = await CategoryService.getAllCategories(params);
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

export const createCategory = createAsyncThunk("category/createCategory", async (categoryData, { rejectWithValue }) => {
  try {
    const response = await CategoryService.createCategory(categoryData);
    if (response.success && (response.status === 200 || response.status === 201)) {
      return response;
    }
    throw new Error(response.data);
  } catch (error) {
    if (error?.isValidationError) {
      return rejectWithValue({
        message: error?.message || "Failed to create category",
        validationErrors: error?.validationErrors,
        allErrors: error?.allErrors || [],
      });
    }
    return rejectWithValue({
      message: error?.message || "Failed to create category",
    });
  }
});

export const editCategory = createAsyncThunk("category/editCategory", async ({ categoryId, categoryData }, { rejectWithValue }) => {
  try {
    const response = await CategoryService.editCategory(categoryId, categoryData);
    if (response.success && response.status === 200) {
      return response;
    }
    throw new Error(response.data);
  } catch (error) {
    if (error?.isValidationError) {
      return rejectWithValue({
        message: error?.message || "Failed to edit category",
        validationErrors: error?.validationErrors,
        allErrors: error?.allErrors || [],
      });
    }
    return rejectWithValue({
      message: error?.message || "Failed to edit category",
    });
  }
});

export const deleteCategory = createAsyncThunk("category/deleteCategory", async (categoryId, { rejectWithValue }) => {
  try {
    const response = await CategoryService.deleteCategory(categoryId);
    if (response.success && response.status === 200) {
      return response;
    }
    throw new Error(response.data);
  } catch (error) {
    return rejectWithValue({
      message: error?.message || "Failed to delete category",
    });
  }
});

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.categories;
        state.filters = action.payload.filters;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || action.error.message;
      })
      .addCase(createCategory.pending, (state) => {
        state.loadingCreate = true;
      })
      .addCase(createCategory.fulfilled, (state) => {
        state.loadingCreate = false;
      })
      .addCase(createCategory.rejected, (state) => {
        state.loadingCreate = false;
      })
      .addCase(editCategory.pending, (state) => {
        state.loadingEdit = true;
      })
      .addCase(editCategory.fulfilled, (state) => {
        state.loadingEdit = false;
      })
      .addCase(editCategory.rejected, (state) => {
        state.loadingEdit = false;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loadingDelete = true;
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.loadingDelete = false;
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.loadingDelete = false;
      });
  },
});
export default categorySlice.reducer;
