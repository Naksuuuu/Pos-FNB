import { useState, useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import HomeAnalyticsService from "../Services/HomeAnalyticsService";
import { DASHBOARD_ANALYTICS_QUERY_KEYS, getSevenDaysRange, getSevenDaysAgoString, getTodayString } from "../Constants/HomeAnalyticsConstant";

const useRevenueTrend = () => {
  const [dateFilter, setDateFilter] = useState(getSevenDaysRange);
  const [startDate, setStartDate] = useState(getSevenDaysAgoString);
  const [endDate, setEndDate] = useState(getTodayString);

  const handleDateFilterChange = useCallback((val) => {
    if (!val || val === "7_days") {
      const defaultRange = getSevenDaysRange();
      setDateFilter(defaultRange);
      setStartDate(getSevenDaysAgoString());
      setEndDate(getTodayString());
      return;
    }

    if (typeof val === "string" && val.includes(",")) {
      const [from, to] = val.split(", ").map((s) => s.trim());
      setStartDate(from || "");
      setEndDate(to || "");
      setDateFilter(val);
    } else {
      setDateFilter(val);
    }
  }, []);

  const queryParams = useMemo(() => {
    return {
      start_date: startDate,
      end_date: endDate,
    };
  }, [startDate, endDate]);

  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: DASHBOARD_ANALYTICS_QUERY_KEYS.revenueTrend(queryParams),
    queryFn: async () => {
      const response = await HomeAnalyticsService.getRevenueTrend(queryParams);
      if (!response.success) {
        throw new Error(response.message || "Gagal mengambil tren pendapatan");
      }
      return response.data;
    },
    enabled: Boolean(startDate && endDate),
  });

  const revenueTrend = useMemo(() => data?.revenue_trend || [], [data?.revenue_trend]);

  return {
    revenueTrend,
    dateFilter,
    handleDateFilterChange,
    startDate,
    endDate,
    loading: isLoading,
    isRefetching,
    refetch,
  };
};

export default useRevenueTrend;
