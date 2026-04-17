import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useFilterParams from "@/Hooks/useFilterParams";

import UserService from "@/Features/Dashboard/User/Services/UserService";
import { USER_QUERY_KEYS } from "@/Features/Dashboard/User/Constants/UserConstant";

const useBulkDeleteUser = () => {
  const { setFilters } = useFilterParams();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (userIds) => {
      const response = await UserService.bulkDelete(userIds);

      if (!response.success || (response.status !== 200 && response.status !== 201)) {
        throw new Error(response?.message || "Failed to delete users");
      }

      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.lists() });
    },
  });

  const bulkDeleteUsers = useCallback(
    async (userIds) => {
      const response = await mutation.mutateAsync(userIds);
      setFilters({
        page: 1,
      });
      return response;
    },
    [mutation, setFilters],
  );

  return { bulkDeleteUsers, loading: mutation.isPending };
};

export default useBulkDeleteUser;
