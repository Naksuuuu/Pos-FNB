import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useFilterParams from "@/Hooks/useFilterParams";

import CategoryService from "@/Features/Dashboard/Category/Services/CategoryService";
import { CATEGORY_QUERY_KEYS } from "@/Features/Dashboard/Category/Constants/CategoryConstant";

const useCreateCategory = () => {
  const { setFilters } = useFilterParams();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (categoryData) => {
      try {
        const response = await CategoryService.create(categoryData);

        if (!response.success || (response.status !== 200 && response.status !== 201)) {
          throw new Error(response?.message || "Failed to create category");
        }

        return response;
      } catch (error) {
        if (error?.isValidationError) {
          throw error;
        }

        throw new Error(error?.message || "Failed to create category");
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: CATEGORY_QUERY_KEYS.lists() });
    },
  });

  const create = useCallback(
    async (categoryData) => {
      const response = await mutation.mutateAsync(categoryData);
      setFilters({});
      return response;
    },
    [mutation, setFilters],
  );

  return { create, loading: mutation.isPending };
};

export default useCreateCategory;
