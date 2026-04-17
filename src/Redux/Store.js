import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authSlice from "./Features/Auth/Login/LoginSlice";

const authReducer = combineReducers({
  auth: authSlice,
});

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
export default store;
