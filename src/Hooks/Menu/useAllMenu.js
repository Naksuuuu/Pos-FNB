import { selectAllMenus } from "@/Redux/Features/Menu/MenuSelector";
import { fetchMenus } from "@/Redux/Features/Menu/MenuSlice";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useAllMenu = () => {
  const dispatch = useDispatch();
  const menus = useSelector(selectAllMenus);

  // const { current_page, data: menus } = useMemo(() => menusData, [menusData]);
  // const { current_page, data: menus = [] } = menusData || {};

  const loadMenus = useCallback(() => {
    dispatch(fetchMenus());
  }, [dispatch]);

  useEffect(() => {
    loadMenus();
  }, [loadMenus]);

  return { menus };
};

export default useAllMenu;
