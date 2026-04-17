import { useQuery } from "@tanstack/react-query";

import { SETTINGS_QUERY_KEYS } from "@/Features/Dashboard/Settings/Constants/SettingsConstant";
import SettingsService from "@/Features/Dashboard/Settings/Services/SettingsService";

const useSettingResource = () => {
  const {
    data: setting,
    isLoading: loadingGet,
    error,
  } = useQuery({
    queryKey: SETTINGS_QUERY_KEYS.detail(),
    queryFn: async () => {
      const response = await SettingsService.get();

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch settings");
      }

      return response.data?.setting || response.data;
    },
  });

  return {
    setting,
    error: error?.message,
    loadingGet,
    loadSetting: () => {}, // No-op for TanStack Query which auto-fetches
  };
};

export default useSettingResource;
