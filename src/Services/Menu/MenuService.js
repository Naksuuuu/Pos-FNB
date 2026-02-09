import { apiUtils } from "../Common/Base";

const MENU_ENDPOINT = "/menus";

export const getAllMenu = async () => {
  const response = await apiUtils.get(MENU_ENDPOINT);
  return response.data;
};

export const createMenu = async (menuData) => {
  const formData = new FormData();
  formData.append("image", menuData.image[0]);
  formData.append("name", menuData.name);
  formData.append("price", menuData.price);
  formData.append("stock", menuData.stock);
  formData.append("category_id", menuData.category_id);
  formData.append("description", menuData.description);
  formData.append("is_available", menuData.is_available);
  const response = await apiUtils.post(MENU_ENDPOINT, formData, {
    headers: { "Content-Type": undefined },
  });
  return response.data;
};

export const editMenu = async (menuId, menuData) => {
  const response = await apiUtils.put(`${MENU_ENDPOINT}/${menuId}`, menuData);
  return response.data;
};

export const uploadImageMenu = async (menuId, menuImage) => {
  const formData = new FormData();
  formData.append("image", menuImage[0]);

  const response = await apiUtils.post(`${MENU_ENDPOINT}/${menuId}/upload-image`, formData, {
    headers: { "Content-Type": undefined },
  });
  console.log(response);
  return response.data;
};

export const deleteMenu = async (menuId) => {
  const response = await apiUtils.delete(`${MENU_ENDPOINT}/${menuId}`);
  return response.data;
};
