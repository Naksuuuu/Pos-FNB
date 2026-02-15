import { apiUtils } from "../Common/Base";

const DINING_TABLE_ENDPOINT = "/tables";

export const getAllDiningTables = async () => {
  const response = await apiUtils.get(DINING_TABLE_ENDPOINT);
  return response.data;
};

export const createDiningTable = async (tableData) => {
  const response = await apiUtils.post(DINING_TABLE_ENDPOINT, tableData);
  return response.data;
};
