import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as MenuService from "../../../Services/Menu/MenuService";

const initialState = {
  menus: [],
  loading: false,
  error: null,
  loadingCreate: false,
  loadingEdit: false,
  loadingDelete: false,
  filters: {
    search: null,
    category_id: null,
    is_available: null,
    sort_by: "created_at",
    sort_direction: "desc",
    per_page: 10,
  },
  pagination: {
    current_page: 1,
    from: 1,
    last_page: 1,
    next_page: null,
    prev_page: null,
    per_page: 10,
    total: 0,
    total_pages: 0,
  },
};

export const fetchMenus = createAsyncThunk("menu/fetchMenus", async (params, { rejectWithValue }) => {
  try {
    const response = await MenuService.getAllMenu(params);

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

export const createMenu = createAsyncThunk("menu/createMenu", async (menuData, { rejectWithValue }) => {
  try {
    const response = await MenuService.createMenu(menuData);
    if (response.success && (response.status === 200 || response.status === 201)) {
      return response;
    }

    throw new Error(response.data);
  } catch (error) {
    if (error?.isValidationError) {
      return rejectWithValue({
        message: error?.message || "Failed to create menu",
        validationErrors: error?.validationErrors,
        allErrors: error?.allErrors || [],
        status: error?.status,
      });
    }

    return rejectWithValue({
      message: error?.message || "Failed to create menu",
    });
  }
});

export const deleteMenu = createAsyncThunk("menu/deleteMenu", async (menuId, { rejectWithValue }) => {
  try {
    const response = await MenuService.deleteMenu(menuId);
    if (response.success && (response.status === 200 || response.status === 201)) {
      return response;
    }
    throw new Error(response.message || "Failed to delete menu");
  } catch (error) {
    return rejectWithValue({
      message: error?.message || "Failed to delete menu",
      status: error?.status,
    });
  }
});

export const editMenu = createAsyncThunk("menu/editMenu", async ([menuId, menuData], { rejectWithValue }) => {
  try {
    const { image, ...menuDataWithoutImage } = menuData;
    if (image && image[0]) {
      await MenuService.uploadImageMenu(menuId, image);
    }

    const response = await MenuService.editMenu(menuId, menuDataWithoutImage);
    if (response.success && (response.status === 200 || response.status === 201)) {
      return response;
    }
    throw new Error(response.message || "Failed to edit menu");
  } catch (error) {
    if (error?.isValidationError) {
      return rejectWithValue({
        message: error?.message || "Failed to edit menu",
        validationErrors: error?.validationErrors,
        allErrors: error?.allErrors || [],
        status: error?.status,
      });
    }

    return rejectWithValue({
      message: error?.message || "Failed to edit menu",
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
        state.menus = action.payload.menus;
        state.pagination = {
          ...action.payload.pagination,
          current_page: parseInt(action.payload.pagination.current_page),
          per_page: parseInt(action.payload.pagination.per_page),
          last_page: parseInt(action.payload.pagination.last_page),
          total: parseInt(action.payload.pagination.total),
          next_page: action.payload.pagination.next_page ? parseInt(action.payload.pagination.next_page) : null,
          prev_page: action.payload.pagination.prev_page ? parseInt(action.payload.pagination.prev_page) : null,
        };
        state.filters = action.payload.filters;
      })
      .addCase(fetchMenus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || action.error.message;
      })
      .addCase(createMenu.pending, (state) => {
        state.loadingCreate = true;
      })
      .addCase(createMenu.fulfilled, (state) => {
        state.loadingCreate = false;
      })
      .addCase(createMenu.rejected, (state) => {
        state.loadingCreate = false;
      })
      .addCase(editMenu.pending, (state) => {
        state.loadingEdit = true;
      })
      .addCase(editMenu.fulfilled, (state) => {
        state.loadingEdit = false;
      })
      .addCase(editMenu.rejected, (state) => {
        state.loadingEdit = false;
      })
      .addCase(deleteMenu.pending, (state) => {
        state.loadingDelete = true;
      })
      .addCase(deleteMenu.fulfilled, (state) => {
        state.loadingDelete = false;
      })
      .addCase(deleteMenu.rejected, (state) => {
        state.loadingDelete = false;
      });
  },
});
export default menuSlice.reducer;
