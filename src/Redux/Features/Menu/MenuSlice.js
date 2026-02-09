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

    return response.data;
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

    throw new Error(response.data);
  } catch (error) {
    return rejectWithValue({
      message: error?.message || "Failed to create menu",
      validationErrors: error?.validationErrors || {},
      allErrors: error?.allErrors || [],
      status: error?.status,
    });
  }
});

export const deleteMenu = createAsyncThunk("menu/deleteMenu", async (menuId, { rejectWithValue }) => {
  try {
    const response = await MenuService.deleteMenu(menuId);
    if (response.success && response.httpcode === 200) {
      return response.data;
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
    if (response.success && response.httpcode === 200) {
      return response.data;
    }
    throw new Error(response.message || "Failed to edit menu");
  } catch (error) {
    return rejectWithValue({
      message: error?.message || "Failed to edit menu",
      validationErrors: error?.validationErrors || {},
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
      })
      .addCase(editMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editMenu.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(editMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(deleteMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMenu.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});
export default menuSlice.reducer;
