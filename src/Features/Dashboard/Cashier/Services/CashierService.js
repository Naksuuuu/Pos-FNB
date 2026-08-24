import { apiUtils } from "@/Services/Common/Base";

const MENU_ENDPOINT = "/dashboard/cashier/menus";
const ORDER_ENDPOINT = "/dashboard/cashier/payments";
const STORE_ORDER_ENDPOINT = "/dashboard/cashier";
const CATEGORY_ENDPOINT = "/dashboard/cashier/categories";
const DINING_TABLE_ENDPOINT = "/dashboard/tables";
const UPDATE_ORDER_PAYMENT_ENDPOINT = (orderId) => `/dashboard/cashier/orders/${orderId}/payment`;

const CashierService = {
  menus: async (params = {}) => {
    const { search, category_id } = params;

    const queryParams = {
      search,
      is_available: 1,
      category_id,
    };

    const response = await apiUtils.get(MENU_ENDPOINT, { params: queryParams });

    return response.data;
  },

  categories: async () => {
    const response = await apiUtils.get(CATEGORY_ENDPOINT);
    return response.data;
  },

  tables: async () => {
    const queryParams = {
      page: 1,
      status: "available",
      per_page: 100,
      sort_direction: "asc",
    };

    const response = await apiUtils.get(DINING_TABLE_ENDPOINT, { params: queryParams });
    return response.data;
  },

  orders: async () => {
    const response = await apiUtils.get(ORDER_ENDPOINT);
    return response.data;
  },

  createOrder: async (payload) => {
    const response = await apiUtils.post(STORE_ORDER_ENDPOINT, payload);
    return response.data;
  },

  updatePaymentStatus: async (orderId, payload) => {
    const response = await apiUtils.put(UPDATE_ORDER_PAYMENT_ENDPOINT(orderId), payload);
    return response.data;
  },

  members: async (params = {}) => {
    const { search } = params;
    const response = await apiUtils.get("/dashboard/cashier/members", { params: { search } });
    return response.data;
  },

  createMember: async (payload) => {
    const response = await apiUtils.post("/dashboard/cashier/members", payload);
    return response.data;
  },

  rewardClaims: async (params = {}) => {
    const { page = 1, search, status, sort_by, sort_direction, per_page = 15 } = params;

    const queryParams = {
      page,
      search,
      status,
      per_page,
      sort_by,
      sort_direction,
    };

    const response = await apiUtils.get("/dashboard/cashier/rewards/claims", { params: queryParams });
    return response.data;
  },

  approveRewardClaim: async (claimId) => {
    const response = await apiUtils.post(`/dashboard/cashier/rewards/claims/${claimId}/approve`);
    return response.data;
  },

  rejectRewardClaim: async (claimId, payload = { notes: "Klaim ditolak oleh kasir" }) => {
    const response = await apiUtils.post(`/dashboard/cashier/rewards/claims/${claimId}/reject`, payload);
    return response.data;
  },
};

export default CashierService;
