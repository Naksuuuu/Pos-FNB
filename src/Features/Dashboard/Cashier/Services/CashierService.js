import { apiUtils } from "@/Services/Common/Base";

const MENU_ENDPOINT = "/dashboard/cashier/menus";
const ORDER_ENDPOINT = "/dashboard/orders";
const STORE_ORDER_ENDPOINT = "/dashboard/cashier";
const PAYMENT_ENDPOINT = "/payments";
const CATEGORY_ENDPOINT = "/dashboard/cashier/categories";
const DINING_TABLE_ENDPOINT = "/dashboard/tables";

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

  orders: async (params) => {
    const { page = 1, per_page = 100, status = "submitted" } = params;

    const queryParams = {
      page,
      per_page,
      status,
    };

    const response = await apiUtils.get(ORDER_ENDPOINT, { params: queryParams });
    return response.data;
  },

  createOrder: async (payload) => {
    const response = await apiUtils.post(STORE_ORDER_ENDPOINT, payload);
    return response.data;
  },

  updateOrderStatus: async (orderId, payload) => {
    const body = {
      status: payload.status,
    };

    const response = await apiUtils.put(`${ORDER_ENDPOINT}/${orderId}`, body);
    return response.data;
  },

  updatePaymentStatus: async (orderId, payload) => {
    const response = await apiUtils.put(`/dashboard/cashier/orders/${orderId}/payment`, payload);
    return response.data;
  },

  paymentOrder: async (payload) => {
    const response = await apiUtils.post(PAYMENT_ENDPOINT, payload);
    return response.data;
  },
};

export default CashierService;
