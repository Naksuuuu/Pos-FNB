import { combineReducers, configureStore } from "@reduxjs/toolkit";

import menuReducer from "./Features/Dashboard/Menu/MenuSlice";
import categoryReducer from "./Features/Dashboard/Category/CategorySlice";
import diningTableReducer from "./Features/Dashboard/DiningTable/DiningTableSlice";
import catalogReducer from "./Features/Customer/Catalog/CatalogSlice";
import orderReducer from "./Features/Customer/Order/OrderSlice";
import DashboardOrderReducer from "./Features/Dashboard/Order/OrderSlice";
import userReducer from "./Features/Dashboard/User/UserSlice";
import authSlice from "./Features/Auth/Login/LoginSlice";
import profileReducer from "./Features/Dashboard/Profile/ProfileSlice";

const dashboardReducer = combineReducers({
  menu: menuReducer,
  category: categoryReducer,
  diningTable: diningTableReducer,
  order: DashboardOrderReducer,
  user: userReducer,
  profile: profileReducer,
});

const authReducer = combineReducers({
  auth: authSlice,
});

const customerReducer = combineReducers({
  catalog: catalogReducer,
  order: orderReducer,
});

const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    auth: authReducer,
    customer: customerReducer,
  },
});
export default store;
