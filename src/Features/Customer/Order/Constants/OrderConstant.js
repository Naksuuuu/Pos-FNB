const CUSTOMER_ORDER_QUERY_KEYS = {
  root: ["customer", "order"],
  create: () => ["customer", "order", "create"],
  history: (customerId) => ["customer", "order", "history", customerId],
  detail: (orderId) => ["customer", "order", "detail", orderId],
};

export { CUSTOMER_ORDER_QUERY_KEYS };
