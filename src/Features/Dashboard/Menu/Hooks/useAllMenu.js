import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import useFilterParams from "@/Hooks/useFilterParams";
import { CATEGORY_ID_OPTIONS, MENU_QUERY_KEYS } from "@/Features/Dashboard/Menu/Constants/MenuConstant";
import MenuService from "@/Features/Dashboard/Menu/Services/MenuService";
import CategoryService from "@/Features/Dashboard/Category/Services/CategoryService";
import { CATEGORY_QUERY_KEYS } from "@/Features/Dashboard/Category/Constants/CategoryConstant";

const useAllMenu = () => {
  const { filters, updateFilters, resetFilters } = useFilterParams();

  const menuFilters = {
    page: Number(filters.page) || 1,
    per_page: Number(filters.per_page) || 15,
    search: filters.search || undefined,
    sort_by: filters.sort_by || undefined,
    sort_direction: filters.sort_direction || undefined,
    is_available: filters.is_available || undefined,
    category_id: filters.category_id || undefined,
  };

  const { data, isLoading, error } = useQuery({
    queryKey: MENU_QUERY_KEYS.list(menuFilters),
    queryFn: async () => {
      const response = await MenuService.menus(menuFilters);

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch menus");
      }

      return response.data;
    },
  });

  const { data: categoriesData } = useQuery({
    queryKey: CATEGORY_QUERY_KEYS.list({}),
    queryFn: async () => {
      const response = await CategoryService.categories({});

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch categories");
      }

      return response.data;
    },
  });

  const categories = categoriesData?.categories || [];
  const menus = data?.menus || [];
  const statistic = data?.statistic
    ? {
        total_menu: parseInt(data.statistic.total_menu),
        available_count: parseInt(data.statistic.available_count),
        not_available_count: parseInt(data.statistic.not_available_count),
      }
    : {
        total_menu: 0,
        available_count: 0,
        not_available_count: 0,
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

  const categoryOptions = useMemo(() => [...CATEGORY_ID_OPTIONS, ...categories.map((category) => ({ label: category.name, value: category.id }))], [categories]);

  const search = filters.search || "";
  const [optimisticSearch, setOptimisticSearch] = useState(search);

  const showReset = !!(filters.sort_by || filters.sort_direction || filters.is_available || filters.category_id || search);

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

  const handleIsAvailableChange = useCallback(
    (e) => {
      updateFilters({ is_available: e });
    },
    [updateFilters],
  );

  const handleCategoryIdChange = useCallback(
    (e) => {
      updateFilters({ category_id: e });
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
    menus,
    loading,
    errorMessage,
    pagination,
    categoryOptions,
    statistic,
    filters,
    showReset,
    optimisticSearch,
    handlePageChange,
    handleSearchChange,
    handleSortByChange,
    handleSortDirectionChange,
    handleIsAvailableChange,
    handleCategoryIdChange,
    handleResetFilter,
    handlePerPageChange,
  };
};

export default useAllMenu;
