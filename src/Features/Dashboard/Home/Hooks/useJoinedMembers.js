import { useState, useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import HomeAnalyticsService from "../Services/HomeAnalyticsService";
import { DASHBOARD_ANALYTICS_QUERY_KEYS } from "../Constants/HomeAnalyticsConstant";

const useJoinedMembers = () => {
  const [dateFilter, setDateFilter] = useState("this_month");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleDateFilterChange = useCallback((val) => {
    if (!val) {
      setDateFilter("this_month");
      setStartDate("");
      setEndDate("");
      return;
    }

    if (typeof val === "string" && val.includes(",")) {
      const [from, to] = val.split(", ").map((s) => s.trim());
      setStartDate(from || "");
      setEndDate(to || "");
      setDateFilter(val);
    } else {
      setDateFilter(val);
      setStartDate("");
      setEndDate("");
    }
  }, []);

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
    queryKey: DASHBOARD_ANALYTICS_QUERY_KEYS.joinedMembers(queryParams),
    queryFn: async () => {
      const response = await HomeAnalyticsService.getJoinedMembers(queryParams);
      if (!response.success) {
        throw new Error(response.message || "Gagal mengambil data member bergabung");
      }
      return response.data;
    },
  });

  const joinedMembersData = useMemo(() => data?.joined_members || {}, [data?.joined_members]);
  const total = useMemo(() => Number(joinedMembersData?.total || 0), [joinedMembersData?.total]);
  const members = useMemo(() => joinedMembersData?.members || [], [joinedMembersData?.members]);

  return {
    total,
    members,
    dateFilter,
    handleDateFilterChange,
    startDate,
    endDate,
    loading: isLoading,
    isRefetching,
    refetch,
  };
};

export default useJoinedMembers;
