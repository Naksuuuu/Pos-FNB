import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { editMenu, fetchMenus } from "@/Redux/Features/Menu/MenuSlice";

const useEditMenu = () => {
  const dispatch = useDispatch();

  const edit = useCallback(
    async (menuId, menuData) => {
      await dispatch(editMenu([menuId, menuData])).unwrap();
      await dispatch(fetchMenus()).unwrap();
    },
    [dispatch],
  );

  return { edit };
};

export default useEditMenu;
