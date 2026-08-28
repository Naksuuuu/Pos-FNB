import { apiUtils } from "@/Services/Common/Base";

const ANALYTIC_ENDPOINT = "/dashboard/analytic";

const REVENUE_TREND_ENDPOINT = "/dashboard/analytic/revenue-trend";

const JOINED_MEMBERS_ENDPOINT = "/dashboard/analytic/joined-members";

const HomeAnalyticsService = {
  getAnalytics: async (params = {}) => {
    const { start_date, end_date } = params;

    const queryParams = {
      ...(start_date ? { start_date } : {}),
      ...(end_date ? { end_date } : {}),
    };

    const response = await apiUtils.get(ANALYTIC_ENDPOINT, { params: queryParams });
    return response.data;
  },

  getRevenueTrend: async (params = {}) => {
    const { start_date, end_date } = params;

    const queryParams = {
      ...(start_date ? { start_date } : {}),
      ...(end_date ? { end_date } : {}),
    };

    const response = await apiUtils.get(REVENUE_TREND_ENDPOINT, { params: queryParams });
    return response.data;
  },

  getJoinedMembers: async (params = {}) => {
    const { start_date, end_date } = params;

    const queryParams = {
      ...(start_date ? { start_date } : {}),
      ...(end_date ? { end_date } : {}),
    };

    const response = await apiUtils.get(JOINED_MEMBERS_ENDPOINT, { params: queryParams });
    return response.data;
  },
};

export default HomeAnalyticsService;
