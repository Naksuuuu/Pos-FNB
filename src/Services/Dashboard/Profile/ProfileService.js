import { apiUtils } from "@/Services/Common/Base";

const ENDPOINT = "/dashboard/profile";
const ENDPOINT_PASSWORD = `${ENDPOINT}/password`;

export const profile = async () => {
  const response = await apiUtils.get(ENDPOINT);
  return response.data;
};

export const changePassword = async (data) => {
  const response = await apiUtils.put(ENDPOINT_PASSWORD, data);
  return response.data;
};

export const profileEdit = async (data) => {
  const response = await apiUtils.put(ENDPOINT, data);
  return response.data;
};
