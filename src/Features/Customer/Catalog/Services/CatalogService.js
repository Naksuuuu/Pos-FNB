import { apiUtils } from "@/Services/Common/Base";

const CATALOG_ENDPOINT = "/customer/menus";
const CUSTOMER_TABLES_ENDPOINT = "/customer/tables";

const CatalogService = {
  catalogs: async (params = {}) => {
    const { page = 1, search, category_id, per_page = 100 } = params;

    const queryParams = {
      page,
      search,
      per_page,
      is_available: 1,
      category_id,
    };

    const response = await apiUtils.get(CATALOG_ENDPOINT, { params: queryParams });

    return response.data;
  },

  tables: async (params = {}) => {
    const response = await apiUtils.get(CUSTOMER_TABLES_ENDPOINT, { params });
    return response.data;
  },
};

export default CatalogService;

//  catalogs: async () => {
//     const defaultParams = {
//       page: 1,
//       per_page: 100,
//       search: "",
//     };

//     const response = await apiUtils.get(CATALOG_ENDPOINT, { params: defaultParams });
//     return response.data;
//   },
