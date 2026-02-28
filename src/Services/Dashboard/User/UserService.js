import { apiUtils } from "@/Services/Common/Base";

const USER_ENDPOINT = "/dashboard/users";

export const getAllUsers = async (params) => {
  const { search, sort_by, sort_direction, page } = params;

  const queryParams = {
    search,
    sort_by,
    sort_direction,
    page,
  };

  const response = await apiUtils.get(USER_ENDPOINT, { params: queryParams });
  return response.data;
};

export const createUser = async (userData) => {
  const response = await apiUtils.post(USER_ENDPOINT, userData);
  return response.data;
};

export const editUser = async (userId, userData) => {
  const response = await apiUtils.put(`${USER_ENDPOINT}/${userId}`, userData);
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await apiUtils.delete(`${USER_ENDPOINT}/${userId}`);
  return response.data;
};
