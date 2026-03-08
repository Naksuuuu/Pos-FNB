import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useFilterParams from "@/Hooks/Common/useFilterParams";

import {
  selectAllDiningTables,
  selectDiningTableError,
  selectDiningTableLoading,
  selectDiningTablePagination,
  selectDiningTableStatistic,
} from "@/Redux/Features/Dashboard/DiningTable/DiningTableSelector";
import { fetchDiningTables } from "@/Redux/Features/Dashboard/DiningTable/DiningTableSlice";

const useAllDiningTable = () => {
  const { filters, updateFilters, resetFilters } = useFilterParams();

  const dispatch = useDispatch();
  const diningTables = useSelector(selectAllDiningTables);
  const loading = useSelector(selectDiningTableLoading);
  const errorMessage = useSelector(selectDiningTableError);
  const pagination = useSelector(selectDiningTablePagination);
  const statistic = useSelector(selectDiningTableStatistic);

  const search = filters.search || "";
  const [optimisticSearch, setOptimisticSearch] = useState(search);

  const showReset = !!(filters.sort_direction || filters.status || search);

  const loadDiningTables = useCallback(
    async (params = {}) => {
      dispatch(fetchDiningTables(params));
    },
    [dispatch],
  );

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

  const handleResetFilter = useCallback(() => {
    resetFilters();
  }, [resetFilters]);

  useEffect(() => {
    setOptimisticSearch(search);
  }, [search]);

  useEffect(() => {
    loadDiningTables(filters);
  }, [filters, loadDiningTables]);

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
  };
};

export default useAllDiningTable;
