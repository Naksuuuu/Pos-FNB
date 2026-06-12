export const ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
  },
  PUBLIC: {
    HOME: "/",
    CATALOG: "/catalog",
    CATALOG_DETAIL: "/catalog/:catalogId",
    ORDER: "/order",
    PAYMENT: "/payment",
    PROFILE: "/profile",
    ORDER_HISTORY: "/profile/order-history",
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
