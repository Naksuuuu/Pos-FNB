import { apiUtils } from "@/Services/Common/Base";

const CUSTOM_OPTION_ENDPOINT = "/dashboard/custom-options";

const CustomOptionService = {
  customOptions: async (params = {}) => {
    const { page = 1, search, sort_by, sort_direction, per_page = 15 } = params;

    const queryParams = {
      page,
      search,
      per_page,
      sort_by,
      sort_direction,
    };

    const response = await apiUtils.get(CUSTOM_OPTION_ENDPOINT, { params: queryParams });
    return response.data;
  },

  create: async (payload) => {
    const response = await apiUtils.post(CUSTOM_OPTION_ENDPOINT, payload);
    return response.data;
  },

  edit: async (id, payload) => {
    const response = await apiUtils.put(`${CUSTOM_OPTION_ENDPOINT}/${id}`, payload);
    return response.data;
  },

  delete: async (id) => {
    const response = await apiUtils.delete(`${CUSTOM_OPTION_ENDPOINT}/${id}`);
    return response.data;
  },
};

export default CustomOptionService;
