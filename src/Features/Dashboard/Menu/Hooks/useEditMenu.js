import { useCallback, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import MenuService from "@/Features/Dashboard/Menu/Services/MenuService";
import { MENU_QUERY_KEYS } from "@/Features/Dashboard/Menu/Constants/MenuConstant";
import CategoryService from "@/Features/Dashboard/Category/Services/CategoryService";
import { CATEGORY_QUERY_KEYS } from "@/Features/Dashboard/Category/Constants/CategoryConstant";

const useEditMenu = () => {
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

  const categories = useMemo(() => categoryData?.categories || [], [categoryData?.categories]);

  const mutation = useMutation({
    mutationFn: async ({ menuId, menuData }) => {
      try {
        const { image, ...menuDataWithoutImage } = menuData;

        if (image && image[0]) {
          await MenuService.uploadImage(menuId, image);
        }

        const response = await MenuService.edit(menuId, menuDataWithoutImage);

        if (!response.success || (response.status !== 200 && response.status !== 201)) {
          throw new Error(response?.message || "Failed to edit menu");
        }

        return response;
      } catch (error) {
        if (error?.isValidationError) {
          throw error;
        }

        throw new Error(error?.message || "Failed to edit menu");
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: MENU_QUERY_KEYS.lists() });
    },
  });

  const categoryOptions = useMemo(() => {
    return categories.map((category) => ({ value: category.id, label: category.name }));
  }, [categories]);

  const edit = useCallback(
    async (menuId, menuData) => {
      const response = await mutation.mutateAsync({ menuId, menuData });
      return response;
    },
    [mutation],
  );

  return { edit, loading: mutation.isPending, categoryOptions };
};

export default useEditMenu;
