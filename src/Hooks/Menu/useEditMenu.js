import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { editMenu, fetchMenus } from "@/Redux/Features/Menu/MenuSlice";
import { selectMenuEditLoading, selectMenuPagination } from "@/Redux/Features/Menu/MenuSelector";

const useEditMenu = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectMenuEditLoading);
  const pagination = useSelector(selectMenuPagination);

  const edit = useCallback(
    async (menuId, menuData) => {
      const response = await dispatch(editMenu([menuId, menuData])).unwrap();
      dispatch(
        fetchMenus({
          page: pagination.current_page,
          per_page: pagination.per_page,
        }),
      );
      return response;
    },
    [dispatch, pagination.current_page, pagination.per_page],
  );

  return { edit, loading };
};

export default useEditMenu;
