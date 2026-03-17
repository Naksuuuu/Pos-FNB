import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useFilterParams from "@/Hooks/Common/useFilterParams";
import { CATEGORY_ID_OPTIONS } from "@/Constants/Dashboard/Menu/MenuConstant";

import { selectAllMenus, selectMenuError, selectMenuLoading, selectMenuPagination, selectMenuStatistic } from "@/Redux/Features/Dashboard/Menu/MenuSelector";
import { fetchMenus } from "@/Redux/Features/Dashboard/Menu/MenuSlice";
import { selectAllCategories } from "@/Redux/Features/Dashboard/Category/CategorySelector";
import { fetchCategories } from "@/Redux/Features/Dashboard/Category/CategorySlice";

const useAllMenu = () => {
  const { filters, updateFilters, resetFilters } = useFilterParams();

  const dispatch = useDispatch();
  const menus = useSelector(selectAllMenus);
  const loading = useSelector(selectMenuLoading);
  const errorMessage = useSelector(selectMenuError);
  const pagination = useSelector(selectMenuPagination);
  const categories = useSelector(selectAllCategories);
  const statistic = useSelector(selectMenuStatistic);

  const categoryOptions = useMemo(() => [...CATEGORY_ID_OPTIONS, ...categories.map((category) => ({ label: category.name, value: category.id }))], [categories]);

  const search = filters.search || "";
  const [optimisticSearch, setOptimisticSearch] = useState(search);

  const showReset = !!(filters.sort_by || filters.sort_direction || filters.is_available || filters.category_id || search);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories({}));
    }
  }, [dispatch, categories.length]);

  const loadMenus = useCallback(
    async (params = {}) => {
      const { page, ...otherParams } = params;

      const safeParams = {
        page: parseInt(page) || 1,
        ...otherParams,
      };
      await dispatch(fetchMenus(safeParams));
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

  useEffect(() => {
    loadMenus(filters);
  }, [loadMenus, filters]);

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
