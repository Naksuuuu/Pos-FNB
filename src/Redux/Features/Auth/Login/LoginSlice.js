import { Login, Logout, me } from "@/Services/Auth/Login/LoginService";
import { getUserData, getAuthToken, setAuthToken, setUserData, clearAllAuthData } from "@/Utils/sessionUtils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: getUserData(),
  token: getAuthToken(),
  isAuthenticated: !!getUserData() && !!getAuthToken(),
  isLoading: false,
};

export const LoginUser = createAsyncThunk("login/loginUser", async (data, { rejectWithValue }) => {
  try {
    const response = await Login(data);
    if (response.success) {
      const meResponse = await me();

      if (meResponse.status === 200) {
        setAuthToken(response.data.auth.token);
        setUserData(meResponse.data.user);
        return {
          user: meResponse.data.user,
          token: response.data.auth.token,
        };
      }
    }
    return rejectWithValue(response.message || "Failed to login");
  } catch (error) {
    clearAllAuthData();
    return rejectWithValue({
      message: error?.message || "Failed to login",
    });
  }
});

export const LogoutUser = createAsyncThunk("login/logoutUser", async (_, { rejectWithValue }) => {
  try {
    const token = getAuthToken();
    clearAllAuthData();
    const response = await Logout(token);
    return response;
  } catch (error) {
    return rejectWithValue({
      message: error?.message || "Failed to logout",
    });
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(LoginUser.pending, (state) => {
        state.isLoading = true;
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(LoginUser.rejected, (state) => {
        state.isLoading = false;
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(LogoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(LogoutUser.rejected, (state) => {
        state.isLoading = false;
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
