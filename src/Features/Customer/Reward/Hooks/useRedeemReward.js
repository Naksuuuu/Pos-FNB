import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router";
import { useSelector } from "react-redux";
import { toast } from "sonner";

import CustomerRewardService from "@/Features/Customer/Reward/Services/CustomerRewardService";
import { CUSTOMER_PROFILE_QUERY_KEYS } from "@/Features/Customer/Profile/Constants/CustomerProfileConstant";
import { selectIsAuthenticated } from "@/Redux/Features/Auth/Login/LoginSelector";
import useCustomerProfile from "@/Features/Customer/Profile/Hooks/useCustomerProfile";
import { ROUTES } from "@/Constants/RouteConstant";
import { CUSTOMER_REWARD_QUERY_KEYS } from "@/Features/Customer/Reward/Constants/CustomerRewardConstant";

const useRedeemReward = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryParams = searchParams.toString() ? `?${searchParams.toString()}` : "";

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { profile } = useCustomerProfile();
  const userPoints = profile?.loyalty_point || 0;

  const mutation = useMutation({
    mutationFn: async (rewardId) => {
      try {
        const response = await CustomerRewardService.redeem(rewardId);

        if (!response.success || (response.status !== 200 && response.status !== 201)) {
          throw new Error(response?.message || "Failed to redeem reward");
        }

        return response;
      } catch (error) {
        if (error?.isValidationError) {
          throw error;
        }
        throw new Error(error?.message || "Failed to redeem reward");
      }
    },
    onSuccess: async () => {
      // Invalidate customer profile detail to update their loyalty points and my rewards
      await queryClient.invalidateQueries({ queryKey: CUSTOMER_PROFILE_QUERY_KEYS.detail() });
      await queryClient.invalidateQueries({ queryKey: CUSTOMER_REWARD_QUERY_KEYS.myRewards() });
    },
  });

  const redeemReward = useCallback(
    async (rewardId) => {
      const response = await mutation.mutateAsync(rewardId);
      return response;
    },
    [mutation],
  );

  const handleRedeem = useCallback(
    async (reward) => {
      if (!isAuthenticated) {
        toast.info("Silakan masuk terlebih dahulu untuk menukarkan reward");
        navigate(`${ROUTES.AUTH.LOGIN}?callbackUrl=${ROUTES.PUBLIC.REWARDS}${queryParams}`);
        return;
      }

      if (userPoints < reward.point_cost) {
        toast.error("Poin Anda tidak mencukupi untuk menukarkan reward ini");
        return;
      }

      try {
        const response = await redeemReward(reward.id);
        toast.success(response.message || `Berhasil menukarkan reward: ${reward.name}`);
      } catch (err) {
        toast.error(err.message || "Gagal menukarkan reward");
      }
    },
    [isAuthenticated, userPoints, navigate, queryParams, redeemReward],
  );

  return { handleRedeem, loading: mutation.isPending, navigate };
};

export default useRedeemReward;
