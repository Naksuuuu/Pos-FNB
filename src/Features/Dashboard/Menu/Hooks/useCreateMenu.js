import { useCallback, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import useFilterParams from "@/Hooks/useFilterParams";

import MenuService from "@/Features/Dashboard/Menu/Services/MenuService";
import { MENU_QUERY_KEYS } from "@/Features/Dashboard/Menu/Constants/MenuConstant";
import CategoryService from "@/Features/Dashboard/Category/Services/CategoryService";
import { CATEGORY_QUERY_KEYS } from "@/Features/Dashboard/Category/Constants/CategoryConstant";

const useCreateMenu = () => {
  const { setFilters } = useFilterParams();
  const queryClient = useQueryClient();

  const { data: categoryData } = useQuery({
    queryKey: CATEGORY_QUERY_KEYS.list({}),
    queryFn: async () => {
      const response = await CategoryService.categories({});

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch categories");
      }

      return response.data;
    },
  });

  const categories = categoryData?.categories || [];

  const mutation = useMutation({
    mutationFn: async (menuData) => {
      try {
        const response = await MenuService.create(menuData);

        if (!response.success || (response.status !== 200 && response.status !== 201)) {
          throw new Error(response?.message || "Failed to create menu");
        }

        return response;
      } catch (error) {
        if (error?.isValidationError) {
          throw error;
        }

        throw new Error(error?.message || "Failed to create menu");
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: MENU_QUERY_KEYS.lists() });
    },
  });

  const categoryOptions = useMemo(() => {
    return categories.map((category) => ({ value: category.id, label: category.name }));
  }, [categories]);

  const create = useCallback(
    async (menuData) => {
      const response = await mutation.mutateAsync(menuData);
      setFilters({
        page: 1,
      });
      return response;
    },
    [mutation, setFilters],
  );

  return { create, loading: mutation.isPending, categoryOptions };
};

export default useCreateMenu;
