import { apiUtils } from "@/Services/Common/Base";

const USER_ENDPOINT = "/dashboard/users";

const UserService = {
  users: async (params) => {
    const { search, sort_by, sort_direction, page } = params;

    const queryParams = {
      search,
      sort_by,
      sort_direction,
      page,
    };

    const response = await apiUtils.get(USER_ENDPOINT, { params: queryParams });
    return response.data;
  },

  create: async (userData) => {
    const response = await apiUtils.post(USER_ENDPOINT, userData);
    return response.data;
  },

  edit: async (userId, userData) => {
    const response = await apiUtils.put(`${USER_ENDPOINT}/${userId}`, userData);
    return response.data;
  },

  delete: async (userId) => {
    const response = await apiUtils.delete(`${USER_ENDPOINT}/${userId}`);
    return response.data;
  },
};

export default UserService;
