import { apiUtils } from "@/Services/Common/Base";

const DINING_TABLE_ENDPOINT = "/dashboard/tables";

export const getAllDiningTables = async (params) => {
  const { search } = params;

  const queryParams = {
    code: search,
  };

  const response = await apiUtils.get(DINING_TABLE_ENDPOINT, { params: queryParams });
  return response.data;
};

export const createDiningTable = async (tableData) => {
  const response = await apiUtils.post(DINING_TABLE_ENDPOINT, tableData);
  return response.data;
};

export const editDiningTable = async (tableId, tableData) => {
  const response = await apiUtils.put(`${DINING_TABLE_ENDPOINT}/${tableId}`, tableData);
  return response.data;
};

export const deleteDiningTable = async (tableId) => {
  const response = await apiUtils.delete(`${DINING_TABLE_ENDPOINT}/${tableId}`);
  return response.data;
};
