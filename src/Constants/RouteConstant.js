export const ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
  },
  PUBLIC: {
    HOME: "/",
    CATALOG: "/catalog",
    CATALOG_DETAIL: "/catalog/:catalogId",
    ORDER: "/order",
    PAYMENT: "/payment",
    USER: "/user",
    PROFILE: "/user/profile",
    ORDER_HISTORY: "/user/order",
    ORDER_HISTORY_DETAIL: "/user/order/detail",
  },
  DASHBOARD: {
    HOME: "/dashboard",
    USER: "/dashboard/user",
    CASHIER: "/dashboard/cashier",
    SETTINGS: "/dashboard/settings",
    INVENTORY: {
      MENU: "/dashboard/inventory",
      CATEGORY: "/dashboard/inventory/category",
      TABLE: "/dashboard/inventory/table",
    },
    ORDER: "/dashboard/order",
    PROFILE: "/dashboard/profile",
  },
};
