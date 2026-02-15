import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCategoryDeleteLoading } from "@/Redux/Features/Dashboard/Category/CategorySelector";
import { deleteCategory, fetchCategories } from "@/Redux/Features/Dashboard/Category/CategorySlice";

const useDeleteCategory = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectCategoryDeleteLoading);
  const deleteCategoryById = useCallback(
    async (categoryId) => {
      const response = await dispatch(deleteCategory(categoryId)).unwrap();
      dispatch(fetchCategories({ search: "" }));
      return response;
    },
    [dispatch],
  );
  return { deleteCategoryById, loading };
};

export default useDeleteCategory;
