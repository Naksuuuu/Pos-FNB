import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import CashierService from "@/Features/Dashboard/Cashier/Services/CashierService";
import { CASHIER_QUERY_KEYS } from "@/Features/Dashboard/Cashier/Constants/CashierConstant";
import { CashierPaymentSchema } from "@/Features/Dashboard/Cashier/Schema/CashierSchema";
import { ORDER_QUERY_KEYS } from "@/Features/Dashboard/Order/Constants/OrderConstant";

import { useBluetoothPrinter } from "@/Features/Shared/Context/BluetoothPrinterContext";
import useTenant from "@/Features/Shared/Hooks/useTenant";
import { buildReceiptBytes } from "@/Utils/ReceiptFormatter";
import echoInstance from "@/Services/Common/echoService";

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

  // Bluetooth printer and tenant contexts
  const { tenant } = useTenant();
  const { isConnected, printRaw } = useBluetoothPrinter();

  // Print and cancel modal states
  const [isOpenPrintModal, setIsOpenPrintModal] = useState(false);
  const [isOpenCancelModal, setIsOpenCancelModal] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [completedPaymentDetails, setCompletedPaymentDetails] = useState({
    method: "tunai",
    cashAmount: 0,
    changeAmount: 0,
  });

  const notificationAudioRef = useRef(null);
  const lastSoundTimeRef = useRef(0);
  const lastToastTimeRef = useRef(0);

  const playNotificationSound = useCallback(() => {
    const now = Date.now();
    if (now - lastSoundTimeRef.current < 2500) {
      return;
    }
    lastSoundTimeRef.current = now;

    const notificationAudio = notificationAudioRef.current || new Audio("/notification/new-order.mp3");
    if (notificationAudio) {
      notificationAudio.currentTime = 0;
      notificationAudio.play().catch(() => {});
    }
  }, []);

  const triggerToast = useCallback((msg) => {
    const now = Date.now();
    if (now - lastToastTimeRef.current < 2500) {
      return;
    }
    lastToastTimeRef.current = now;
    toast.info(msg);
  }, []);

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

  // Audio Notification initialization
  useEffect(() => {
    notificationAudioRef.current = new Audio("/notification/new-order.mp3");
  }, []);

  useEffect(() => {
    if (!isNewOrder) {
      return;
    }

    playNotificationSound();
    clearNewOrder();
  }, [isNewOrder, clearNewOrder, playNotificationSound]);

  // Real-Time Pusher WebSocket Event Listener for New Orders
  useEffect(() => {
    if (!echoInstance) return;

    const channel = echoInstance.channel("orders");

    const handleOrderCreatedEvent = (payload) => {
      // 1. Play notification sound (deduplicated)
      playNotificationSound();

      // 2. Display Toast Notification (deduplicated)
      const tableLabel = payload?.table_label || payload?.table_code || payload?.code || "";
      const customerName = payload?.customer_name || "Pelanggan";
      const infoMsg = tableLabel
        ? `Pesanan baru dari ${customerName} (Meja ${tableLabel})!`
        : `Pesanan baru dari ${customerName}!`;
      triggerToast(infoMsg);

      // 3. Invalidate React Query submitted orders cache to refresh UI instanly
      queryClient.invalidateQueries({
        queryKey: CASHIER_QUERY_KEYS.submittedOrders(),
      });
    };

    channel.listen(".order.created", handleOrderCreatedEvent);
    channel.listen("order.created", handleOrderCreatedEvent);
    channel.listen("OrderCreated", handleOrderCreatedEvent);

    return () => {
      channel.stopListening(".order.created", handleOrderCreatedEvent);
      channel.stopListening("order.created", handleOrderCreatedEvent);
      channel.stopListening("OrderCreated", handleOrderCreatedEvent);
      echoInstance.leaveChannel("orders");
    };
  }, [queryClient, playNotificationSound, triggerToast]);

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
          payment_amount: paymentMethod === "tunai" ? parsedCashAmount : paymentTotal,
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
          payment_amount: 0,
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
  }, [selectedOrder, paymentMethod, updatePaymentMutation, reset, refreshSubmittedOrders]);

  const canProcessPayment = !!selectedOrder && !isConfirming && !isCanceling && isCashEnough;

  // Print Logic Handler
  const handlePrintReceipt = useCallback(
    async (order, details = null) => {
      if (!order) return;
      if (!isConnected) {
        toast.error("Printer bluetooth belum terhubung. Silakan hubungkan printer di navbar.");
        return;
      }

      try {
        const method = details ? details.method : paymentMethod;
        const cash = details ? details.cashAmount : parsedCashAmount;
        const change = details ? details.changeAmount : changeAmount;

        const bytes = buildReceiptBytes({
          order,
          tenant,
          paymentMethod: method,
          parsedCashAmount: cash,
          changeAmount: change,
        });

        const success = await printRaw(bytes);
        if (success) {
          toast.success("Struk berhasil dicetak");
        }
      } catch (err) {
        toast.error(`Gagal mencetak struk: ${err.message}`);
      }
    },
    [isConnected, paymentMethod, parsedCashAmount, changeAmount, tenant, printRaw],
  );

  const handleConfirmPrint = useCallback(async () => {
    setIsOpenPrintModal(false);
    if (completedOrder) {
      await handlePrintReceipt(completedOrder, completedPaymentDetails);
    }
  }, [completedOrder, completedPaymentDetails, handlePrintReceipt]);

  const handleSubmitForm = useCallback(async () => {
    try {
      const orderToPrint = { ...selectedOrder };
      const paymentDetails = {
        method: paymentMethod,
        cashAmount: parsedCashAmount,
        changeAmount: changeAmount,
      };

      const response = await processPayment();
      toast.success(response?.message || "Pembayaran berhasil diproses");

      setCompletedOrder(orderToPrint);
      setCompletedPaymentDetails(paymentDetails);
      setIsOpenPrintModal(true);
    } catch (error) {
      toast.error(error?.message || "Gagal memproses pembayaran");
    }
  }, [selectedOrder, paymentMethod, parsedCashAmount, changeAmount, processPayment]);

  const handleCancel = useCallback(() => {
    setIsOpenCancelModal(true);
  }, []);

  const handleConfirmCancel = useCallback(async () => {
    try {
      const response = await cancelOrder();
      toast.success(response?.message || "Pesanan berhasil dibatalkan");
      setIsOpenCancelModal(false);
    } catch (error) {
      toast.error(error?.message || "Gagal membatalkan pesanan");
    }
  }, [cancelOrder]);

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

    // Modal and print values
    isOpenPrintModal,
    setIsOpenPrintModal,
    isOpenCancelModal,
    setIsOpenCancelModal,
    completedOrder,
    completedPaymentDetails,
    handlePrintReceipt,
    handleConfirmPrint,
    handleSubmitForm,
    handleCancel,
    handleConfirmCancel,
  };
};

export default useCashierPayment;
