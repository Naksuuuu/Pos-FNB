import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/Redux/Features/Category/CategorySlice";
import { selectAllCategories, selectCategoryError, selectCategoryLoading } from "@/Redux/Features/Category/CategorySelector";

const useAllCategory = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);
  const loading = useSelector(selectCategoryLoading);
  const errorMessage = useSelector(selectCategoryError);

  const loadCategories = useCallback(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return { categories, loading, errorMessage, loadCategories };
};

export default useAllCategory;
