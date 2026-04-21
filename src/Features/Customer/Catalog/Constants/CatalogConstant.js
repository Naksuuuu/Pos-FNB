const CUSTOMER_CATALOG_QUERY_KEYS = {
  root: ["customer", "catalog"],
  lists: () => ["customer", "catalog", "list"],
  list: (filters = {}) => ["customer", "catalog", "list", filters],
  tables: () => ["customer", "catalog", "tables"],
};

export { CUSTOMER_CATALOG_QUERY_KEYS };
