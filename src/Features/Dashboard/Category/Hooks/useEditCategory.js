import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import CategoryService from "@/Features/Dashboard/Category/Services/CategoryService";
import { CATEGORY_QUERY_KEYS } from "@/Features/Dashboard/Category/Constants/CategoryConstant";

const useEditCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ categoryId, data }) => {
      try {
        const response = await CategoryService.edit(categoryId, data);

        if (!response.success || response.status !== 200) {
          throw new Error(response?.message || "Failed to edit category");
        }

        return response;
      } catch (error) {
        if (error?.isValidationError) {
          throw error;
        }

        throw new Error(error?.message || "Failed to edit category");
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: CATEGORY_QUERY_KEYS.lists() });
    },
  });

  const edit = useCallback(
    async (categoryId, data) => {
      const response = await mutation.mutateAsync({ categoryId, data });
      return response;
    },
    [mutation],
  );

  return { edit, loading: mutation.isPending };
};

export default useEditCategory;

