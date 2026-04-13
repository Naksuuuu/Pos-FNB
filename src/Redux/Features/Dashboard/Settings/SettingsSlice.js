import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import SettingsService from "@/Services/Dashboard/Settings/SettingsService";

const initialState = {
  setting: null,
  loadingGet: false,
  loadingSave: false,
  loadingDelete: false,
  loadingUploadLogo: false,
  loadingDeleteLogo: false,
  error: null,
};

export const fetchSetting = createAsyncThunk("dashboard/settings/fetchSetting", async (_, { rejectWithValue }) => {
  try {
    const response = await SettingsService.get();

    if (!response.success) {
      return rejectWithValue({
        message: response.message || "Failed to fetch settings",
      });
    }

    return {
      message: response.message,
      setting: response.data?.setting || null,
    };
  } catch (error) {
    return rejectWithValue({
      message: error?.message || "Failed to fetch settings",
    });
  }
});

export const saveSetting = createAsyncThunk("dashboard/settings/saveSetting", async (payload, { rejectWithValue, getState }) => {
  try {
    const currentSetting = getState().dashboard.settings.setting;

    if (!currentSetting?.id) {
      return rejectWithValue({
        message: "Tidak ada settings",
      });
    }

    const response = await SettingsService.update(currentSetting.id, payload);

    if (!response.success) {
      return rejectWithValue({
        message: response.message || "Failed to save settings",
      });
    }

    return {
      message: response.message,
      setting: response.data?.setting || null,
    };
  } catch (error) {
    if (error?.isValidationError) {
      return rejectWithValue({
        message: error?.message || "Failed to save settings",
        status: error?.status,
        validationErrors: error?.validationErrors,
        allErrors: error?.allErrors || [],
      });
    }

    return rejectWithValue({
      message: error?.message || "Failed to save settings",
    });
  }
});

export const removeSetting = createAsyncThunk("dashboard/settings/removeSetting", async (settingId, { rejectWithValue }) => {
  try {
    const response = await SettingsService.delete(settingId);

    if (!response.success) {
      return rejectWithValue({
        message: response.message || "Failed to delete settings",
      });
    }

    return {
      message: response.message,
    };
  } catch (error) {
    return rejectWithValue({
      message: error?.message || "Failed to delete settings",
    });
  }
});

export const uploadSettingLogo = createAsyncThunk("dashboard/settings/uploadSettingLogo", async ({ id, logo }, { rejectWithValue }) => {
  try {
    const response = await SettingsService.uploadLogo(id, logo);

    if (!response.success) {
      return rejectWithValue({
        message: response.message || "Failed to upload logo",
      });
    }

    return {
      message: response.message,
      setting: response.data?.setting || null,
    };
  } catch (error) {
    if (error?.isValidationError) {
      return rejectWithValue({
        message: error?.message || "Failed to upload logo",
        status: error?.status,
        validationErrors: error?.validationErrors,
        allErrors: error?.allErrors || [],
      });
    }

    return rejectWithValue({
      message: error?.message || "Failed to upload logo",
    });
  }
});

export const deleteSettingLogo = createAsyncThunk("dashboard/settings/deleteSettingLogo", async (settingId, { rejectWithValue }) => {
  try {
    const response = await SettingsService.deleteLogo(settingId);

    if (!response.success) {
      return rejectWithValue({
        message: response.message || "Failed to delete logo",
      });
    }

    return {
      message: response.message,
      setting: response.data?.setting || null,
    };
  } catch (error) {
    return rejectWithValue({
      message: error?.message || "Failed to delete logo",
    });
  }
});

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSetting.pending, (state) => {
        state.loadingGet = true;
        state.error = null;
      })
      .addCase(fetchSetting.fulfilled, (state, action) => {
        state.loadingGet = false;
        state.setting = action.payload.setting;
      })
      .addCase(fetchSetting.rejected, (state, action) => {
        state.loadingGet = false;
        state.error = action.payload?.message || action.error.message;
      })
      .addCase(saveSetting.pending, (state) => {
        state.loadingSave = true;
        state.error = null;
      })
      .addCase(saveSetting.fulfilled, (state, action) => {
        state.loadingSave = false;
        state.setting = action.payload.setting;
      })
      .addCase(saveSetting.rejected, (state, action) => {
        state.loadingSave = false;
        state.error = action.payload?.message || action.error.message;
      })
      .addCase(removeSetting.pending, (state) => {
        state.loadingDelete = true;
      })
      .addCase(removeSetting.fulfilled, (state) => {
        state.loadingDelete = false;
        state.setting = null;
      })
      .addCase(removeSetting.rejected, (state, action) => {
        state.loadingDelete = false;
        state.error = action.payload?.message || action.error.message;
      })
      .addCase(uploadSettingLogo.pending, (state) => {
        state.loadingUploadLogo = true;
      })
      .addCase(uploadSettingLogo.fulfilled, (state, action) => {
        state.loadingUploadLogo = false;
        state.setting = action.payload.setting || state.setting;
      })
      .addCase(uploadSettingLogo.rejected, (state, action) => {
        state.loadingUploadLogo = false;
        state.error = action.payload?.message || action.error.message;
      })
      .addCase(deleteSettingLogo.pending, (state) => {
        state.loadingDeleteLogo = true;
      })
      .addCase(deleteSettingLogo.fulfilled, (state, action) => {
        state.loadingDeleteLogo = false;
        if (action.payload.setting) {
          state.setting = action.payload.setting;
          return;
        }

        if (state.setting) {
          state.setting = {
            ...state.setting,
            logo_url: null,
          };
        }
      })
      .addCase(deleteSettingLogo.rejected, (state, action) => {
        state.loadingDeleteLogo = false;
        state.error = action.payload?.message || action.error.message;
      });
  },
});

export default settingsSlice.reducer;
