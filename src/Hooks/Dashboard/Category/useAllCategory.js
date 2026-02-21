import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/Redux/Features/Dashboard/Category/CategorySlice";
import { selectAllCategories, selectCategoryError, selectCategoryLoading, selectCategoryStatistic } from "@/Redux/Features/Dashboard/Category/CategorySelector";

const useAllCategory = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);
  const loading = useSelector(selectCategoryLoading);
  const errorMessage = useSelector(selectCategoryError);
  const statistic = useSelector(selectCategoryStatistic);

  const loadCategories = useCallback(
    async (filters = {}) => {
      await dispatch(fetchCategories(filters));
    },
    [dispatch],
  );

  return { categories, loading, errorMessage, loadCategories, statistic };
};

export default useAllCategory;
