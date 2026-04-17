import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import DiningTableService from "@/Features/Dashboard/DiningTable/Services/DiningTableService";
import { DINING_TABLE_QUERY_KEYS } from "@/Features/Dashboard/DiningTable/Constants/DiningTableConstant";

const useEditDiningTable = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ tableId, tableData }) => {
      try {
        const response = await DiningTableService.edit(tableId, tableData);

        if (!response.success || response.status !== 200) {
          throw new Error(response?.message || "Failed to edit dining table");
        }

        return response;
      } catch (error) {
        if (error?.isValidationError) {
          throw error;
        }

        throw new Error(error?.message || "Failed to edit dining table");
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: DINING_TABLE_QUERY_KEYS.lists() });
    },
  });

  const edit = useCallback(
    async (tableId, tableData) => {
      const response = await mutation.mutateAsync({ tableId, tableData });
      return response;
    },
    [mutation],
  );

  return { edit, loading: mutation.isPending };
};

export default useEditDiningTable;
