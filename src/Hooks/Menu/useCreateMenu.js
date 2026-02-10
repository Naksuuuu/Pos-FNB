import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createMenu, fetchMenus } from "@/Redux/Features/Menu/MenuSlice";
import { selectMenuCreateLoading } from "@/Redux/Features/Menu/MenuSelector";

const useCreateMenu = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectMenuCreateLoading);
  const errorMessage = useSelector(selectMenuCreateLoading);

  const create = useCallback(
    async (menuData) => {
      const response = await dispatch(createMenu(menuData)).unwrap();
      dispatch(fetchMenus()).unwrap();
      return response;
    },
    [dispatch],
  );

  return { create, loading, errorMessage };
};

export default useCreateMenu;
