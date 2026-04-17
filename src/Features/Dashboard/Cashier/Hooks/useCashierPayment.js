import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import CashierService from "@/Features/Dashboard/Cashier/Services/CashierService";
import { CASHIER_QUERY_KEYS } from "@/Features/Dashboard/Cashier/Constants/CashierConstant";
import { CashierPaymentSchema } from "@/Features/Dashboard/Cashier/Schema/CashierSchema";

const defaultQuickCash = [20000, 50000, 100000];

const normalizeCashDigits = (value) => String(value ?? "").replace(/[^0-9]/g, "");

const useCashierPayment = () => {
  const queryClient = useQueryClient();
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isNewOrder, setIsNewOrder] = useState(false);
  const previousOrderIdsRef = useRef(new Set());

  const {
    register,
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

  const ordersParams = { status: "submitted", page: 1, per_page: 100 };

  const {
    data,
    isLoading: loadingSubmittedOrders,
    refetch: refreshSubmittedOrders,
  } = useQuery({
    queryKey: CASHIER_QUERY_KEYS.submittedOrders(ordersParams),
    queryFn: async () => {
      const response = await CashierService.orders(ordersParams);
      if (!response.success) {
        throw new Error(response.message || "Failed to fetch submitted orders");
      }
      return response.data;
    },
    refetchInterval: 30000,
  });

  const submittedOrders = useMemo(() => data?.orders || [], [data?.orders]);

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

  const selectedOrder = useMemo(() => submittedOrders.find((order) => order.id === selectedOrderId) || submittedOrders[0] || null, [selectedOrderId, submittedOrders]);

  const paymentTotal = Number(selectedOrder?.total_amount || 0);

  const cashAmountField = useWatch({
    control,
    name: "cash_amount",
  });

  const parsedCashAmount = useMemo(() => {
    const normalized = Number(normalizeCashDigits(cashAmountField));
    return Number.isFinite(normalized) ? normalized : 0;
  }, [cashAmountField]);

  const formattedCashAmount = parsedCashAmount > 0 ? parsedCashAmount.toLocaleString("id-ID") : "";
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

  const updateStatusMutation = useMutation({
    mutationFn: async ({ orderId, payload }) => {
      const response = await CashierService.updateOrderStatus(orderId, payload);
      if (!response.success || (response.status !== 200 && response.status !== 201)) {
        throw new Error(response?.message || "Failed to update order status");
      }
      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: CASHIER_QUERY_KEYS.submittedOrders(ordersParams) });
    },
  });

  const processPayment = useCallback(async () => {
    if (!selectedOrder) {
      throw new Error("Pilih pesanan terlebih dahulu");
    }

    if (parsedCashAmount < paymentTotal) {
      throw new Error("Uang diterima masih kurang");
    }

    const response = await updateStatusMutation.mutateAsync({
      orderId: selectedOrder.id,
      payload: { status: "completed" },
    });

    reset();
    await refreshSubmittedOrders();

    return response;
  }, [selectedOrder, parsedCashAmount, paymentTotal, updateStatusMutation, reset, refreshSubmittedOrders]);

  const canProcessPayment = !!selectedOrder && !updateStatusMutation.isPending && isCashEnough;

  return {
    submittedOrders,
    loadingSubmittedOrders,
    selectedOrder,
    selectedOrderId,
    setSelectedOrderId,

    register,
    handleSubmit,
    errors,
    setValue,
    setCashAmount,

    paymentTotal,
    parsedCashAmount,
    formattedCashAmount,
    changeAmount,
    defaultQuickCash,
    isCashEnough,

    canProcessPayment,
    loadingPayment: false,
    loadingUpdateStatus: updateStatusMutation.isPending,
    isNewOrder,
    clearNewOrder,
    loadSubmittedOrders: refreshSubmittedOrders,
    refreshSubmittedOrders,
    processPayment,
  };
};

export default useCashierPayment;
