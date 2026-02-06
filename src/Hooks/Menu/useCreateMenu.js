import { createMenus, fetchMenus } from "@/Redux/Features/Menu/MenuSlice";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

const useCreateMenu = () => {
  const dispatch = useDispatch();

  const createMenu = useCallback(
    async (menuData) => {
      const result = await dispatch(createMenus(menuData)).unwrap();
      await dispatch(fetchMenus()).unwrap();
      console.log(result);
    },
    [dispatch],
  );

  return { createMenu };
};

export default useCreateMenu;
