import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import useFilterParams from "@/Hooks/Common/useFilterParams";

import { selectCategoryBulkDeleteLoading } from "@/Redux/Features/Dashboard/Category/CategorySelector";
import { bulkDeleteCategories, fetchCategories } from "@/Redux/Features/Dashboard/Category/CategorySlice";

const useBulkDeleteCategory = () => {
  const { filters } = useFilterParams();
  const dispatch = useDispatch();
  const loading = useSelector(selectCategoryBulkDeleteLoading);

  const bulkDelete = useCallback(
    async (categoryIds) => {
      const response = await dispatch(bulkDeleteCategories(categoryIds)).unwrap();
      dispatch(fetchCategories(filters));

      return response;
    },
    [dispatch, filters],
  );

  return { bulkDelete, loading };
};

export default useBulkDeleteCategory;
