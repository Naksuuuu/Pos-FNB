import { apiUtils } from "@/Services/Common/Base";

const ORDER_ENDPOINT = "/dashboard/orders";

export const getAllOrders = async (params) => {
  const { page, search, tanggal, status } = params;
  const queryParams = {
    page,
    search,
    tanggal,
    status,
    per_page: 15,
  };

  const response = await apiUtils.get(ORDER_ENDPOINT, { params: queryParams });
  return response.data;
};
