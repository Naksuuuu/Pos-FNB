import { apiUtils } from "@/Services/Common/Base";

const ORDER_ENDPOINT = "/customer/orders";

const OrderService = {
  create: async (orderData) => {
    const response = await apiUtils.post(ORDER_ENDPOINT, orderData);
    console.log(response);
    return response.data;
  },
};

export default OrderService;
