import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useFilterParams from "@/Hooks/Common/useFilterParams";

import { fetchCategories } from "@/Redux/Features/Dashboard/Category/CategorySlice";
import { selectAllCategories, selectCategoryError, selectCategoryLoading, selectCategoryStatistic } from "@/Redux/Features/Dashboard/Category/CategorySelector";

const useAllCategory = () => {
  const { filters, updateFilters, resetFilters } = useFilterParams();

  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);
  const loading = useSelector(selectCategoryLoading);
  const errorMessage = useSelector(selectCategoryError);
  const statistic = useSelector(selectCategoryStatistic);

  const search = filters.search || "";
  const [optimisticSearch, setOptimisticSearch] = useState(search);

  const showReset = !!(filters.sort_by || filters.sort_direction || search);

  const loadCategories = useCallback(
    async (params = {}) => {
      dispatch(fetchCategories(params));
    },
    [dispatch],
  );

  const timerRef = useRef(null);
  const handleSearchChange = useCallback(
    (e) => {
      setOptimisticSearch(e.target.value);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        updateFilters({ search: e.target.value });
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

  const handleResetFilter = useCallback(() => {
    resetFilters();
  }, [resetFilters]);

  useEffect(() => {
    setOptimisticSearch(search);
  }, [search]);

  useEffect(() => {
    loadCategories(filters);
  }, [filters, loadCategories]);

  return {
    categories,
    loading,
    errorMessage,
    statistic,
    filters,
    showReset,
    optimisticSearch,
    handleSearchChange,
    handleSortByChange,
    handleSortDirectionChange,
    handleResetFilter,
  };
};

export default useAllCategory;
