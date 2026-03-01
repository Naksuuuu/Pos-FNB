import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { changePassword, profile } from "@/Services/Dashboard/Profile/ProfileService";

const initialState = {
  profile: {
    name: null,
    role: null,
    username: null,
  },
  loading: false,
  error: null,
  loadingChangePassword: false,
};

export const getProfile = createAsyncThunk("profile/getProfile", async (_, { rejectWithValue }) => {
  try {
    const response = await profile();
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const changeUserPassword = createAsyncThunk("profile/changeUserPassword", async (data, { rejectWithValue }) => {
  try {
    const response = await changePassword(data);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.data;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(changeUserPassword.pending, (state) => {
        state.loadingChangePassword = true;
      })
      .addCase(changeUserPassword.fulfilled, (state) => {
        state.loadingChangePassword = false;
      })
      .addCase(changeUserPassword.rejected, (state) => {
        state.loadingChangePassword = false;
      });
  },
});

export default profileSlice.reducer;
