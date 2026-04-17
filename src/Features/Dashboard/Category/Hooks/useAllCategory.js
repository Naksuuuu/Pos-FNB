import { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import useFilterParams from "@/Hooks/useFilterParams";

import CategoryService from "@/Features/Dashboard/Category/Services/CategoryService";
import { CATEGORY_QUERY_KEYS } from "@/Features/Dashboard/Category/Constants/CategoryConstant";

const useAllCategory = () => {
  const { filters, updateFilters, resetFilters } = useFilterParams();

  const categoryFilters = {
    search: filters.search || undefined,
    sort_by: filters.sort_by || undefined,
    sort_direction: filters.sort_direction || undefined,
  };

  const { data, isLoading, error } = useQuery({
    queryKey: CATEGORY_QUERY_KEYS.list(categoryFilters),
    queryFn: async () => {
      const response = await CategoryService.categories(categoryFilters);

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch categories");
      }

      return response.data;
    },
  });

  const categories = data?.categories || [];
  const statistic = data?.statistic || { total_category: 0 };
  const errorMessage = error?.message || null;
  const loading = isLoading;

  const search = filters.search || "";
  const [optimisticSearch, setOptimisticSearch] = useState(search);

  const showReset = !!(filters.sort_by || filters.sort_direction || search);

  const timerRef = useRef(null);
  const handleSearchChange = useCallback(
    (e) => {
      setOptimisticSearch(e.target.value);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        updateFilters({ search: e.target.value });
      }, 300);
    },
    [updateFilters],
  );

  const handleSortByChange = useCallback(
    (e) => {
      updateFilters({ sort_by: e });
    },
    [updateFilters],
  );

  const handleSortDirectionChange = useCallback(
    (e) => {
      updateFilters({ sort_direction: e });
    },
    [updateFilters],
  );

  const handleResetFilter = useCallback(() => {
    resetFilters();
  }, [resetFilters]);

  useEffect(() => {
    setOptimisticSearch(search);
  }, [search]);

  return {
    categories,
    loading,
    errorMessage,
    statistic,
    filters,
    showReset,
    optimisticSearch,
    handleSearchChange,
    handleSortByChange,
    handleSortDirectionChange,
    handleResetFilter,
  };
};

export default useAllCategory;
