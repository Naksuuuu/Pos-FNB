import { apiUtils } from "@/Services/Common/Base";

const ORDER_ENDPOINT = "/dashboard/orders";

const OrderService = {
  orders: async (params) => {
    const { page = 1, search, status, date_filter, per_page } = params;
    const queryParams = {
      page,
      search,
      status,
      date_filter,
      per_page,
    };

    const response = await apiUtils.get(ORDER_ENDPOINT, { params: queryParams });
    return response.data;
  },
};

export default OrderService;
