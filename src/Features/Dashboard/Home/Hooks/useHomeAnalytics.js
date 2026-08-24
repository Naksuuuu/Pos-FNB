import { useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import useFilterParams from "@/Hooks/useFilterParams";
import HomeAnalyticsService from "../Services/HomeAnalyticsService";
import { DASHBOARD_ANALYTICS_QUERY_KEYS } from "../Constants/HomeAnalyticsConstant";

const useHomeAnalytics = () => {
  const { filters, updateFilters } = useFilterParams();

  // Read date filter from URL search params (e.g. ?date_filter=this_month or ?date_filter=2026-08-01,%202026-08-24)
  const dateFilter = filters.date_filter || "this_month";

  const { startDate, endDate } = useMemo(() => {
    if (typeof dateFilter === "string" && dateFilter.includes(",")) {
      const [from, to] = dateFilter.split(", ").map((s) => s.trim());
      return { startDate: from || "", endDate: to || "" };
    }
    return { startDate: "", endDate: "" };
  }, [dateFilter]);

  const handleDateFilterChange = useCallback(
    (val) => {
      updateFilters({ date_filter: val || "this_month" });
    },
    [updateFilters],
  );

  const queryParams = useMemo(() => {
    if (startDate && endDate) {
      return {
        start_date: startDate,
        end_date: endDate,
      };
    }
    return {
      period: dateFilter || "this_month",
    };
  }, [dateFilter, startDate, endDate]);

  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: DASHBOARD_ANALYTICS_QUERY_KEYS.detail(queryParams),
    queryFn: async () => {
      const response = await HomeAnalyticsService.getAnalytics(queryParams);
      if (!response.success) {
        throw new Error(response.message || "Failed to fetch dashboard analytics");
      }
      return response.data;
    },
  });

  const summary = useMemo(() => data?.summary || null, [data?.summary]);
  const busyHours = useMemo(() => data?.busy_hours || [], [data?.busy_hours]);
  const paymentMethods = useMemo(() => data?.payment_methods || [], [data?.payment_methods]);
  const orderTypes = useMemo(() => data?.order_types || [], [data?.order_types]);
  const topMenus = useMemo(() => data?.top_menus || [], [data?.top_menus]);

  return {
    dateFilter,
    handleDateFilterChange,
    startDate,
    endDate,

    summary,
    busyHours,
    paymentMethods,
    orderTypes,
    topMenus,

    loading: isLoading,
    isRefetching,
    refetch,
  };
};

export default useHomeAnalytics;
