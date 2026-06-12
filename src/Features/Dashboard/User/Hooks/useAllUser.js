import { useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import useFilterParams from "@/Hooks/useFilterParams";
import { USER_QUERY_KEYS } from "@/Features/Dashboard/User/Constants/UserConstant";
import UserService from "@/Features/Dashboard/User/Services/UserService";

const useAllUser = () => {
  const { filters, updateFilters, resetFilters } = useFilterParams();

  const userFilters = {
    page: Number(filters.page) || 1,
    per_page: Number(filters.per_page) || 15,
    search: filters.search || undefined,
    sort_by: filters.sort_by || undefined,
    sort_direction: filters.sort_direction || undefined,
    role: filters.role || undefined,
    date_filter: filters.date_filter || undefined,
  };

  const { data, isLoading, error } = useQuery({
    queryKey: USER_QUERY_KEYS.list(userFilters),
    queryFn: async () => {
      const response = await UserService.users(userFilters);

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch users");
      }

      return response.data;
    },
  });

  const users = useMemo(() => data?.users || [], [data?.users]);
  const pagination = useMemo(() => data?.pagination || {}, [data?.pagination]);
  const statistic = useMemo(() => data?.statistic || {}, [data?.statistic]);

  const handlePageChange = useCallback(
    (newPage) => {
      updateFilters({ page: newPage });
    },
    [updateFilters],
  );

  const handleSortByChange = useCallback(
    (value) => {
      updateFilters({ sort_by: value, page: 1 });
    },
    [updateFilters],
  );

  const handleSortDirectionChange = useCallback(
    (value) => {
      updateFilters({ sort_direction: value });
    },
    [updateFilters],
  );

  const handleSortRoleChange = useCallback(
    (value) => {
      updateFilters({ role: value, page: 1 });
    },
    [updateFilters],
  );

  const handleSortDateChange = useCallback(
    (value) => {
      updateFilters({ date_filter: value, page: 1 });
    },
    [updateFilters],
  );

  const handleSearchChange = useCallback(
    (value) => {
      updateFilters({ search: value, page: 1 });
    },
    [updateFilters],
  );

  const handlePerPageChange = useCallback(
    (value) => {
      updateFilters({ per_page: value, page: 1 });
    },
    [updateFilters],
  );

  const handleResetFilter = useCallback(() => {
    resetFilters();
  }, [resetFilters]);

  const showReset = !!(filters.search || filters.sort_by || filters.role || filters.date_filter);

  return {
    users,
    loading: isLoading,
    errorMessage: error?.message,
    pagination,
    statistic,
    filters,
    showReset,
    handlePageChange,
    handleSortByChange,
    handleSortDirectionChange,
    handleSortRoleChange,
    handleSortDateChange,
    handleSearchChange,
    handleResetFilter,
    handlePerPageChange,
  };
};

export default useAllUser;
