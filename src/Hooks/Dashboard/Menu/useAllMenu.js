import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectAllMenus, selectMenuError, selectMenuLoading, selectMenuPagination } from "@/Redux/Features/Dashboard/Menu/MenuSelector";
import { fetchMenus } from "@/Redux/Features/Dashboard/Menu/MenuSlice";
import { selectAllCategories } from "@/Redux/Features/Dashboard/Category/CategorySelector";
import { fetchCategories } from "@/Redux/Features/Dashboard/Category/CategorySlice";

const useAllMenu = () => {
  const dispatch = useDispatch();
  const menus = useSelector(selectAllMenus);
  const loading = useSelector(selectMenuLoading);
  const errorMessage = useSelector(selectMenuError);
  const pagination = useSelector(selectMenuPagination);
  const categories = useSelector(selectAllCategories);

  const loadMenus = useCallback(
    async (params = {}) => {
      const { page, ...otherParams } = params;

      const safeParams = {
        page: parseInt(page) || 1,
        ...otherParams,
      };
      await dispatch(fetchMenus(safeParams));
      dispatch(fetchCategories({}));
    },
    [dispatch],
  );

  return { menus, loadMenus, loading, errorMessage, pagination, categories };
};

export default useAllMenu;
