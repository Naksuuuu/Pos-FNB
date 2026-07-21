import { apiUtils } from "@/Services/Common/Base";

const CUSTOMER_REWARD_ENDPOINT = "/customer/rewards";

const CustomerRewardService = {
  rewards: async () => {
    const response = await apiUtils.get(CUSTOMER_REWARD_ENDPOINT);
    return response.data;
  },

  redeem: async (rewardId) => {
    const response = await apiUtils.post(`${CUSTOMER_REWARD_ENDPOINT}/redeem`, {
      reward_id: rewardId,
    });
    return response.data;
  },

  myRewards: async () => {
    const response = await apiUtils.get(`${CUSTOMER_REWARD_ENDPOINT}/my-rewards`);
    return response.data;
  },
};

export default CustomerRewardService;
