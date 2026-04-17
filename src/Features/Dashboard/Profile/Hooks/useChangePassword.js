import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";

import ProfileService from "@/Features/Dashboard/Profile/Services/ProfileService";

const useChangePassword = () => {
  const mutation = useMutation({
    mutationFn: async (data) => {
      try {
        const response = await ProfileService.changePassword(data);

        if (!response.success || (response.status !== 200 && response.status !== 201)) {
          throw new Error(response?.message || "Failed to change password");
        }

        return response;
      } catch (error) {
        if (error?.isValidationError) {
          throw error;
        }

        throw new Error(error?.message || "Failed to change password");
      }
    },
  });

  const changePassword = useCallback(
    async (data) => {
      const response = await mutation.mutateAsync(data);
      return response;
    },
    [mutation],
  );

  return { changePassword, loading: mutation.isPending };
};

export default useChangePassword;
