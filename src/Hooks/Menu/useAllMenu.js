import { selectAllMenus } from "@/Redux/Features/Menu/MenuSelector";
import { fetchMenus } from "@/Redux/Features/Menu/MenuSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useAllMenu = () => {
  const dispatch = useDispatch();
  const menus = useSelector(selectAllMenus);

  useEffect(() => {
    dispatch(fetchMenus());
  }, [dispatch]);

  return { menus };
};

export default useAllMenu;
