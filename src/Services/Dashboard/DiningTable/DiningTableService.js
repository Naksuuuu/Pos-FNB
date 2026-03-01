import { apiUtils } from "@/Services/Common/Base";

const DINING_TABLE_ENDPOINT = "/dashboard/tables";

const DiningTableService = {
  tables: async (params) => {
    const { page = 1, search, status, sort_direction } = params;

    const queryParams = {
      page,
      search,
      status,
      per_page: 15,
      sort_direction,
    };

    const response = await apiUtils.get(DINING_TABLE_ENDPOINT, { params: queryParams });
    return response.data;
  },

  create: async (tableData) => {
    const response = await apiUtils.post(DINING_TABLE_ENDPOINT, tableData);
    return response.data;
  },

  edit: async (tableId, tableData) => {
    const response = await apiUtils.put(`${DINING_TABLE_ENDPOINT}/${tableId}`, tableData);
    return response.data;
  },

  delete: async (tableId) => {
    const response = await apiUtils.delete(`${DINING_TABLE_ENDPOINT}/${tableId}`);
    return response.data;
  },
};

export default DiningTableService;
