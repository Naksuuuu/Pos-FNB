import { apiUtils } from "@/Services/Common/Base";

const CATALOG_ENDPOINT = "/dashboard/menus";

export const getAllCatalog = async () => {
  const defaultParams = {
    page: 1,
    per_page: 10000,
    search: "",
  };

  const response = await apiUtils.get(CATALOG_ENDPOINT, { params: defaultParams });
  return response.data;
};
