export const DASHBOARD_ANALYTICS_QUERY_KEYS = {
  root: ["dashboard-analytics"],
  detail: (params) => ["dashboard-analytics", params],
  revenueTrend: (params) => ["dashboard-analytics-revenue-trend", params],
  joinedMembers: (params) => ["dashboard-analytics-joined-members", params],
};

export const ANALYTICS_DATE_OPTIONS = [
  { label: "Semua", value: "all_time" },
  { label: "Hari Ini", value: "today" },
  { label: "7 Hari Terakhir", value: "7_days" },
  { label: "1 Bulan Terakhir", value: "this_month" },
  { label: "Pilih Tanggal", value: "custom" },
];

export const REVENUE_TREND_DATE_OPTIONS = [
  { label: "7 Hari Terakhir", value: "7_days" },
  { label: "Pilih Tanggal", value: "custom" },
];
