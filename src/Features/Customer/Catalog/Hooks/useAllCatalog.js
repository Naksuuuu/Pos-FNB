import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import CatalogService from "@/Features/Customer/Catalog/Services/CatalogService";
import { CUSTOMER_CATALOG_QUERY_KEYS } from "@/Features/Customer/Catalog/Constants/CatalogConstant";

const useAllCatalog = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: CUSTOMER_CATALOG_QUERY_KEYS.list({}),
    queryFn: async () => {
      const response = await CatalogService.catalogs({});

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch catalogs");
      }

      return response.data;
    },
  });

  const catalogs = data?.menus || [];
  const loading = isLoading;
  const storedItems = JSON.parse(sessionStorage.getItem("orderItems") || "[]");

  const orderItems = useMemo(() => storedItems, [storedItems]);

  const totalPrice = useMemo(() => orderItems.reduce((acc, item) => acc + item.price, 0), [orderItems]);

  const loadCatalogs = refetch;

  return { loadCatalogs, catalogs, loading, orderItems, totalPrice };
};

export default useAllCatalog;
