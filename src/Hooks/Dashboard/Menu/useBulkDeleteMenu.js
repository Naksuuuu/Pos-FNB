import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import useFilterParams from "@/Hooks/Common/useFilterParams";

import { selectMenuBulkDeleteLoading } from "@/Redux/Features/Dashboard/Menu/MenuSelector";
import { bulkDeleteMenus, fetchMenus } from "@/Redux/Features/Dashboard/Menu/MenuSlice";

const useBulkDeleteMenu = () => {
  const { setFilters } = useFilterParams();
  const dispatch = useDispatch();
  const loading = useSelector(selectMenuBulkDeleteLoading);

  const bulkDelete = useCallback(
    async (menuIds) => {
      const newFilters = {
        page: 1,
      };
      const response = await dispatch(bulkDeleteMenus(menuIds)).unwrap();
      setFilters(newFilters);
      dispatch(fetchMenus(newFilters));

      return response;
    },
    [dispatch, setFilters],
  );

  return { bulkDelete, loading };
};

export default useBulkDeleteMenu;
