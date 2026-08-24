import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import useFilterParams from "@/Hooks/useFilterParams";
import CashierService from "@/Features/Dashboard/Cashier/Services/CashierService";
import { CASHIER_QUERY_KEYS } from "@/Features/Dashboard/Cashier/Constants/CashierConstant";

const useCashierRewardClaims = () => {
  const { filters, updateFilters, resetFilters } = useFilterParams();
  const queryClient = useQueryClient();

  const claimFilters = useMemo(
    () => ({
      page: Number(filters.page) || 1,
      per_page: Number(filters.per_page) || 15,
      search: filters.search || undefined,
      status: filters.status || undefined,
      sort_by: filters.sort_by || undefined,
      sort_direction: filters.sort_direction || undefined,
    }),
    [filters],
  );

  const { data, isLoading, error } = useQuery({
    queryKey: CASHIER_QUERY_KEYS.rewardClaims(claimFilters),
    queryFn: async () => {
      const response = await CashierService.rewardClaims(claimFilters);
      if (!response.success) {
        throw new Error(response.message || "Gagal mengambil data klaim reward");
      }
      return response.data;
    },
  });

  const claims = useMemo(() => data?.claims || [], [data?.claims]);

  const statistic = useMemo(
    () => ({
      pending_count: Number(data?.statistic?.pending_count) || 0,
      total_claims: Number(data?.statistic?.total_claims) || claims.length,
    }),
    [data?.statistic, claims.length],
  );

  const pagination = data?.pagination
    ? {
        current_page: parseInt(data.pagination.current_page),
        last_page: parseInt(data.pagination.last_page),
        per_page: parseInt(data.pagination.per_page),
        total: parseInt(data.pagination.total),
        from: parseInt(data.pagination.from),
        to: parseInt(data.pagination.to),
        next_page: data.pagination.next_page ? parseInt(data.pagination.next_page) : null,
        prev_page: data.pagination.prev_page ? parseInt(data.pagination.prev_page) : null,
      }
    : {
        current_page: 1,
        last_page: 1,
        per_page: 15,
        total: claims.length,
        from: claims.length > 0 ? 1 : 0,
        to: claims.length,
        next_page: null,
        prev_page: null,
      };

  const search = filters.search || "";
  const [optimisticSearch, setOptimisticSearch] = useState(search);
  const showReset = !!(filters.status || filters.sort_by || filters.sort_direction || search);

  const [activeClaimId, setActiveClaimId] = useState(null);

  const approveMutation = useMutation({
    mutationFn: async (claimId) => {
      setActiveClaimId(claimId);
      const response = await CashierService.approveRewardClaim(claimId);
      if (!response.success) {
        throw new Error(response.message || "Gagal menyetujui klaim");
      }
      return response;
    },
    onSuccess: (res) => {
      toast.success(res.message || "Berhasil menyetujui klaim merchandise");
      queryClient.invalidateQueries({ queryKey: CASHIER_QUERY_KEYS.root });
    },
    onError: (err) => {
      toast.error(err.message || "Gagal menyetujui klaim merchandise");
    },
    onSettled: () => {
      setActiveClaimId(null);
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (claimId) => {
      setActiveClaimId(claimId);
      const response = await CashierService.rejectRewardClaim(claimId);
      if (!response.success) {
        throw new Error(response.message || "Gagal menolak klaim");
      }
      return response;
    },
    onSuccess: (res) => {
      toast.success(res.message || "Berhasil menolak klaim merchandise");
      queryClient.invalidateQueries({ queryKey: CASHIER_QUERY_KEYS.root });
    },
    onError: (err) => {
      toast.error(err.message || "Gagal menolak klaim merchandise");
    },
    onSettled: () => {
      setActiveClaimId(null);
    },
  });

  const handlePageChange = useCallback(
    (newPage) => {
      updateFilters({ page: newPage });
    },
    [updateFilters],
  );

  const timerRef = useRef(null);
  const handleSearchChange = useCallback(
    (e) => {
      setOptimisticSearch(e.target.value);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        updateFilters({ search: e.target.value, page: 1 });
      }, 300);
    },
    [updateFilters],
  );

  const handleStatusChange = useCallback(
    (value) => {
      updateFilters({ status: value || undefined, page: 1 });
    },
    [updateFilters],
  );

  const handleSortByChange = useCallback(
    (value) => {
      updateFilters({ sort_by: value || undefined, page: 1 });
    },
    [updateFilters],
  );

  const handleSortDirectionChange = useCallback(
    (value) => {
      updateFilters({ sort_direction: value || undefined, page: 1 });
    },
    [updateFilters],
  );

  const handlePerPageChange = useCallback(
    (value) => {
      updateFilters({ per_page: Number(value), page: 1 });
    },
    [updateFilters],
  );

  const handleResetFilter = useCallback(() => {
    resetFilters();
  }, [resetFilters]);

  useEffect(() => {
    setOptimisticSearch(search);
  }, [search]);

  return {
    claims,
    loading: isLoading,
    errorMessage: error?.message || null,
    statistic,
    pagination,
    filters,
    showReset,
    optimisticSearch,
    handlePageChange,
    handleSearchChange,
    handleStatusChange,
    handleSortByChange,
    handleSortDirectionChange,
    handlePerPageChange,
    handleResetFilter,
    approveClaim: approveMutation.mutate,
    rejectClaim: rejectMutation.mutate,
    isApproving: approveMutation.isPending,
    isRejecting: rejectMutation.isPending,
    activeClaimId,
  };
};

export default useCashierRewardClaims;
