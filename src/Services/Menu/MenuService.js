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
    console.log(error);
    throw error;
  }
};
