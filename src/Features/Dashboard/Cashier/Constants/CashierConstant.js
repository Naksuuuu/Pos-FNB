const CASHIER_QUERY_KEYS = {
  root: ["dashboard", "cashier"],
  menus: (filters = {}) => ["dashboard", "cashier", "menus", filters],
  categories: () => ["dashboard", "cashier", "categories"],
  tables: () => ["dashboard", "cashier", "tables"],
  submittedOrders: () => ["dashboard", "cashier", "submitted-orders"],
  members: (filters = {}) => ["dashboard", "cashier", "members", filters],
};

export { CASHIER_QUERY_KEYS };
