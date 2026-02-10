import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { createMenus, fetchMenus } from "@/Redux/Features/Menu/MenuSlice";

const useCreateMenu = () => {
  const dispatch = useDispatch();

  const createMenu = useCallback(
    async (menuData) => {
      await dispatch(createMenus(menuData)).unwrap();
      await dispatch(fetchMenus()).unwrap();
    },
    [dispatch],
  );

  return { createMenu };
};

export default useCreateMenu;
