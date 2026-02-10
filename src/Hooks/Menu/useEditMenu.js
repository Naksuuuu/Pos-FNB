import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { editMenu, fetchMenus } from "@/Redux/Features/Menu/MenuSlice";
import { selectMenuEditError, selectMenuEditLoading } from "@/Redux/Features/Menu/MenuSelector";

const useEditMenu = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectMenuEditLoading);
  const errorMessage = useSelector(selectMenuEditError);

  const edit = useCallback(
    async (menuId, menuData) => {
      const response = await dispatch(editMenu([menuId, menuData])).unwrap();
      dispatch(fetchMenus()).unwrap();
      return response;
    },
    [dispatch],
  );

  return { edit, loading, errorMessage };
};

export default useEditMenu;
