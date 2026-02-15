import { useCallback } from "react";
import { createCategory, fetchCategories } from "@/Redux/Features/Dashboard/Category/CategorySlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCategoryCreateLoading } from "@/Redux/Features/Dashboard/Category/CategorySelector";

const useCreateCategory = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectCategoryCreateLoading);

  const create = useCallback(
    async (categoryData) => {
      const response = await dispatch(createCategory(categoryData)).unwrap();
      dispatch(fetchCategories({ search: "" }));
      return response;
    },
    [dispatch],
  );

  return { create, loading };
};

export default useCreateCategory;
