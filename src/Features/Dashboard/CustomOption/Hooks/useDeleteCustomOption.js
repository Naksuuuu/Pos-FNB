import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import CustomOptionService from "@/Features/Dashboard/CustomOption/Services/CustomOptionService";
import { CUSTOM_OPTION_QUERY_KEYS } from "@/Features/Dashboard/CustomOption/Constants/CustomOptionConstant";

const useDeleteCustomOption = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id) => {
      try {
        const response = await CustomOptionService.delete(id);

        if (!response.success && response.status !== 200) {
          throw new Error(response?.message || "Gagal menghapus opsi kustom");
        }

        return response;
      } catch (error) {
        throw new Error(error?.message || "Gagal menghapus opsi kustom");
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: CUSTOM_OPTION_QUERY_KEYS.lists() });
    },
  });

  const remove = useCallback(
    async (id) => {
      const response = await mutation.mutateAsync(id);
      return response;
    },
    [mutation],
  );

  return { remove, loading: mutation.isPending };
};

export default useDeleteCustomOption;
