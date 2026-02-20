import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CATEGORY_ID_OPTIONS, IS_AVAILABLE_OPTIONS, SORT_DIRECTION_OPTIONS, SORY_BY_OPTIONS } from "@/Constants/Dashboard/Menu/MenuConstant";

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

  const isAvailableOptions = useMemo(() => IS_AVAILABLE_OPTIONS, []);
  const sortByOptions = useMemo(() => SORY_BY_OPTIONS, []);
  const sortDirectionOptions = useMemo(() => SORT_DIRECTION_OPTIONS, []);
  const categoryOptions = useMemo(() => [...CATEGORY_ID_OPTIONS, ...categories.map((category) => ({ label: category.name, value: category.id }))], [categories]);

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

  return { menus, loadMenus, loading, errorMessage, pagination, isAvailableOptions, sortByOptions, sortDirectionOptions, categoryOptions };
};

export default useAllMenu;
