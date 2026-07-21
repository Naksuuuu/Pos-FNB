import { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import useFilterParams from "@/Hooks/useFilterParams";

import RewardService from "@/Features/Dashboard/Reward/Services/RewardService";
import { REWARD_QUERY_KEYS } from "@/Features/Dashboard/Reward/Constants/RewardConstant";

const useAllReward = () => {
  const { filters, updateFilters, resetFilters } = useFilterParams();

  const rewardFilters = {
    page: filters.page ? Number(filters.page) : undefined,
    search: filters.search || undefined,
    category: filters.category || undefined,
    status: filters.status || undefined,
    sort_by: filters.sort_by || undefined,
    sort_direction: filters.sort_direction || undefined,
    per_page: filters.per_page ? Number(filters.per_page) : undefined,
  };

  const { data, isLoading, error } = useQuery({
    queryKey: REWARD_QUERY_KEYS.list(rewardFilters),
    queryFn: async () => {
      const response = await RewardService.rewards(rewardFilters);

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch rewards");
      }

      return response.data;
    },
  });

  const rewards = data?.rewards || [];
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
  const errorMessage = error?.message || null;
  const loading = isLoading;
  const statistic = data?.statistic || null;

  const search = filters.search || "";
  const [optimisticSearch, setOptimisticSearch] = useState(search);

  const showReset = !!(filters.sort_by || filters.sort_direction || filters.category || filters.status || search);

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

  const handleCategoryChange = useCallback(
    (e) => {
      updateFilters({ category: e, page: 1 });
    },
    [updateFilters],
  );

  const handleStatusChange = useCallback(
    (e) => {
      updateFilters({ status: e, page: 1 });
    },
    [updateFilters],
  );

  const handlePageChange = useCallback(
    (page) => {
      updateFilters({ page });
    },
    [updateFilters],
  );

  const handlePerPageChange = useCallback(
    (perPage) => {
      updateFilters({ per_page: perPage, page: 1 });
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
    rewards,
    loading,
    errorMessage,
    pagination,
    statistic,
    filters,
    showReset,
    optimisticSearch,
    handleSearchChange,
    handleSortByChange,
    handleSortDirectionChange,
    handleCategoryChange,
    handleStatusChange,
    handlePageChange,
    handlePerPageChange,
    handleResetFilter,
  };
};

export default useAllReward;
