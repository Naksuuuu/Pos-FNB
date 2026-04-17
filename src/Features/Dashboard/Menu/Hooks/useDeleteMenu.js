import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useFilterParams from "@/Hooks/useFilterParams";

import MenuService from "@/Features/Dashboard/Menu/Services/MenuService";
import { MENU_QUERY_KEYS } from "@/Features/Dashboard/Menu/Constants/MenuConstant";

const useDeleteMenu = () => {
  const { setFilters } = useFilterParams();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (menuId) => {
      const response = await MenuService.delete(menuId);

      if (!response.success || (response.status !== 200 && response.status !== 201)) {
        throw new Error(response?.message || "Failed to delete menu");
      }

      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: MENU_QUERY_KEYS.lists() });
    },
  });

  const deleteMenuById = useCallback(
    async (menuId) => {
      const response = await mutation.mutateAsync(menuId);
      setFilters({
        page: 1,
      });
      return response;
    },
    [mutation, setFilters],
  );

  return { deleteMenuById, loading: mutation.isPending };
};

export default useDeleteMenu;
