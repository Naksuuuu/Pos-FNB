import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import RewardService from "@/Features/Dashboard/Reward/Services/RewardService";
import { REWARD_QUERY_KEYS } from "@/Features/Dashboard/Reward/Constants/RewardConstant";

const useBulkDeleteReward = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (rewardIds) => {
      const response = await RewardService.bulkDelete(rewardIds);

      if (!response.success || response.status !== 200) {
        throw new Error(response?.message || "Failed to delete rewards");
      }

      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: REWARD_QUERY_KEYS.lists() });
    },
  });

  const bulkDelete = useCallback(
    async (rewardIds) => {
      const response = await mutation.mutateAsync(rewardIds);
      return response;
    },
    [mutation],
  );

  return { bulkDelete, loading: mutation.isPending };
};

export default useBulkDeleteReward;
