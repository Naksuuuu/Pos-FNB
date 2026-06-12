import { useMemo } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import CatalogService from "@/Features/Customer/Catalog/Services/CatalogService";
import { CUSTOMER_CATALOG_QUERY_KEYS } from "@/Features/Customer/Catalog/Constants/CatalogConstant";

const useDetailCatalog = () => {
  const catalogId = useParams().catalogId;
  const { data, isLoading } = useQuery({
    queryKey: CUSTOMER_CATALOG_QUERY_KEYS.list({}),
    queryFn: async () => {
      const response = await CatalogService.catalogs({});

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch catalogs");
      }

      return response.data;
    },
  });

  const catalogs = useMemo(() => data?.menus || [], [data?.menus]);
  const loading = isLoading;

  const catalog = useMemo(() => catalogs.find((item) => item.id.toString() === catalogId), [catalogs, catalogId]);

  return { catalog, loading };
};

export default useDetailCatalog;
