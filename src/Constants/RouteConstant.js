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
    REWARDS: "/rewards",
    MY_REWARDS: "/user/rewards",
  },
  DASHBOARD: {
    HOME: "/dashboard",
    USER: "/dashboard/users",
    CASHIER: "/dashboard/cashier",
    SETTINGS: "/dashboard/settings",
    INVENTORY: {
      MENU: "/dashboard/inventory",
      CATEGORY: "/dashboard/inventory/category",
      TABLE: "/dashboard/inventory/table",
    },
    ORDER: "/dashboard/orders",
    PROFILE: "/dashboard/profile",
    REWARD: "/dashboard/rewards",
    CUSTOM: "/dashboard/custom-options",
  },
};
