import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useFilterParams from "@/Hooks/useFilterParams";

import UserService from "@/Features/Dashboard/User/Services/UserService";
import { USER_QUERY_KEYS } from "@/Features/Dashboard/User/Constants/UserConstant";

const useDeleteUser = () => {
  const { setFilters } = useFilterParams();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (userId) => {
      const response = await UserService.delete(userId);

      if (!response.success || (response.status !== 200 && response.status !== 201)) {
        throw new Error(response?.message || "Failed to delete user");
      }

      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.lists() });
    },
  });

  const deleteUserById = useCallback(
    async (userId) => {
      const response = await mutation.mutateAsync(userId);
      setFilters({
        page: 1,
      });
      return response;
    },
    [mutation, setFilters],
  );

  return { deleteUserById, loading: mutation.isPending };
};

export default useDeleteUser;
