import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useMemo } from "react";

import CustomerRewardService from "@/Features/Customer/Reward/Services/CustomerRewardService";
import { CUSTOMER_REWARD_QUERY_KEYS } from "@/Features/Customer/Reward/Constants/CustomerRewardConstant";
import { selectIsAuthenticated } from "@/Redux/Features/Auth/Login/LoginSelector";

const useCustomerMyRewards = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const { data, isLoading, error } = useQuery({
    queryKey: CUSTOMER_REWARD_QUERY_KEYS.myRewards(),
    queryFn: async () => {
      const response = await CustomerRewardService.myRewards();
      if (!response.success) {
        throw new Error(response.message || "Failed to fetch my rewards");
      }
      return response.data;
    },
    enabled: isAuthenticated,
  });

  const myRewards = useMemo(() => data || [], [data]);
  const loading = isLoading;
  const errorMessage = error?.message || null;

  return {
    myRewards,
    loading,
    errorMessage,
    isAuthenticated,
  };
};

export default useCustomerMyRewards;
