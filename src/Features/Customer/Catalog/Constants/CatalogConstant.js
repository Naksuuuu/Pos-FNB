const CUSTOMER_CATALOG_QUERY_KEYS = {
  root: ["customer", "catalog"],
  lists: () => ["customer", "catalog", "list"],
  list: (filters = {}) => ["customer", "catalog", "list", filters],
};

export { CUSTOMER_CATALOG_QUERY_KEYS };
