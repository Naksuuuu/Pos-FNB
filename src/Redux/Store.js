import { configureStore } from "@reduxjs/toolkit";

import menuReducer from "./Features/Menu/MenuSlice";

const store = configureStore({
  reducer: {
    menu: menuReducer,
    // other reducers...
  },
});
export default store;
