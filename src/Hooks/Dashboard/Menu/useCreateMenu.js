import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import useFilterParams from "@/Hooks/Common/useFilterParams";

import { createMenu, fetchMenus } from "@/Redux/Features/Dashboard/Menu/MenuSlice";
import { selectMenuCreateLoading } from "@/Redux/Features/Dashboard/Menu/MenuSelector";
import { selectAllCategories } from "@/Redux/Features/Dashboard/Category/CategorySelector";

const useCreateMenu = () => {
  const { setFilters } = useFilterParams();
  const dispatch = useDispatch();
  const loading = useSelector(selectMenuCreateLoading);
  const categories = useSelector(selectAllCategories);

  const categoryOptions = useMemo(() => {
    return categories.map((category) => ({ value: category.id, label: category.name }));
  }, [categories]);

  const create = useCallback(
    async (menuData) => {
      const response = await dispatch(createMenu(menuData)).unwrap();
      setFilters({
        page: 1,
      });
      dispatch(
        fetchMenus({
          page: 1,
        }),
      );
      return response;
    },
    [dispatch, setFilters],
  );

  return { create, loading, categoryOptions };
};

export default useCreateMenu;
