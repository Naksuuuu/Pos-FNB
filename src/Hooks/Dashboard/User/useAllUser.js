import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useFilterParams from "@/Hooks/Common/useFilterParams";

import { fetchUsers } from "@/Redux/Features/Dashboard/User/UserSlice";
import { selectAllUsers, selectUserError, selectUserLoading, selectUserStatistic, selectUserPagination } from "@/Redux/Features/Dashboard/User/UserSelector";

const useAllUser = () => {
  const { filters, updateFilters, resetFilters } = useFilterParams();
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const loading = useSelector(selectUserLoading);
  const errorMessage = useSelector(selectUserError);
  const statistic = useSelector(selectUserStatistic);
  const pagination = useSelector(selectUserPagination);

  const search = filters.search || "";
  const [optimisticSearch, setOptimisticSearch] = useState(search);

  const showReset = !!(filters.sort_by || filters.sort_direction || search || filters.role);

  const loadUsers = useCallback(
    async (filters = {}) => {
      dispatch(fetchUsers(filters));
    },
    [dispatch],
  );

  // filtering
  const handlePageChange = useCallback(
    (page) => {
      updateFilters({ page });
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
  const handleSortRoleChange = useCallback(
    (e) => {
      updateFilters({ role: e, page: 1 });
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
    loadUsers(filters);
  }, [filters, loadUsers]);

  return {
    users,
    loading,
    errorMessage,
    statistic,
    pagination,
    filters,
    handlePageChange,
    optimisticSearch,
    handleSearchChange,
    handleSortByChange,
    handleSortDirectionChange,
    handleSortRoleChange,
    showReset,
    handleResetFilter,
  };
};

export default useAllUser;
