import { configureStore } from "@reduxjs/toolkit";

import menuReducer from "./Features/Menu/MenuSlice";
import categoryReducer from "./Features/Category/CategorySlice";
import diningTableReducer from "./Features/DiningTable/DiningTableSlice";
const store = configureStore({
  reducer: {
    menu: menuReducer,
    category: categoryReducer,
    diningTable: diningTableReducer,
  },
});
export default store;
