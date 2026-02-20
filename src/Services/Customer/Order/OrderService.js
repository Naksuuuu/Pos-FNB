import { apiUtils } from "@/Services/Common/Base";

const ORDER_ENDPOINT = "/dashboard/orders";

export const createOrder = async (orderData) => {
  const response = await apiUtils.post(ORDER_ENDPOINT, orderData);
  return response.data;
};
