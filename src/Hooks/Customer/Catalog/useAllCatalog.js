import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectAllCatalogs, selectCatalogLoading } from "@/Redux/Features/Customer/Catalog/CatalogSelector";
import { fetchCatalogs } from "@/Redux/Features/Customer/Catalog/CatalogSlice";

const useAllCatalog = () => {
  const dispatch = useDispatch();
  const catalogs = useSelector(selectAllCatalogs);
  const loading = useSelector(selectCatalogLoading);

  const loadCatalogs = useCallback(async () => {
    if (catalogs.length > 0) return;
    await dispatch(fetchCatalogs());
  }, [dispatch, catalogs]);

  return { loadCatalogs, catalogs, loading };
};

export default useAllCatalog;
