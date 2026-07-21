import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router";
import { useMemo } from "react";

import CustomerRewardService from "@/Features/Customer/Reward/Services/CustomerRewardService";
import { selectIsAuthenticated } from "@/Redux/Features/Auth/Login/LoginSelector";
import useCustomerProfile from "@/Features/Customer/Profile/Hooks/useCustomerProfile";
import { CUSTOMER_REWARD_QUERY_KEYS } from "@/Features/Customer/Reward/Constants/CustomerRewardConstant";

const useCustomerRewards = () => {
  const [searchParams] = useSearchParams();
  const queryParams = useMemo(() => (searchParams.toString() ? `?${searchParams.toString()}` : ""), [searchParams]);

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { profile, loading: loadingProfile } = useCustomerProfile();

  const { data, isLoading, error } = useQuery({
    queryKey: CUSTOMER_REWARD_QUERY_KEYS.lists(),
    queryFn: async () => {
      const response = await CustomerRewardService.rewards();
      if (!response.success) {
        throw new Error(response.message || "Failed to fetch rewards");
      }
      return response.data;
    },
  });

  const rewards = useMemo(() => data?.rewards || data || [], [data]);
  const loading = isLoading;
  const errorMessage = error?.message || null;
  const userPoints = profile?.loyalty_point || 0;

  return {
    rewards,
    loading,
    errorMessage,
    profile,
    loadingProfile,
    userPoints,
    queryParams,
    isAuthenticated,
  };
};

export { useCustomerRewards, CUSTOMER_REWARD_QUERY_KEYS };
