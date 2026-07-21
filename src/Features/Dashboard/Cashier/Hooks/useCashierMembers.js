import { useCallback, useState, useRef, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import CashierService from "@/Features/Dashboard/Cashier/Services/CashierService";
import { CASHIER_QUERY_KEYS } from "@/Features/Dashboard/Cashier/Constants/CashierConstant";

const useCashierMembers = (enabled = true) => {
  const [search, setSearch] = useState("");
  const [optimisticSearch, setOptimisticSearch] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: CASHIER_QUERY_KEYS.members({ search }),
    queryFn: async () => {
      const response = await CashierService.members({ search: search || undefined });
      if (!response.success) {
        throw new Error(response.message || "Failed to fetch cashier members");
      }
      return response.data;
    },
    enabled,
  });

  const members = useMemo(() => data?.members || data || [], [data]);
  const loading = isLoading;
  const errorMessage = error?.message || null;

  const timerRef = useRef(null);
  const handleSearchChange = useCallback((e) => {
    const val = e.target.value;
    setOptimisticSearch(val);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setSearch(val);
    }, 300);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return {
    members,
    loading,
    errorMessage,
    optimisticSearch,
    handleSearchChange,
  };
};

export default useCashierMembers;
