import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useFilterParams from "@/Hooks/useFilterParams";

import RewardService from "@/Features/Dashboard/Reward/Services/RewardService";
import { REWARD_QUERY_KEYS } from "@/Features/Dashboard/Reward/Constants/RewardConstant";

const useCreateReward = () => {
  const { setFilters } = useFilterParams();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (rewardData) => {
      try {
        const response = await RewardService.create(rewardData);

        if (!response.success || (response.status !== 200 && response.status !== 201)) {
          throw new Error(response?.message || "Failed to create reward");
        }

        return response;
      } catch (error) {
        if (error?.isValidationError) {
          throw error;
        }

        throw new Error(error?.message || "Failed to create reward");
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: REWARD_QUERY_KEYS.lists() });
    },
  });

  const create = useCallback(
    async (rewardData) => {
      const response = await mutation.mutateAsync(rewardData);
      setFilters({});
      return response;
    },
    [mutation, setFilters],
  );

  return { create, loading: mutation.isPending };
};

export default useCreateReward;
