import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import CustomOptionService from "@/Features/Dashboard/CustomOption/Services/CustomOptionService";
import { CUSTOM_OPTION_QUERY_KEYS } from "@/Features/Dashboard/CustomOption/Constants/CustomOptionConstant";

const useEditCustomOption = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ id, payload }) => {
      try {
        const response = await CustomOptionService.edit(id, payload);

        if (!response.success && response.status !== 200) {
          throw new Error(response?.message || "Gagal memperbarui opsi kustom");
        }

        return response;
      } catch (error) {
        if (error?.isValidationError) {
          throw error;
        }

        throw new Error(error?.message || "Gagal memperbarui opsi kustom");
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: CUSTOM_OPTION_QUERY_KEYS.lists() });
    },
  });

  const edit = useCallback(
    async (id, payload) => {
      const response = await mutation.mutateAsync({ id, payload });
      return response;
    },
    [mutation],
  );

  return { edit, loading: mutation.isPending };
};

export default useEditCustomOption;
