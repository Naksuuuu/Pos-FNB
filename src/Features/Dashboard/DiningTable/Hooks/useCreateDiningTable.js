import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useFilterParams from "@/Hooks/useFilterParams";

import DiningTableService from "@/Features/Dashboard/DiningTable/Services/DiningTableService";
import { DINING_TABLE_QUERY_KEYS } from "@/Features/Dashboard/DiningTable/Constants/DiningTableConstant";

const useCreateDiningTable = () => {
  const { setFilters } = useFilterParams();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (tableData) => {
      try {
        const response = await DiningTableService.create(tableData);

        if (!response.success || response.status !== 201) {
          throw new Error(response?.message || "Failed to create dining table");
        }

        return response;
      } catch (error) {
        if (error?.isValidationError) {
          throw error;
        }

        throw new Error(error?.message || "Failed to create dining table");
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: DINING_TABLE_QUERY_KEYS.lists() });
    },
  });

  const create = useCallback(
    async (tableData) => {
      const response = await mutation.mutateAsync(tableData);
      setFilters({ page: 1 });
      return response;
    },
    [mutation, setFilters],
  );

  return { create, loading: mutation.isPending };
};

export default useCreateDiningTable;
