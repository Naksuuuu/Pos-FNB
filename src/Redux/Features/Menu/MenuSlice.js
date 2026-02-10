import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as MenuService from "../../../Services/Menu/MenuService";

const initialState = {
  menus: [],
  loading: false,
  error: null,
  loadingCreate: false,
  errorCreate: null,
  loadingEdit: false,
  errorEdit: null,
  loadingDelete: false,
  errorDelete: null,
};

export const fetchMenus = createAsyncThunk("menu/fetchMenus", async (_, { rejectWithValue }) => {
  try {
    const response = await MenuService.getAllMenu();

    if (!response.success) {
      return rejectWithValue(response.message || "Failed to fetch menus");
    }

    return response.data;
  } catch (error) {
    return rejectWithValue(error.message || error);
  }
});

export const createMenu = createAsyncThunk("menu/createMenu", async (menuData, { rejectWithValue }) => {
  try {
    const response = await MenuService.createMenu(menuData);
    if (response.success && (response.httpcode === 200 || response.httpcode === 201)) {
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
    if (response.success && (response.httpcode === 200 || response.httpcode === 201)) {
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
    if (response.success && (response.httpcode === 200 || response.httpcode === 201)) {
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
        state.menus = action.payload.data;
      })
      .addCase(fetchMenus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || action.error.message;
      })
      .addCase(createMenu.pending, (state) => {
        state.loadingCreate = true;
        state.errorCreate = null;
      })
      .addCase(createMenu.fulfilled, (state) => {
        state.loadingCreate = false;
        state.errorCreate = null;
      })
      .addCase(createMenu.rejected, (state, action) => {
        state.loadingCreate = false;
        state.errorCreate = action.payload?.message || "Failed to create menu";
      })
      .addCase(editMenu.pending, (state) => {
        state.loadingEdit = true;
        state.errorEdit = null;
      })
      .addCase(editMenu.fulfilled, (state) => {
        state.loadingEdit = false;
        state.errorEdit = null;
      })
      .addCase(editMenu.rejected, (state, action) => {
        state.loadingEdit = false;
        state.errorEdit = action.payload?.message || "Failed to edit menu";
      })
      .addCase(deleteMenu.pending, (state) => {
        state.loadingDelete = true;
        state.errorDelete = null;
      })
      .addCase(deleteMenu.fulfilled, (state) => {
        state.loadingDelete = false;
      })
      .addCase(deleteMenu.rejected, (state, action) => {
        state.loadingDelete = false;
        state.errorDelete = action.payload?.message || "Failed to delete menu";
      });
  },
});
export default menuSlice.reducer;
