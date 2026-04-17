import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useFilterParams from "@/Hooks/useFilterParams";

import DiningTableService from "@/Features/Dashboard/DiningTable/Services/DiningTableService";
import { DINING_TABLE_QUERY_KEYS } from "@/Features/Dashboard/DiningTable/Constants/DiningTableConstant";

const useDeleteDiningTable = () => {
  const { setFilters } = useFilterParams();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (diningTableId) => {
      const response = await DiningTableService.delete(diningTableId);

      if (!response.success || response.status !== 200) {
        throw new Error(response?.message || "Failed to delete dining table");
      }

      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: DINING_TABLE_QUERY_KEYS.lists() });
    },
  });

  const deleteDiningTableById = useCallback(
    async (diningTableId) => {
      const response = await mutation.mutateAsync(diningTableId);
      setFilters({ page: 1 });
      return response;
    },
    [mutation, setFilters],
  );

  return { deleteDiningTableById, loading: mutation.isPending };
};

export default useDeleteDiningTable;
