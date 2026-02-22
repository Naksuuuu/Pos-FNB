import { apiUtils } from "@/Services/Common/Base";

const ORDER_ENDPOINT = "/dashboard/orders";

export const getAllOrders = async (params) => {
  const response = await apiUtils.get(ORDER_ENDPOINT, { params });
  return response.data;
};
