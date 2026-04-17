import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import CategoryService from "@/Features/Dashboard/Category/Services/CategoryService";
import { CATEGORY_QUERY_KEYS } from "@/Features/Dashboard/Category/Constants/CategoryConstant";

const useBulkDeleteCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (categoryIds) => {
      const response = await CategoryService.bulkDelete(categoryIds);

      if (!response.success || response.status !== 200) {
        throw new Error(response?.message || "Failed to delete categories");
      }

      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: CATEGORY_QUERY_KEYS.lists() });
    },
  });

  const bulkDelete = useCallback(
    async (categoryIds) => {
      const response = await mutation.mutateAsync(categoryIds);

      return response;
    },
    [mutation],
  );

  return { bulkDelete, loading: mutation.isPending };
};

export default useBulkDeleteCategory;

