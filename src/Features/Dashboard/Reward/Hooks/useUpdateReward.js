import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import RewardService from "@/Features/Dashboard/Reward/Services/RewardService";
import { REWARD_QUERY_KEYS } from "@/Features/Dashboard/Reward/Constants/RewardConstant";

const useUpdateReward = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ rewardId, data }) => {
      try {
        const response = await RewardService.edit(rewardId, data);

        if (!response.success || response.status !== 200) {
          throw new Error(response?.message || "Failed to edit reward");
        }

        return response;
      } catch (error) {
        if (error?.isValidationError) {
          throw error;
        }

        throw new Error(error?.message || "Failed to edit reward");
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: REWARD_QUERY_KEYS.lists() });
    },
  });

  const edit = useCallback(
    async (rewardId, data) => {
      const response = await mutation.mutateAsync({ rewardId, data });
      return response;
    },
    [mutation],
  );

  return { edit, loading: mutation.isPending };
};

export default useUpdateReward;
