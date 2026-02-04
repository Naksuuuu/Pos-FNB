import { apiUtils } from "../Common/Base";

const MENU_ENDPOINT = "/menus";

export const getAllMenu = async () => {
  const response = await apiUtils.get(MENU_ENDPOINT);
  return response.data;
};
