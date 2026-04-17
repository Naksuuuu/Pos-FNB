import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { PROFILE_QUERY_KEYS } from "@/Features/Dashboard/Profile/Constants/ProfileConstant";
import ProfileService from "@/Features/Dashboard/Profile/Services/ProfileService";

const useEditProfile = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data) => {
      try {
        const response = await ProfileService.edit(data);

        if (!response.success || (response.status !== 200 && response.status !== 201)) {
          throw new Error(response?.message || "Failed to edit profile");
        }

        return response;
      } catch (error) {
        if (error?.isValidationError) {
          throw error;
        }

        throw new Error(error?.message || "Failed to edit profile");
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEYS.detail() });
    },
  });

  const edit = useCallback(
    async (data) => {
      const response = await mutation.mutateAsync(data);
      return response;
    },
    [mutation],
  );

  return { edit, loading: mutation.isPending };
};

export default useEditProfile;
