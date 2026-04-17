import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useFilterParams from "@/Hooks/useFilterParams";

import MenuService from "@/Features/Dashboard/Menu/Services/MenuService";
import { MENU_QUERY_KEYS } from "@/Features/Dashboard/Menu/Constants/MenuConstant";

const useBulkDeleteMenu = () => {
  const { setFilters } = useFilterParams();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (menuIds) => {
      const response = await MenuService.bulkDelete(menuIds);

      if (!response.success || response.status !== 200) {
        throw new Error(response?.message || "Failed to delete menus");
      }

      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: MENU_QUERY_KEYS.lists() });
    },
  });

  const bulkDelete = useCallback(
    async (menuIds) => {
      const newFilters = {
        page: 1,
      };
      const response = await mutation.mutateAsync(menuIds);
      setFilters(newFilters);

      return response;
    },
    [mutation, setFilters],
  );

  return { bulkDelete, loading: mutation.isPending };
};

export default useBulkDeleteMenu;
