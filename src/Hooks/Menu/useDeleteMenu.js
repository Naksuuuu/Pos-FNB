import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { deleteMenu, fetchMenus } from "@/Redux/Features/Menu/MenuSlice";

const useDeleteMenu = () => {
  const dispatch = useDispatch();

  const deleteMenuById = useCallback(
    async (menuId) => {
      const result = await dispatch(deleteMenu(menuId)).unwrap();
      await dispatch(fetchMenus()).unwrap();
      console.log(result);
    },
    [dispatch],
  );

  return { deleteMenuById };
};

export default useDeleteMenu;
