import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import useFilterParams from "@/Hooks/useFilterParams";
import CustomOptionService from "@/Features/Dashboard/CustomOption/Services/CustomOptionService";
import { CUSTOM_OPTION_QUERY_KEYS } from "@/Features/Dashboard/CustomOption/Constants/CustomOptionConstant";

const useAllCustomOption = () => {
  const { filters, updateFilters, resetFilters } = useFilterParams();

  const customOptionFilters = {
    page: Number(filters.page) || 1,
    per_page: Number(filters.per_page) || 15,
    search: filters.search || undefined,
    sort_by: filters.sort_by || undefined,
    sort_direction: filters.sort_direction || undefined,
  };

  const { data, isLoading, error } = useQuery({
    queryKey: CUSTOM_OPTION_QUERY_KEYS.list(customOptionFilters),
    queryFn: async () => {
      const response = await CustomOptionService.customOptions(customOptionFilters);

      if (!response.success) {
        throw new Error(response.message || "Gagal mengambil data opsi kustom");
      }

      return response.data;
    },
  });

  const customOptions = useMemo(() => {
    if (Array.isArray(data)) {
      return data;
    }
    return data?.custom_options || data?.options || data?.data || [];
  }, [data]);

  const statistic = useMemo(() => {
    return data?.statistic
      ? {
          total_custom_options: parseInt(data.statistic.total_custom_options || customOptions.length || 0),
        }
      : {
          total_custom_options: customOptions.length || 0,
        };
  }, [data?.statistic, customOptions.length]);

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
        total: customOptions.length,
        from: customOptions.length > 0 ? 1 : 0,
        to: customOptions.length,
        next_page: null,
        prev_page: null,
      };

  const search = filters.search || "";
  const [optimisticSearch, setOptimisticSearch] = useState(search);

  const showReset = !!(filters.sort_by || filters.sort_direction || search);
  const loading = isLoading;
  const errorMessage = error?.message || null;

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

  const handleSortByChange = useCallback(
    (e) => {
      updateFilters({ sort_by: e, page: 1 });
    },
    [updateFilters],
  );

  const handleSortDirectionChange = useCallback(
    (e) => {
      updateFilters({ sort_direction: e, page: 1 });
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
    customOptions,
    loading,
    errorMessage,
    pagination,
    statistic,
    filters,
    showReset,
    optimisticSearch,
    handlePageChange,
    handleSearchChange,
    handleSortByChange,
    handleSortDirectionChange,
    handleResetFilter,
    handlePerPageChange,
  };
};

export default useAllCustomOption;
