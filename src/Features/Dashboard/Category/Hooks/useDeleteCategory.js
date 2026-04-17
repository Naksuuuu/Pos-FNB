import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useFilterParams from "@/Hooks/useFilterParams";

import CategoryService from "@/Features/Dashboard/Category/Services/CategoryService";
import { CATEGORY_QUERY_KEYS } from "@/Features/Dashboard/Category/Constants/CategoryConstant";

const useDeleteCategory = () => {
  const { setFilters } = useFilterParams();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (categoryId) => {
      const response = await CategoryService.delete(categoryId);

      if (!response.success || response.status !== 200) {
        throw new Error(response?.message || "Failed to delete category");
      }

      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: CATEGORY_QUERY_KEYS.lists() });
    },
  });

  const deleteCategoryById = useCallback(
    async (categoryId) => {
      const response = await mutation.mutateAsync(categoryId);
      setFilters({});
      return response;
    },
    [mutation, setFilters],
  );

  return { deleteCategoryById, loading: mutation.isPending };
};

export default useDeleteCategory;
