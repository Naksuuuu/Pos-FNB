import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import UserService from "@/Features/Dashboard/User/Services/UserService";
import { USER_QUERY_KEYS } from "@/Features/Dashboard/User/Constants/UserConstant";

const useUpdateLoyaltyPoint = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ userId, points }) => {
      try {
        const response = await UserService.updateLoyaltyPoint(userId, points);

        if (!response.success || (response.status !== 200 && response.status !== 201)) {
          throw new Error(response?.message || "Failed to update loyalty point");
        }

        return response;
      } catch (error) {
        if (error?.isValidationError) {
          throw error;
        }

        throw new Error(error?.message || "Failed to update loyalty point");
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.lists() });
    },
  });

  const updateLoyaltyPoint = useCallback(
    async (userId, points) => {
      const response = await mutation.mutateAsync({ userId, points });
      return response;
    },
    [mutation],
  );

  return { updateLoyaltyPoint, loading: mutation.isPending };
};

export default useUpdateLoyaltyPoint;
