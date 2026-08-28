import { format, subDays, startOfMonth } from "date-fns";

export const DASHBOARD_ANALYTICS_QUERY_KEYS = {
  root: ["dashboard-analytics"],
  detail: (params) => ["dashboard-analytics", params],
  revenueTrend: (params) => ["dashboard-analytics-revenue-trend", params],
  joinedMembers: (params) => ["dashboard-analytics-joined-members", params],
};

export const getTodayString = () => format(new Date(), "yyyy-MM-dd");
export const getSevenDaysAgoString = () => format(subDays(new Date(), 6), "yyyy-MM-dd");
export const getStartOfMonthString = () => format(startOfMonth(new Date()), "yyyy-MM-dd");

export const getTodayRange = () => `${getTodayString()}, ${getTodayString()}`;
export const getSevenDaysRange = () => `${getSevenDaysAgoString()}, ${getTodayString()}`;
export const getThisMonthRange = () => `${getStartOfMonthString()}, ${getTodayString()}`;

export const getAnalyticsDateOptions = () => [
  { label: "Hari Ini", value: getTodayRange() },
  { label: "7 Hari Terakhir", value: getSevenDaysRange() },
  { label: "1 Bulan Terakhir", value: getThisMonthRange() },
  { label: "Pilih Tanggal", value: "custom" },
];

export const ANALYTICS_DATE_OPTIONS = getAnalyticsDateOptions();

export const REVENUE_TREND_DATE_OPTIONS = [
  { label: "7 Hari Terakhir", value: getSevenDaysRange() },
  { label: "Pilih Tanggal", value: "custom" },
];

export const resolveDateFilterToRange = (dateFilter) => {
  if (!dateFilter) {
    return {
      startDate: getStartOfMonthString(),
      endDate: getTodayString(),
      rangeString: getThisMonthRange(),
    };
  }

  // Handle legacy string if previous URL was ?date_filter=7_days etc.
  if (dateFilter === "today") {
    return {
      startDate: getTodayString(),
      endDate: getTodayString(),
      rangeString: getTodayRange(),
    };
  }

  if (dateFilter === "7_days") {
    return {
      startDate: getSevenDaysAgoString(),
      endDate: getTodayString(),
      rangeString: getSevenDaysRange(),
    };
  }

  if (dateFilter === "this_month" || dateFilter === "all_time") {
    return {
      startDate: getStartOfMonthString(),
      endDate: getTodayString(),
      rangeString: getThisMonthRange(),
    };
  }

  // Standard date range string "YYYY-MM-DD, YYYY-MM-DD"
  if (typeof dateFilter === "string" && dateFilter.includes(",")) {
    const [from, to] = dateFilter.split(", ").map((s) => s.trim());
    return {
      startDate: from || getStartOfMonthString(),
      endDate: to || getTodayString(),
      rangeString: `${from}, ${to}`,
    };
  }

  return {
    startDate: getStartOfMonthString(),
    endDate: getTodayString(),
    rangeString: getThisMonthRange(),
  };
};
