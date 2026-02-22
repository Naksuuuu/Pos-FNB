export const ROUTES = {
  PUBLIC: {
    HOME: "/",
    CATALOG: "/catalog",
    CATALOG_DETAIL: "/catalog/:catalogId",
    ORDER: "/order",
    PAYMENT: "/payment",
  },
  DASHBOARD: {
    HOME: "/dashboard",
    CASHIER: "/dashboard/cashier",
    INVENTORY: {
      MENU: "/dashboard/inventory/menu",
      MENU_CATEGORY: "/dashboard/inventory/menu/category",
      TABLE: "/dashboard/inventory/table",
    },
  },
};
