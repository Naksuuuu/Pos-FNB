import { Login, Logout } from "@/Services/Auth/Login/LoginService";
import { getUserData, getAuthToken, setAuthToken, setUserData, clearAllAuthData } from "@/Utils/sessionUtils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: getUserData(),
  token: getAuthToken(),
  isAuthenticated: !!getUserData() && !!getAuthToken(),
  isLoading: false,
  // error: null,
};

export const LoginUser = createAsyncThunk("login/loginUser", async (data, { rejectWithValue }) => {
  try {
    const response = await Login(data);
    if (response.success) {
      setAuthToken(response.data.auth.token);
      setUserData(response.data.user);
      return {
        user: response.data.user,
        token: response.data.auth.token,
      };
    }
    return rejectWithValue(response.message || "Failed to login");
  } catch (error) {
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
        // state.error = null;
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(LoginUser.rejected, (state) => {
        state.isLoading = false;
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
        // state.error = action.payload?.message || "Failed to login";
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
