import { useCallback, useEffect, useMemo } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { selectAllCatalogs, selectCatalogLoading } from "@/Redux/Features/Customer/Catalog/CatalogSelector";
import { fetchCatalogs } from "@/Redux/Features/Customer/Catalog/CatalogSlice";

const useDetailCatalog = () => {
  const dispatch = useDispatch();
  const catalogId = useParams().catalogId;
  const catalogs = useSelector(selectAllCatalogs);
  const loading = useSelector(selectCatalogLoading);

  const loadCatalogs = useCallback(async () => {
    await dispatch(fetchCatalogs());
  }, [dispatch]);

  useEffect(() => {
    if (catalogs.length === 0) {
      loadCatalogs();
    }
  }, [catalogs.length, loadCatalogs]);

  const catalog = useMemo(() => {
    return catalogs.find((item) => item.id.toString() === catalogId);
  }, [catalogs, catalogId]);

  return { catalog, loading };
};

export default useDetailCatalog;
