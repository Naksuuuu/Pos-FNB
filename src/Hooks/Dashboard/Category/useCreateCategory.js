import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import useFilterParams from "@/Hooks/Common/useFilterParams";

import { createCategory, fetchCategories } from "@/Redux/Features/Dashboard/Category/CategorySlice";
import { selectCategoryCreateLoading } from "@/Redux/Features/Dashboard/Category/CategorySelector";

const useCreateCategory = () => {
  const { setFilters } = useFilterParams();
  const dispatch = useDispatch();
  const loading = useSelector(selectCategoryCreateLoading);

  const create = useCallback(
    async (categoryData) => {
      const response = await dispatch(createCategory(categoryData)).unwrap();
      setFilters({});
      dispatch(fetchCategories());
      return response;
    },
    [dispatch, setFilters],
  );

  return { create, loading };
};

export default useCreateCategory;
