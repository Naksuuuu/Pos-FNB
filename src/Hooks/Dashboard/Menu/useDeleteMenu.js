import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import useFilterParams from "@/Hooks/Common/useFilterParams";

import { deleteMenu, fetchMenus } from "@/Redux/Features/Dashboard/Menu/MenuSlice";
import { selectMenuDeleteLoading } from "@/Redux/Features/Dashboard/Menu/MenuSelector";

const useDeleteMenu = () => {
  const { setFilters } = useFilterParams();
  const dispatch = useDispatch();
  const loading = useSelector(selectMenuDeleteLoading);

  const deleteMenuById = useCallback(
    async (menuId) => {
      const response = await dispatch(deleteMenu(menuId)).unwrap();
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

  return { deleteMenuById, loading };
};

export default useDeleteMenu;
