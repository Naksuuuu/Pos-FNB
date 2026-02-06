import { apiUtils } from "../Common/Base";

const MENU_ENDPOINT = "/menus";

export const getAllMenu = async () => {
  const response = await apiUtils.get(MENU_ENDPOINT);
  // console.log(response.data);
  return response.data;
};

export const createMenu = async (menuData) => {
  try {
    const response = await apiUtils.post(MENU_ENDPOINT, menuData);
    return response.data;
  } catch (error) {
    // console.log(error);
    // throw error;
    return error;
  }
};

export const deleteMenu = async (menuId) => {
  try {
    const response = await apiUtils.delete(`${MENU_ENDPOINT}/${menuId}`);
    return response.data;
  } catch (error) {
    // console.log(error);
    // throw error;
    return error;
  }
};
