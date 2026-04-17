import { useCallback, useRef, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import useFilterParams from "@/Hooks/useFilterParams";
import { ORDER_QUERY_KEYS } from "@/Features/Dashboard/Order/Constants/OrderConstant";
import OrderService from "@/Features/Dashboard/Order/Services/OrderService";

const useAllOrder = () => {
  const { filters, updateFilters, resetFilters } = useFilterParams();
  const [optimisticSearch, setOptimisticSearch] = useState("");
  const timerRef = useRef(null);

  const orderFilters = {
    page: Number(filters.page) || 1,
    per_page: Number(filters.per_page) || 15,
    search: filters.search || undefined,
    status: filters.status || undefined,
    date_filter: filters.date_filter || undefined,
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ORDER_QUERY_KEYS.list(orderFilters),
    queryFn: async () => {
      const response = await OrderService.orders(orderFilters);

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch orders");
      }

      return response.data;
    },
  });

  const orders = data?.orders || [];
  const pagination = data?.pagination || {};
  const statistic = data?.statistic || {};
  const search = filters.search || "";

  useEffect(() => {
    setOptimisticSearch(search);
  }, [search]);

  const handlePageChange = useCallback(
    (newPage) => {
      updateFilters({ page: newPage });
    },
    [updateFilters],
  );

  const handleStatusChange = useCallback(
    (value) => {
      updateFilters({ status: value, page: 1 });
    },
    [updateFilters],
  );

  const handleSearchChange = useCallback(
    (e) => {
      const value = typeof e === "string" ? e : e.target.value;
      setOptimisticSearch(value);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        updateFilters({ search: value, page: 1 });
      }, 500);
    },
    [updateFilters],
  );

  const handleSortDateChange = useCallback(
    (value) => {
      updateFilters({ date_filter: value, page: 1 });
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

  const showReset = !!(filters.status || filters.search || filters.date_filter);

  return {
    orders,
    loading: isLoading,
    errorMessage: error?.message,
    pagination,
    statistic,
    filters,
    optimisticSearch,
    showReset,
    handlePageChange,
    handleStatusChange,
    handleSearchChange,
    handleSortDateChange,
    handleResetFilter,
    handlePerPageChange,
  };
};

export default useAllOrder;
