import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useFilterParams from "@/Hooks/useFilterParams";

import RewardService from "@/Features/Dashboard/Reward/Services/RewardService";
import { REWARD_QUERY_KEYS } from "@/Features/Dashboard/Reward/Constants/RewardConstant";

const useDeleteReward = () => {
  const { setFilters } = useFilterParams();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (rewardId) => {
      const response = await RewardService.delete(rewardId);

      if (!response.success || response.status !== 200) {
        throw new Error(response?.message || "Failed to delete reward");
      }

      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: REWARD_QUERY_KEYS.lists() });
    },
  });

  const deleteRewardById = useCallback(
    async (rewardId) => {
      const response = await mutation.mutateAsync(rewardId);
      setFilters({});
      return response;
    },
    [mutation, setFilters],
  );

  return { deleteRewardById, loading: mutation.isPending };
};

export default useDeleteReward;
