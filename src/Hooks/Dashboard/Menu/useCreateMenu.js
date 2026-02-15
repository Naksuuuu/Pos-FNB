import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createMenu, fetchMenus } from "@/Redux/Features/Dashboard/Menu/MenuSlice";
import { selectMenuCreateLoading, selectMenuPagination } from "@/Redux/Features/Dashboard/Menu/MenuSelector";
import { selectAllCategories } from "@/Redux/Features/Dashboard/Category/CategorySelector";

const useCreateMenu = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectMenuCreateLoading);
  const pagination = useSelector(selectMenuPagination);
  const categories = useSelector(selectAllCategories);

  const categoryOptions = useMemo(() => {
    return categories.map((category) => ({ value: category.id, label: category.name }));
  }, [categories]);

  const create = useCallback(
    async (menuData) => {
      const response = await dispatch(createMenu(menuData)).unwrap();
      dispatch(
        fetchMenus({
          page: 1,
          per_page: pagination.per_page,
        }),
      );
      return response;
    },
    [dispatch, pagination.per_page],
  );

  return { create, loading, categoryOptions };
};

export default useCreateMenu;
