import { apiUtils } from "@/Services/Common/Base";

const MENU_ENDPOINT = "/dashboard/menus";

const MenuService = {
  menus: async (params = {}) => {
    const { page = 1, search, sort_by, sort_direction, is_available, category_id, per_page } = params;

    const queryParams = {
      page,
      search,
      per_page,
      sort_by,
      sort_direction,
      is_available,
      category_id,
    };

    const response = await apiUtils.get(MENU_ENDPOINT, { params: queryParams });
    return response.data;
  },

  create: async (menuData) => {
    const formData = new FormData();
    formData.append("image", menuData.image[0]);
    formData.append("name", menuData.name);
    formData.append("price", menuData.price);
    formData.append("hpp", menuData.hpp !== undefined && menuData.hpp !== null ? menuData.hpp : 0);
    formData.append("stock", menuData.stock);
    formData.append("category_id", menuData.category_id);
    formData.append("description", menuData.description);
    formData.append("is_available", menuData.is_available);
    const response = await apiUtils.post(MENU_ENDPOINT, formData, {
      headers: { "Content-Type": undefined },
    });
    return response.data;
  },

  edit: async (menuId, menuData) => {
    const response = await apiUtils.put(`${MENU_ENDPOINT}/${menuId}`, menuData);
    return response.data;
  },

  uploadImage: async (menuId, menuImage) => {
    const formData = new FormData();
    formData.append("image", menuImage[0]);

    const response = await apiUtils.post(`${MENU_ENDPOINT}/${menuId}/upload-image`, formData, {
      headers: { "Content-Type": undefined },
    });
    return response.data;
  },

  delete: async (menuId) => {
    const response = await apiUtils.delete(`${MENU_ENDPOINT}/${menuId}`);
    return response.data;
  },

  bulkDelete: async (menuIds) => {
    const response = await apiUtils.delete(MENU_ENDPOINT, { data: { ids: menuIds } });
    return response.data;
  },
};

export default MenuService;
