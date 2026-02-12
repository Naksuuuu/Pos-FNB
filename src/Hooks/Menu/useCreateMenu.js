import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createMenu, fetchMenus } from "@/Redux/Features/Menu/MenuSlice";
import { selectMenuCreateLoading, selectMenuPagination } from "@/Redux/Features/Menu/MenuSelector";

const useCreateMenu = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectMenuCreateLoading);
  const pagination = useSelector(selectMenuPagination);

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
    [dispatch, pagination.current_page, pagination.per_page],
  );

  return { create, loading };
};

export default useCreateMenu;
