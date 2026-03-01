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
  },
  DASHBOARD: {
    HOME: "/dashboard",
    USER: "/dashboard/user",
    CASHIER: "/dashboard/cashier",
    INVENTORY: {
      MENU: "/dashboard/inventory/menu",
      MENU_CATEGORY: "/dashboard/inventory/menu/category",
      TABLE: "/dashboard/inventory/table",
    },
    ORDER: "/dashboard/order",
    PROFILE: "/dashboard/profile",
  },
};
