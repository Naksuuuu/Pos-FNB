import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectAllCatalogs, selectCatalogLoading } from "@/Redux/Features/Customer/Catalog/CatalogSelector";
import { fetchCatalogs } from "@/Redux/Features/Customer/Catalog/CatalogSlice";

const useAllCatalog = () => {
  const dispatch = useDispatch();
  const catalogs = useSelector(selectAllCatalogs);
  const loading = useSelector(selectCatalogLoading);
  const storedItems = JSON.parse(sessionStorage.getItem("orderItems") || "[]");

  const orderItems = useMemo(() => storedItems, [storedItems]);

  const totalPrice = useMemo(() => orderItems.reduce((acc, item) => acc + item.price, 0), [orderItems]);

  const loadCatalogs = useCallback(() => {
    if (catalogs.length > 0) return;
    dispatch(fetchCatalogs());
  }, [dispatch, catalogs.length]);

  return { loadCatalogs, catalogs, loading, orderItems, totalPrice };
};

export default useAllCatalog;
