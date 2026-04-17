import { useCallback, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import useFilterParams from "@/Hooks/useFilterParams";
import { CASHIER_QUERY_KEYS } from "@/Features/Dashboard/Cashier/Constants/CashierConstant";
import CashierService from "@/Features/Dashboard/Cashier/Services/CashierService";

const useCashierResources = () => {
  const { filters, updateFilters } = useFilterParams();

  const search = filters.search || "";
  const [optimisticSearch, setOptimisticSearch] = useState(search);

  const menuFilters = {
    search: filters.search || undefined,
    category_id: filters.category_id || undefined,
  };

  const { data: menusData, isLoading: loadingMenus } = useQuery({
    queryKey: CASHIER_QUERY_KEYS.menus(menuFilters),
    queryFn: async () => {
      const response = await CashierService.menus(menuFilters);

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch menus");
      }

      return response.data;
    },
  });

  const { data: categoriesData, isLoading: loadingCategories } = useQuery({
    queryKey: CASHIER_QUERY_KEYS.categories(),
    queryFn: async () => {
      const response = await CashierService.categories();

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch categories");
      }

      return response.data;
    },
  });

  const { data: tablesData, isLoading: loadingTables } = useQuery({
    queryKey: CASHIER_QUERY_KEYS.tables(),
    queryFn: async () => {
      const response = await CashierService.tables();

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch tables");
      }

      return response.data;
    },
  });

  const categoriesFromStore = categoriesData?.categories || [];
  const tablesFromStore = tablesData?.tables || [];
  const menus = menusData?.menus || [];

  const categories = useMemo(() => [{ value: "", label: "Semua" }, ...categoriesFromStore.map((category) => ({ value: category.id, label: category.name }))], [categoriesFromStore]);

  const tables = useMemo(
    () => [
      { label: "Pilih nomor meja", value: "" },
      ...tablesFromStore.map((table) => ({
        label: `${table.code} (${table.status === "available" ? "Tersedia" : "Terisi"})`,
        value: table.code,
      })),
    ],
    [tablesFromStore],
  );

  const timerRef = useRef(null);
  const handleSearchChange = useCallback(
    (e) => {
      const value = typeof e === "string" ? e : e.target.value;
      setOptimisticSearch(value);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        updateFilters({ search: value, page: 1 });
      }, 300);
    },
    [updateFilters],
  );

  const handleCategoryChange = useCallback(
    (categoryId) => {
      updateFilters({ category_id: categoryId });
    },
    [updateFilters],
  );

  return {
    filters,

    categories,
    menus,
    tables,

    optimisticSearch,

    loadingResources: loadingMenus || loadingCategories || loadingTables,

    handleCategoryChange,
    handleSearchChange,
  };
};

export default useCashierResources;
