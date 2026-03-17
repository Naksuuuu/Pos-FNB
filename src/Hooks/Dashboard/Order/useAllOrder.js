import useFilterParams from "@/Hooks/Common/useFilterParams";
import { selectAllOrders, selectOrderError, selectOrderLoading, selectOrderPagination, selectOrderStatistic } from "@/Redux/Features/Dashboard/Order/OrderSelector";
import { fetchOrders } from "@/Redux/Features/Dashboard/Order/OrderSlice";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useAllOrder = () => {
  const { filters, updateFilters, resetFilters } = useFilterParams();

  const dispatch = useDispatch();
  const orders = useSelector(selectAllOrders);
  const loading = useSelector(selectOrderLoading);
  const errorMessage = useSelector(selectOrderError);
  const pagination = useSelector(selectOrderPagination);
  const statistic = useSelector(selectOrderStatistic);

  const search = filters.search || "";
  const tanggal = filters.date_filter || null;

  const [optimisticSearch, setOptimisticSearch] = useState(search);

  const showReset = !!(filters.status || search || tanggal);

  const loadOrders = useCallback(
    (params = {}) => {
      const { page, ...otherParams } = params;

      const safeParams = {
        page: parseInt(page) || 1,
        ...otherParams,
      };
      dispatch(fetchOrders(safeParams));
    },
    [dispatch],
  );

  const handlePageChange = useCallback(
    (newPage) => {
      updateFilters({ page: newPage });
    },
    [updateFilters],
  );

  const handleStatusChange = useCallback(
    (value) => {
      updateFilters({ status: value });
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
      }, 500);
    },
    [updateFilters],
  );

  const handleResetFilter = useCallback(() => {
    resetFilters();
  }, [resetFilters]);

  const handleSortDateChange = useCallback(
    (e) => {
      updateFilters({ date_filter: e, page: 1 });
    },
    [updateFilters],
  );

  const handlePerPageChange = useCallback(
    (e) => {
      updateFilters({ per_page: Number(e), page: 1 });
    },
    [updateFilters],
  );

  useEffect(() => {
    setOptimisticSearch(search);
  }, [search]);

  useEffect(() => {
    loadOrders(filters);
  }, [loadOrders, filters]);

  return {
    orders,
    loading,
    errorMessage,
    pagination,
    statistic,
    filters,
    optimisticSearch,
    showReset,
    handlePageChange,
    handleStatusChange,
    handleSearchChange,
    handleResetFilter,
    handleSortDateChange,
    handlePerPageChange,
  };
};

export default useAllOrder;
