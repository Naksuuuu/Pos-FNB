import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import ProfileService from "@/Services/Dashboard/Profile/ProfileService";
import LoginService from "@/Services/Auth/Login/LoginService";

import { LoginUser, LogoutUser } from "@/Redux/Features/Auth/Login/LoginSlice";

import { getUserData, setUserData } from "@/Utils/sessionUtils";

const initialState = {
  profile: getUserData(),
  loading: false,
  error: null,
  loadingChangePassword: false,
  loadingEditProfile: false,
};

export const getProfile = createAsyncThunk("dashboard/profile/getProfile", async (_, { rejectWithValue, getState }) => {
  try {
    if (getState().dashboard.profile.profile) {
      return {
        data: getState().dashboard.profile.profile,
      };
    }
    const response = await ProfileService.get();

    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const editProfile = createAsyncThunk("dashboard/profile/editProfile", async (data, { rejectWithValue }) => {
  try {
    await ProfileService.edit(data);
    const meResponse = await LoginService.me();

    if (meResponse.status === 200) {
      setUserData(meResponse.data.user);
      return {
        profile: meResponse.data.user,
      };
    }
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const changeUserPassword = createAsyncThunk(
  "dashboard/profile/changeUserPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await ProfileService.changePassword(data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

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
      })
      .addCase(editProfile.pending, (state) => {
        state.loadingEditProfile = true;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.loadingEditProfile = false;
        state.profile = action.payload.profile;
      })
      .addCase(editProfile.rejected, (state) => {
        state.loadingEditProfile = false;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.profile = action.payload.user;
      })
      .addCase(LogoutUser.fulfilled, (state) => {
        state.profile = null;
      });
  },
});

export default profileSlice.reducer;
