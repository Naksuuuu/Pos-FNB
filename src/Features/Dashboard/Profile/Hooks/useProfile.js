import { useQuery } from "@tanstack/react-query";

import { PROFILE_QUERY_KEYS } from "@/Features/Dashboard/Profile/Constants/ProfileConstant";
import ProfileService from "@/Features/Dashboard/Profile/Services/ProfileService";

const useProfile = () => {
  const {
    data: profile,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: PROFILE_QUERY_KEYS.detail(),
    queryFn: async () => {
      const response = await ProfileService.get();

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch profile");
      }

      return response.data?.profile || response.data;
    },
  });

  return {
    profile,
    loading,
    error: error?.message,
  };
};

export default useProfile;
