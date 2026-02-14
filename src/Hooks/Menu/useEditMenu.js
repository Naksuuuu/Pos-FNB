import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { editMenu, fetchMenus } from "@/Redux/Features/Menu/MenuSlice";
import { selectMenuEditLoading, selectMenuPagination } from "@/Redux/Features/Menu/MenuSelector";
import { selectAllCategories } from "@/Redux/Features/Category/CategorySelector";

const useEditMenu = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectMenuEditLoading);
  const pagination = useSelector(selectMenuPagination);
  const categories = useSelector(selectAllCategories);

  const categoryOptions = useMemo(() => {
    return categories.map((category) => ({ value: category.id, label: category.name }));
  }, [categories]);

  const edit = useCallback(
    async (menuId, menuData) => {
      const response = await dispatch(editMenu([menuId, menuData])).unwrap();
      dispatch(
        fetchMenus({
          page: pagination.current_page,
        }),
      );
      return response;
    },
    [dispatch, pagination.current_page],
  );

  return { edit, loading, categoryOptions };
};

export default useEditMenu;
