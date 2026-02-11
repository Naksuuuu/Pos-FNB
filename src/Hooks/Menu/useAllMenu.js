import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectAllMenus, selectMenuError, selectMenuLoading } from "@/Redux/Features/Menu/MenuSelector";
import { fetchMenus } from "@/Redux/Features/Menu/MenuSlice";

const useAllMenu = () => {
  const dispatch = useDispatch();
  const menus = useSelector(selectAllMenus);
  const loading = useSelector(selectMenuLoading);
  const errorMessage = useSelector(selectMenuError);

  // const { current_page, data: menus } = useMemo(() => menusData, [menusData]);
  // const { current_page, data: menus = [] } = menusData || {};

  const loadMenus = useCallback(() => {
    dispatch(fetchMenus());
  }, [dispatch]);

  useEffect(() => {
    loadMenus();
  }, [loadMenus]);

  return { menus, loadMenus, loading, errorMessage };
};

export default useAllMenu;
