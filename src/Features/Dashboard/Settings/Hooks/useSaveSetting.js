import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { SETTINGS_QUERY_KEYS } from "@/Features/Dashboard/Settings/Constants/SettingsConstant";
import SettingsService from "@/Features/Dashboard/Settings/Services/SettingsService";

const useSaveSetting = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload) => {
      try {
        const response = await SettingsService.update(payload.id || 1, payload);

        if (!response.success || (response.status !== 200 && response.status !== 201)) {
          throw new Error(response?.message || "Failed to save settings");
        }

        return response;
      } catch (error) {
        if (error?.isValidationError) {
          throw error;
        }

        throw new Error(error?.message || "Failed to save settings");
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: SETTINGS_QUERY_KEYS.detail() });
    },
  });

  const save = useCallback(
    async (payload) => {
      const response = await mutation.mutateAsync(payload);
      return response;
    },
    [mutation],
  );

  return { save, loading: mutation.isPending };
};

export default useSaveSetting;
