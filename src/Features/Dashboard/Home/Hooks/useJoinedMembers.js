import { useState, useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import HomeAnalyticsService from "../Services/HomeAnalyticsService";
import { DASHBOARD_ANALYTICS_QUERY_KEYS, resolveDateFilterToRange, getThisMonthRange } from "../Constants/HomeAnalyticsConstant";

const useJoinedMembers = () => {
  const [dateFilter, setDateFilter] = useState(getThisMonthRange);

  const { startDate, endDate, rangeString } = useMemo(() => {
    return resolveDateFilterToRange(dateFilter);
  }, [dateFilter]);

  const handleDateFilterChange = useCallback((val) => {
    const { rangeString: nextRange } = resolveDateFilterToRange(val);
    setDateFilter(nextRange);
  }, []);

  const queryParams = useMemo(() => {
    return {
      start_date: startDate,
      end_date: endDate,
    };
  }, [startDate, endDate]);

  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: DASHBOARD_ANALYTICS_QUERY_KEYS.joinedMembers(queryParams),
    queryFn: async () => {
      const response = await HomeAnalyticsService.getJoinedMembers(queryParams);
      if (!response.success) {
        throw new Error(response.message || "Gagal mengambil data member bergabung");
      }
      return response.data;
    },
    enabled: Boolean(startDate && endDate),
  });

  const joinedMembersData = useMemo(() => data?.joined_members || {}, [data?.joined_members]);
  const total = useMemo(() => Number(joinedMembersData?.total || 0), [joinedMembersData?.total]);
  const members = useMemo(() => joinedMembersData?.members || [], [joinedMembersData?.members]);

  return {
    total,
    members,
    dateFilter: rangeString,
    handleDateFilterChange,
    startDate,
    endDate,
    loading: isLoading,
    isRefetching,
    refetch,
  };
};

export default useJoinedMembers;
