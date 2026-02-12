import { selectCategoryEditLoading } from "@/Redux/Features/Category/CategorySelector";
import { editCategory, fetchCategories } from "@/Redux/Features/Category/CategorySlice";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

const useEditCategory = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectCategoryEditLoading);

  const edit = useCallback(
    async (categoryId, data) => {
      const response = await dispatch(editCategory([categoryId, data])).unwrap();
      dispatch(fetchCategories({ search: "" }));
      return response;
    },
    [dispatch],
  );
  return { edit, loading };
};

export default useEditCategory;
