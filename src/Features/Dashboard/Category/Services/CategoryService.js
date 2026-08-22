import { apiUtils } from "@/Services/Common/Base";

const CATEGORY_ENDPOINT = "/dashboard/categories";

const CategoryService = {
  categories: async (params) => {
    const { search, sort_by, sort_direction } = params;

    const queryParams = {
      search,
      sort_by,
      sort_direction,
    };

    const response = await apiUtils.get(CATEGORY_ENDPOINT, { params: queryParams });
    return response.data;
  },

  create: async (categoryData) => {
    const response = await apiUtils.post(CATEGORY_ENDPOINT, categoryData);
    return response.data;
  },

  edit: async (categoryId, categoryData) => {
    const response = await apiUtils.put(`${CATEGORY_ENDPOINT}/${categoryId}`, categoryData);
    return response.data;
  },

  delete: async (categoryId) => {
    const response = await apiUtils.delete(`${CATEGORY_ENDPOINT}/${categoryId}`);
    return response.data;
  },

  bulkDelete: async (categoryIds) => {
    const response = await apiUtils.delete(CATEGORY_ENDPOINT, { data: { ids: categoryIds } });
    return response.data;
  },
};

export default CategoryService;
