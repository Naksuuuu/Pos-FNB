import { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import useFilterParams from "@/Hooks/useFilterParams";

import DiningTableService from "@/Features/Dashboard/DiningTable/Services/DiningTableService";
import { DINING_TABLE_QUERY_KEYS } from "@/Features/Dashboard/DiningTable/Constants/DiningTableConstant";

const useAllDiningTable = () => {
  const { filters, updateFilters, resetFilters } = useFilterParams();

  const diningTableFilters = {
    page: Number(filters.page) || 1,
    per_page: Number(filters.per_page) || 15,
    search: filters.search || undefined,
    status: filters.status || undefined,
    sort_direction: filters.sort_direction || undefined,
  };

  const { data, isLoading, error } = useQuery({
    queryKey: DINING_TABLE_QUERY_KEYS.list(diningTableFilters),
    queryFn: async () => {
      const response = await DiningTableService.tables(diningTableFilters);

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch dining tables");
      }

      return response.data;
    },
  });

  const diningTables = data?.tables || [];
  const statistic = data?.statistic
    ? {
        available_count: parseInt(data.statistic.available_count),
        occupied_count: parseInt(data.statistic.occupied_count),
        total_table: parseInt(data.statistic.total_table),
      }
    : {
        available_count: 0,
        occupied_count: 0,
        total_table: 0,
      };
  const pagination = data?.pagination
    ? {
        current_page: parseInt(data.pagination.current_page),
        last_page: parseInt(data.pagination.last_page),
        per_page: parseInt(data.pagination.per_page),
        total: parseInt(data.pagination.total),
        from: parseInt(data.pagination.from),
        to: parseInt(data.pagination.to),
        next_page: data.pagination.next_page ? parseInt(data.pagination.next_page) : null,
        prev_page: data.pagination.prev_page ? parseInt(data.pagination.prev_page) : null,
      }
    : {
        current_page: 1,
        last_page: 1,
        per_page: 15,
        total: 0,
        from: 0,
        to: 0,
        next_page: null,
        prev_page: null,
      };
  const loading = isLoading;
  const errorMessage = error?.message || null;

  const search = filters.search || "";
  const [optimisticSearch, setOptimisticSearch] = useState(search);

  const showReset = !!(filters.sort_direction || filters.status || search);

  const handlePageChange = useCallback(
    (newPage) => {
      updateFilters({ page: newPage });
    },
    [updateFilters],
  );

  const timerRef = useRef(null);
  const handleSearchChange = useCallback(
    (e) => {
      setOptimisticSearch(e.target.value);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        updateFilters({ search: e.target.value, page: 1 });
      }, 300);
    },
    [updateFilters],
  );

  const handleSortDirectionChange = useCallback(
    (e) => {
      updateFilters({ sort_direction: e, page: 1 });
    },
    [updateFilters],
  );

  const handleStatusChange = useCallback(
    (e) => {
      updateFilters({ status: e, page: 1 });
    },
    [updateFilters],
  );

  const handlePerPageChange = useCallback(
    (e) => {
      updateFilters({ per_page: Number(e), page: 1 });
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
    diningTables,
    loading,
    errorMessage,
    pagination,
    statistic,
    filters,
    showReset,
    optimisticSearch,
    handlePageChange,
    handleSearchChange,
    handleSortDirectionChange,
    handleStatusChange,
    handleResetFilter,
    handlePerPageChange,
  };
};

export default useAllDiningTable;
