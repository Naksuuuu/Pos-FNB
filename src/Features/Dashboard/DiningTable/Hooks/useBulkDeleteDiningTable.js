import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useFilterParams from "@/Hooks/useFilterParams";

import DiningTableService from "@/Features/Dashboard/DiningTable/Services/DiningTableService";
import { DINING_TABLE_QUERY_KEYS } from "@/Features/Dashboard/DiningTable/Constants/DiningTableConstant";

const useBulkDeleteDiningTable = () => {
  const { setFilters } = useFilterParams();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (tableIds) => {
      const response = await DiningTableService.bulkDelete(tableIds);

      if (!response.success || response.status !== 200) {
        throw new Error(response?.message || "Failed to delete dining tables");
      }

      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: DINING_TABLE_QUERY_KEYS.lists() });
    },
  });

  const bulkDelete = useCallback(
    async (tableIds) => {
      const newFilters = {
        page: 1,
      };
      const response = await mutation.mutateAsync(tableIds);
      setFilters(newFilters);

      return response;
    },
    [mutation, setFilters],
  );

  return { bulkDelete, loading: mutation.isPending };
};

export default useBulkDeleteDiningTable;
