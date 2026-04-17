import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { SETTINGS_QUERY_KEYS } from "@/Features/Dashboard/Settings/Constants/SettingsConstant";
import SettingsService from "@/Features/Dashboard/Settings/Services/SettingsService";

const useSettingLogo = () => {
  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: async ({ settingId, logoFiles }) => {
      try {
        const response = await SettingsService.uploadLogo(settingId, logoFiles);

        if (!response.success || (response.status !== 200 && response.status !== 201)) {
          throw new Error(response?.message || "Failed to upload logo");
        }

        return response;
      } catch (error) {
        if (error?.isValidationError) {
          throw error;
        }

        throw new Error(error?.message || "Failed to upload logo");
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: SETTINGS_QUERY_KEYS.detail() });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (settingId) => {
      try {
        const response = await SettingsService.deleteLogo(settingId);

        if (!response.success || (response.status !== 200 && response.status !== 201)) {
          throw new Error(response?.message || "Failed to delete logo");
        }

        return response;
      } catch (error) {
        if (error?.isValidationError) {
          throw error;
        }

        throw new Error(error?.message || "Failed to delete logo");
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: SETTINGS_QUERY_KEYS.detail() });
    },
  });

  const uploadLogo = useCallback(
    async (settingId, logoFiles) => {
      const response = await uploadMutation.mutateAsync({ settingId, logoFiles });
      return response;
    },
    [uploadMutation],
  );

  const removeLogo = useCallback(
    async (settingId) => {
      const response = await deleteMutation.mutateAsync(settingId);
      return response;
    },
    [deleteMutation],
  );

  return {
    uploadLogo,
    removeLogo,
    loadingUpload: uploadMutation.isPending,
    loadingDelete: deleteMutation.isPending,
  };
};

export default useSettingLogo;
