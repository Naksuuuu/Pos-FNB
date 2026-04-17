import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import UserService from "@/Features/Dashboard/User/Services/UserService";
import { USER_QUERY_KEYS } from "@/Features/Dashboard/User/Constants/UserConstant";

const useEditUser = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ userId, userData }) => {
      try {
        const response = await UserService.edit(userId, userData);

        if (!response.success || (response.status !== 200 && response.status !== 201)) {
          throw new Error(response?.message || "Failed to edit user");
        }

        return response;
      } catch (error) {
        if (error?.isValidationError) {
          throw error;
        }

        throw new Error(error?.message || "Failed to edit user");
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.lists() });
    },
  });

  const editUserById = useCallback(
    async (userId, userData) => {
      const response = await mutation.mutateAsync({ userId, userData });
      return response;
    },
    [mutation],
  );

  return { editUserById, loading: mutation.isPending };
};

export default useEditUser;
