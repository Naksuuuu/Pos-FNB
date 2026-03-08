import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import useFilterParams from "@/Hooks/Common/useFilterParams";

import { selectCategoryDeleteLoading } from "@/Redux/Features/Dashboard/Category/CategorySelector";
import { deleteCategory, fetchCategories } from "@/Redux/Features/Dashboard/Category/CategorySlice";

const useDeleteCategory = () => {
  const { setFilters } = useFilterParams();
  const dispatch = useDispatch();
  const loading = useSelector(selectCategoryDeleteLoading);

  const deleteCategoryById = useCallback(
    async (categoryId) => {
      const response = await dispatch(deleteCategory(categoryId)).unwrap();
      setFilters({});
      dispatch(fetchCategories());
      return response;
    },
    [dispatch, setFilters],
  );
  return { deleteCategoryById, loading };
};

export default useDeleteCategory;
