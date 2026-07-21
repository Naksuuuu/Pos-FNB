import { apiUtils } from "@/Services/Common/Base";

const REWARD_ENDPOINT = "/dashboard/rewards";

const RewardService = {
  rewards: async (params) => {
    const { page = 1, search, category, status, sort_by, sort_direction, per_page = 15 } = params;

    const queryParams = {
      page,
      search,
      category,
      status,
      per_page,
      sort_by,
      sort_direction,
    };

    const response = await apiUtils.get(REWARD_ENDPOINT, { params: queryParams });
    return response.data;
  },

  create: async (payload) => {
    const response = await apiUtils.post(REWARD_ENDPOINT, payload);
    return response.data;
  },

  edit: async (rewardId, payload) => {
    const response = await apiUtils.put(`${REWARD_ENDPOINT}/${rewardId}`, payload);
    return response.data;
  },

  delete: async (rewardId) => {
    const response = await apiUtils.delete(`${REWARD_ENDPOINT}/${rewardId}`);
    return response.data;
  },

  bulkDelete: async (rewardIds) => {
    const response = await apiUtils.delete(REWARD_ENDPOINT, {
      params: { ids: rewardIds },
    });
    return response.data;
  },
};

export default RewardService;
