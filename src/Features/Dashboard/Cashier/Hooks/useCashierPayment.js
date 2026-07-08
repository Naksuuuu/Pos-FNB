import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import CashierService from "@/Features/Dashboard/Cashier/Services/CashierService";
import { CASHIER_QUERY_KEYS } from "@/Features/Dashboard/Cashier/Constants/CashierConstant";
import { CashierPaymentSchema } from "@/Features/Dashboard/Cashier/Schema/CashierSchema";
import { ORDER_QUERY_KEYS } from "@/Features/Dashboard/Order/Constants/OrderConstant";

const defaultQuickCash = [20000, 50000, 100000];

const normalizeCashDigits = (value) => String(value ?? "").replace(/[^0-9]/g, "");

const useCashierPayment = () => {
  const queryClient = useQueryClient();
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isNewOrder, setIsNewOrder] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("tunai");
  const [isCanceling, setIsCanceling] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const previousOrderIdsRef = useRef(new Set());

  const {
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    control,
  } = useForm({
    resolver: zodResolver(CashierPaymentSchema),
    defaultValues: {
      cash_amount: "",
    },
    mode: "onChange",
  });

  const {
    data,
    isLoading: loadingSubmittedOrders,
    refetch,
  } = useQuery({
    queryKey: CASHIER_QUERY_KEYS.submittedOrders(),
    queryFn: async () => {
      const response = await CashierService.orders();
      if (!response.success) {
        throw new Error(response.message || "Failed to fetch submitted orders");
      }
      return response.data;
    },
    refetchInterval: 30000,
  });

  const refreshSubmittedOrders = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await refetch();
      await new Promise((resolve) => setTimeout(resolve, 800));
    } finally {
      setIsRefreshing(false);
    }
  }, [refetch]);

  const submittedOrders = useMemo(() => {
    if (Array.isArray(data)) {
      return data;
    }
    return data?.orders || [];
  }, [data]);

  useEffect(() => {
    const nextIds = new Set(submittedOrders.map((order) => String(order.id)));
    const prevIds = previousOrderIdsRef.current;

    const hasNewOrder = submittedOrders.some((order) => !prevIds.has(String(order.id)));
    if (prevIds.size > 0 && hasNewOrder) {
      const timeoutId = window.setTimeout(() => {
        setIsNewOrder(true);
      }, 0);

      previousOrderIdsRef.current = nextIds;

      return () => window.clearTimeout(timeoutId);
    }

    previousOrderIdsRef.current = nextIds;
  }, [submittedOrders]);

  const clearNewOrder = useCallback(() => {
    setIsNewOrder(false);
  }, []);

  const selectedOrder = useMemo(
    () => submittedOrders.find((order) => order.id === selectedOrderId) || submittedOrders[0] || null,
    [selectedOrderId, submittedOrders],
  );

  const paymentTotal = Number(selectedOrder?.total_amount || 0);
  const taxPercentage = Number(selectedOrder?.tax_percentage) || 0;
  const orderSubtotal = paymentTotal / (1 + taxPercentage / 100);
  const taxAmount = paymentTotal - orderSubtotal;

  const cashAmountField = useWatch({
    control,
    name: "cash_amount",
  });

  const parsedCashAmount = useMemo(() => {
    const normalized = Number(normalizeCashDigits(cashAmountField));
    return Number.isFinite(normalized) ? normalized : 0;
  }, [cashAmountField]);

  const changeAmount = Math.max(parsedCashAmount - paymentTotal, 0);
  const isCashEnough = parsedCashAmount >= paymentTotal && parsedCashAmount > 0;

  const setCashAmount = useCallback(
    (value) => {
      setValue("cash_amount", normalizeCashDigits(value), {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    },
    [setValue],
  );

  const updatePaymentMutation = useMutation({
    mutationFn: async ({ orderId, payload }) => {
      const response = await CashierService.updatePaymentStatus(orderId, payload);
      if (!response.success || (response.status !== 200 && response.status !== 201)) {
        throw new Error(response?.message || "Gagal memperbarui status pembayaran");
      }
      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: CASHIER_QUERY_KEYS.submittedOrders() });
      await queryClient.invalidateQueries({ queryKey: ORDER_QUERY_KEYS.root });
    },
  });

  const processPayment = useCallback(async () => {
    if (!selectedOrder) {
      throw new Error("Pilih pesanan terlebih dahulu");
    }

    if (parsedCashAmount < paymentTotal) {
      throw new Error("Uang diterima masih kurang");
    }

    const orderId = selectedOrder.id;
    if (!orderId) {
      throw new Error("ID Pesanan tidak ditemukan");
    }

    setIsConfirming(true);
    try {
      const response = await updatePaymentMutation.mutateAsync({
        orderId,
        payload: {
          method: paymentMethod,
          amount: paymentTotal,
          status: "completed",
        },
      });

      reset();
      setPaymentMethod("tunai");
      await refreshSubmittedOrders();

      return response;
    } finally {
      setIsConfirming(false);
    }
  }, [
    selectedOrder,
    parsedCashAmount,
    paymentTotal,
    paymentMethod,
    updatePaymentMutation,
    reset,
    refreshSubmittedOrders,
  ]);

  const cancelOrder = useCallback(async () => {
    if (!selectedOrder) {
      throw new Error("Pilih pesanan terlebih dahulu");
    }

    const orderId = selectedOrder.id;
    if (!orderId) {
      throw new Error("ID Pesanan tidak ditemukan");
    }

    setIsCanceling(true);
    try {
      const response = await updatePaymentMutation.mutateAsync({
        orderId,
        payload: {
          method: paymentMethod,
          amount: paymentTotal,
          status: "canceled",
        },
      });

      reset();
      setPaymentMethod("tunai");
      await refreshSubmittedOrders();

      return response;
    } finally {
      setIsCanceling(false);
    }
  }, [selectedOrder, paymentTotal, paymentMethod, updatePaymentMutation, reset, refreshSubmittedOrders]);

  const canProcessPayment = !!selectedOrder && !isConfirming && !isCanceling && isCashEnough;

  return {
    submittedOrders,
    loadingSubmittedOrders,
    selectedOrder,
    selectedOrderId,
    setSelectedOrderId,

    handleSubmit,
    errors,
    control,
    setValue,
    setCashAmount,

    paymentTotal,
    orderSubtotal,
    taxAmount,
    taxPercentage,
    parsedCashAmount,
    changeAmount,
    defaultQuickCash,
    isCashEnough,

    paymentMethod,
    setPaymentMethod,

    canProcessPayment,
    loadingPayment: isConfirming,
    loadingCancel: isCanceling,
    isNewOrder,
    clearNewOrder,
    loadSubmittedOrders: refreshSubmittedOrders,
    refreshSubmittedOrders,
    isRefreshing,
    processPayment,
    cancelOrder,
  };
};

export default useCashierPayment;
