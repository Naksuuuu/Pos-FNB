import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectAllMenus, selectMenuError, selectMenuLoading, selectMenuPagination } from "@/Redux/Features/Menu/MenuSelector";
import { fetchMenus } from "@/Redux/Features/Menu/MenuSlice";

const useAllMenu = () => {
  const dispatch = useDispatch();
  const menus = useSelector(selectAllMenus);
  const loading = useSelector(selectMenuLoading);
  const errorMessage = useSelector(selectMenuError);
  const pagination = useSelector(selectMenuPagination);

  const loadMenus = useCallback(
    (params = {}) => {
      const { page, ...otherParams } = params;

      const safeParams = {
        page: parseInt(page) || 1,
        ...otherParams,
      };

      dispatch(fetchMenus(safeParams));
    },
    [dispatch],
  );

  return { menus, loadMenus, loading, errorMessage, pagination };
};

export default useAllMenu;
