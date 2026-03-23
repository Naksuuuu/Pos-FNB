import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// , payOrder
import { clearNewOrderFlag, fetchSubmittedOrders, refetchSubmittedOrders, updateOrderStatus } from "@/Redux/Features/Dashboard/Cashier/CashierPaymentSlice";
import { selectCashierPaymentVM } from "@/Redux/Features/Dashboard/Cashier/CashierSelector";
import { CashierPaymentSchema } from "@/Schema/Cashier/CashierSchema";

const defaultQuickCash = [20000, 50000, 100000];

const normalizeCashDigits = (value) => String(value ?? "").replace(/[^0-9]/g, "");

const useCashierPayment = () => {
  const dispatch = useDispatch();

  const { submittedOrders, loadingSubmittedOrders, loadingPayment, loadingUpdateStatus, isNewOrder } = useSelector(selectCashierPaymentVM);

  const [selectedOrderId, setSelectedOrderId] = useState(null);

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

  const cashAmountField = useWatch({
    control,
    name: "cash_amount",
  });

  const loadSubmittedOrders = useCallback(() => {
    dispatch(fetchSubmittedOrders());
  }, [dispatch]);

  const refreshSubmittedOrders = useCallback(() => {
    dispatch(refetchSubmittedOrders());
  }, [dispatch]);

  const clearNewOrder = useCallback(() => {
    dispatch(clearNewOrderFlag());
  }, [dispatch]);

  const selectedOrder = useMemo(() => submittedOrders.find((order) => order.id === selectedOrderId) || submittedOrders[0] || null, [selectedOrderId, submittedOrders]);

  const paymentTotal = Number(selectedOrder?.total_amount || 0);

  const parsedCashAmount = useMemo(() => {
    const normalized = Number(normalizeCashDigits(cashAmountField));
    return Number.isFinite(normalized) ? normalized : 0;
  }, [cashAmountField]);

  const formattedCashAmount = parsedCashAmount > 0 ? parsedCashAmount.toLocaleString("id-ID") : "";
  const changeAmount = Math.max(parsedCashAmount - paymentTotal, 0);
  const isCashEnough = parsedCashAmount >= paymentTotal && parsedCashAmount > 0;

  const canProcessPayment = !!selectedOrder && !loadingPayment && !loadingUpdateStatus && isCashEnough;

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

  const processPayment = useCallback(async () => {
    if (!selectedOrder) {
      throw new Error("Pilih pesanan terlebih dahulu");
    }

    if (parsedCashAmount < paymentTotal) {
      throw new Error("Uang diterima masih kurang");
    }

    // const paymentPayload = {
    //   order_id: selectedOrder.id,
    //   method: "cash",
    //   amount: parsedCashAmount,
    //   status: "paid",
    // };

    const response = await dispatch(updateOrderStatus([selectedOrder.id, { status: "completed" }])).unwrap();
    //  await dispatch(payOrder(paymentPayload)).unwrap();

    reset();

    loadSubmittedOrders();

    return response;
  }, [dispatch, selectedOrder, parsedCashAmount, paymentTotal, loadSubmittedOrders, reset]);

  useEffect(() => {
    loadSubmittedOrders();

    const intervalId = setInterval(() => {
      refreshSubmittedOrders();
    }, 30000);

    return () => clearInterval(intervalId);
  }, [loadSubmittedOrders, refreshSubmittedOrders]);

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
    loadingPayment,
    loadingUpdateStatus,
    isNewOrder,
    clearNewOrder,
    loadSubmittedOrders,
    refreshSubmittedOrders,
    processPayment,
  };
};

export default useCashierPayment;
