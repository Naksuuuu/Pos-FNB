import { configureStore } from "@reduxjs/toolkit";

import menuReducer from "./Features/Menu/MenuSlice";
import categoryReducer from "./Features/Category/CategorySlice";

const store = configureStore({
  reducer: {
    menu: menuReducer,
    category: categoryReducer,
  },
});
export default store;
