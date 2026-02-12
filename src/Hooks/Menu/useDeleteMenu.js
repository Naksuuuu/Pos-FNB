import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteMenu, fetchMenus } from "@/Redux/Features/Menu/MenuSlice";
import { selectMenuDeleteLoading } from "@/Redux/Features/Menu/MenuSelector";

const useDeleteMenu = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectMenuDeleteLoading);

  const deleteMenuById = useCallback(
    async (menuId) => {
      const response = await dispatch(deleteMenu(menuId)).unwrap();
      await dispatch(fetchMenus());
      return response;
    },
    [dispatch],
  );

  return { deleteMenuById, loading };
};

export default useDeleteMenu;
