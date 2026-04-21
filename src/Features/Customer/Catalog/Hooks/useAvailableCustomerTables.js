import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import CatalogService from "@/Features/Customer/Catalog/Services/CatalogService";
import { CUSTOMER_CATALOG_QUERY_KEYS } from "@/Features/Customer/Catalog/Constants/CatalogConstant";

const useAvailableCustomerTables = () => {
  const { data, isLoading } = useQuery({
    queryKey: CUSTOMER_CATALOG_QUERY_KEYS.tables(),
    queryFn: async () => {
      const response = await CatalogService.tables();

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch tables");
      }

      return response.data;
    },
  });

  const tables = useMemo(() => data?.tables || [], [data?.tables]);

  return {
    tables,
    loadingTables: isLoading,
  };
};

export default useAvailableCustomerTables;
