export const CUSTOMER_PROFILE_QUERY_KEYS = {
  all: () => ["customer-profile"],
  detail: () => [...CUSTOMER_PROFILE_QUERY_KEYS.all(), "detail"],
};
