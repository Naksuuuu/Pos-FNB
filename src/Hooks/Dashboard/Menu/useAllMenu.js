import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectAllMenus, selectMenuError, selectMenuLoading, selectMenuPagination, selectMenuStatistic } from "@/Redux/Features/Dashboard/Menu/MenuSelector";
import { fetchMenus } from "@/Redux/Features/Dashboard/Menu/MenuSlice";
import { selectAllCategories } from "@/Redux/Features/Dashboard/Category/CategorySelector";
import { fetchCategories } from "@/Redux/Features/Dashboard/Category/CategorySlice";
import { CATEGORY_ID_OPTIONS } from "@/Constants/Dashboard/Menu/MenuConstant";

const useAllMenu = () => {
  const dispatch = useDispatch();
  const menus = useSelector(selectAllMenus);
  const loading = useSelector(selectMenuLoading);
  const errorMessage = useSelector(selectMenuError);
  const pagination = useSelector(selectMenuPagination);
  const categories = useSelector(selectAllCategories);
  const statistic = useSelector(selectMenuStatistic);

  const categoryOptions = useMemo(() => [...CATEGORY_ID_OPTIONS, ...categories.map((category) => ({ label: category.name, value: category.id }))], [categories]);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories({}));
    }
  }, [dispatch, categories.length]);

  const loadMenus = useCallback(
    async (params = {}) => {
      const { page, ...otherParams } = params;

      const safeParams = {
        page: parseInt(page) || 1,
        ...otherParams,
      };
      await dispatch(fetchMenus(safeParams));
    },
    [dispatch],
  );

  return { menus, loadMenus, loading, errorMessage, pagination, categoryOptions, statistic };
};

export default useAllMenu;
