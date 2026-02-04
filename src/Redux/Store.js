import menuReducer from "./Features/Menu/MenuSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    menu: menuReducer,
    // other reducers...
  },
});
export default store;
