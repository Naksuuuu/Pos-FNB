import { apiUtils } from "@/Services/Common/Base";

const CATEGORY_ENDPOINT = "/dashboard/categories";

export const getAllCategories = async (params) => {
  const { search } = params;

  const queryParams = {
    search,
  };

  const response = await apiUtils.get(CATEGORY_ENDPOINT, { params: queryParams });
  return response.data;
};

export const createCategory = async (categoryData) => {
  const response = await apiUtils.post(CATEGORY_ENDPOINT, categoryData);
  return response.data;
};

export const editCategory = async (categoryId, categoryData) => {
  const response = await apiUtils.put(`${CATEGORY_ENDPOINT}/${categoryId}`, categoryData);
  return response.data;
};

export const deleteCategory = async (categoryId) => {
  const response = await apiUtils.delete(`${CATEGORY_ENDPOINT}/${categoryId}`);
  return response.data;
};
