import { createSlice } from "@reduxjs/toolkit";

import { getUserData, getAuthToken } from "@/Utils/sessionUtils";

const initialState = {
  user: getUserData(),
  token: getAuthToken(),
  isAuthenticated: !!getUserData() && !!getAuthToken(),
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthLoading: (state, action) => {
      state.isLoading = Boolean(action.payload);
    },
    setCredentials: (state, action) => {
      state.isLoading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    clearCredentials: (state) => {
      state.isLoading = false;
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAuthLoading, setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;
