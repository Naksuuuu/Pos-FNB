import { configureStore } from "@reduxjs/toolkit";

import menuReducer from "./Features/Dashboard/Menu/MenuSlice";
import categoryReducer from "./Features/Dashboard/Category/CategorySlice";
import diningTableReducer from "./Features/Dashboard/DiningTable/DiningTableSlice";
const store = configureStore({
  reducer: {
    menu: menuReducer,
    category: categoryReducer,
    diningTable: diningTableReducer,
  },
});
export default store;
