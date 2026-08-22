import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useFilterParams from "@/Hooks/useFilterParams";
import CustomOptionService from "@/Features/Dashboard/CustomOption/Services/CustomOptionService";
import { CUSTOM_OPTION_QUERY_KEYS } from "@/Features/Dashboard/CustomOption/Constants/CustomOptionConstant";

const useCreateCustomOption = () => {
  const { setFilters } = useFilterParams();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload) => {
      try {
        const response = await CustomOptionService.create(payload);

        if (!response.success && response.status !== 200 && response.status !== 201) {
          throw new Error(response?.message || "Gagal membuat opsi kustom baru");
        }

        return response;
      } catch (error) {
        if (error?.isValidationError) {
          throw error;
        }

        throw new Error(error?.message || "Gagal membuat opsi kustom baru");
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: CUSTOM_OPTION_QUERY_KEYS.lists() });
    },
  });

  const create = useCallback(
    async (payload) => {
      const response = await mutation.mutateAsync(payload);
      setFilters({ page: 1 });
      return response;
    },
    [mutation, setFilters],
  );

  return { create, loading: mutation.isPending };
};

export default useCreateCustomOption;
