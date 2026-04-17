const CASHIER_QUERY_KEYS = {
  root: ["dashboard", "cashier"],
  menus: (filters = {}) => ["dashboard", "cashier", "menus", filters],
  categories: () => ["dashboard", "cashier", "categories"],
  tables: () => ["dashboard", "cashier", "tables"],
  submittedOrders: (params = {}) => ["dashboard", "cashier", "submitted-orders", params],
};

export { CASHIER_QUERY_KEYS };
