import { useMemo, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useFilterParams from "@/Hooks/useFilterParams";
import HomeAnalyticsService from "../Services/HomeAnalyticsService";
import {
  DASHBOARD_ANALYTICS_QUERY_KEYS,
  getStartOfMonthString,
  getTodayString,
  resolveDateFilterToRange,
} from "../Constants/HomeAnalyticsConstant";

const useHomeAnalytics = () => {
  const { filters, updateFilters } = useFilterParams();

  // Migrate legacy date_filter in URL (e.g. ?date_filter=...) to pure start_date & end_date
  useEffect(() => {
    if (filters.date_filter) {
      const { startDate: s, endDate: e } = resolveDateFilterToRange(filters.date_filter);
      updateFilters({
        start_date: s,
        end_date: e,
        date_filter: undefined,
      });
    }
  }, [filters.date_filter, updateFilters]);

  // Strictly read start_date and end_date from URL query parameters
  const startDate = filters.start_date || getStartOfMonthString();
  const endDate = filters.end_date || getTodayString();

  // Value formatted for SelectDate component
  const dateFilter = useMemo(() => {
    return `${startDate}, ${endDate}`;
  }, [startDate, endDate]);

  const handleDateFilterChange = useCallback(
    (val) => {
      const { startDate: nextStart, endDate: nextEnd } = resolveDateFilterToRange(val);
      updateFilters({
        start_date: nextStart,
        end_date: nextEnd,
        date_filter: undefined,
      });
    },
    [updateFilters],
  );

  const queryParams = useMemo(() => {
    return {
      start_date: startDate,
      end_date: endDate,
    };
  }, [startDate, endDate]);

  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: DASHBOARD_ANALYTICS_QUERY_KEYS.detail(queryParams),
    queryFn: async () => {
      const response = await HomeAnalyticsService.getAnalytics(queryParams);
      if (!response.success) {
        throw new Error(response.message || "Failed to fetch dashboard analytics");
      }
      return response.data;
    },
    enabled: Boolean(startDate && endDate),
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
