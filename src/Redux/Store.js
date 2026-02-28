import { combineReducers, configureStore } from "@reduxjs/toolkit";

import menuReducer from "./Features/Dashboard/Menu/MenuSlice";
import categoryReducer from "./Features/Dashboard/Category/CategorySlice";
import diningTableReducer from "./Features/Dashboard/DiningTable/DiningTableSlice";
import catalogReducer from "./Features/Customer/Catalog/CatalogSlice";
import orderReducer from "./Features/Customer/Order/OrderSlice";
import DashboardOrderReducer from "./Features/Dashboard/Order/OrderSlice";
import userReducer from "./Features/Dashboard/User/UserSlice";

const dashboardReducer = combineReducers({
  menu: menuReducer,
  category: categoryReducer,
  diningTable: diningTableReducer,
  order: DashboardOrderReducer,
  user: userReducer,
});

const customerReducer = combineReducers({
  catalog: catalogReducer,
  order: orderReducer,
});

const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    customer: customerReducer,
  },
});
export default store;
