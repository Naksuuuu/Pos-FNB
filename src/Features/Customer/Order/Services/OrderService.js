import { apiUtils } from "@/Services/Common/Base";

const ORDER_ENDPOINT = "/customer/orders";

const OrderService = {
  create: async (orderData) => {
    const response = await apiUtils.post(ORDER_ENDPOINT, orderData);
    return response.data;
  },

  getByCustomerId: async (customerId) => {
    const response = await apiUtils.get(`${ORDER_ENDPOINT}/${customerId}`);
    return response.data;
  },

  getByOrderId: async (orderId) => {
    const response = await apiUtils.get(`${ORDER_ENDPOINT}/detail/${orderId}`);
    return response.data;
  },
};

export default OrderService;
