import { useMemo, useEffect, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { ROUTES } from "@/Constants/RouteConstant";
import { CUSTOMER_ORDER_QUERY_KEYS } from "@/Features/Customer/Order/Constants/OrderConstant";
import useHistoryOrders from "./useHistoryOrders";
import OrderService from "@/Features/Customer/Order/Services/OrderService";
import PaymentService from "@/Features/Customer/Payment/Services/PaymentService";
import { normalizeOrder, updateOrderInCookies } from "@/Features/Customer/Shared/Utils/orderHelper";
import { selectIsAuthenticated } from "@/Redux/Features/Auth/Login/LoginSelector";
import useTenantTier from "@/Features/Shared/Hooks/useTenantTier";
// import { loadMidtransSnapScript } from "@/Utils/midtransHelper";

const useHistoryOrderDetail = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const tableCodeFromQuery = searchParams.get("code")?.trim() || "";
  const orderIdFromQuery = searchParams.get("orderId")?.trim() || "";
  const queryWithCode = tableCodeFromQuery ? `?code=${encodeURIComponent(tableCodeFromQuery)}` : "";
  const backLink = `${ROUTES.PUBLIC.ORDER_HISTORY}${queryWithCode}`;

  const { isTenantPro } = useTenantTier();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("idle");

  const { rawOrders, loading } = useHistoryOrders();

  const storedOrder = useMemo(() => {
    if (orderIdFromQuery) {
      const found = rawOrders.find((o) => {
        const oData = o?.order || o?.data?.order || o || {};
        return oData.id === orderIdFromQuery;
      });
      if (found) return found;
    }
    return rawOrders[rawOrders.length - 1] || null;
  }, [rawOrders, orderIdFromQuery]);

  const targetOrderId =
    orderIdFromQuery ||
    storedOrder?.order?.id ||
    storedOrder?.data?.order?.id ||
    storedOrder?.id ||
    "";

  const shouldFetchByOrderId = Boolean(targetOrderId && (!isAuthenticated || !isTenantPro));

  const { data: apiResponse } = useQuery({
    queryKey: CUSTOMER_ORDER_QUERY_KEYS.detail(targetOrderId),
    queryFn: async () => {
      const response = await OrderService.getByOrderId(targetOrderId);
      if (response) {
        updateOrderInCookies(response);
      }
      return response;
    },
    enabled: shouldFetchByOrderId,
  });

  const order = useMemo(() => {
    return normalizeOrder(apiResponse || storedOrder);
  }, [apiResponse, storedOrder]);

  const items = useMemo(() => order?.items || [], [order]);

  const orderIndex = useMemo(() => {
    if (!order) return -1;

    return rawOrders.findIndex((o) => {
      const oId = o?.order?.id || o?.data?.order?.id || o?.id;
      return oId === order?.id;
    });
  }, [order, rawOrders]);

  const displayIndex = orderIndex !== -1 ? orderIndex + 1 : 1;

  const handlePayWithMidtrans = useCallback(async () => {
    if (!order?.id) {
      toast.error("ID Pesanan tidak ditemukan");
      return;
    }

    setIsProcessingPayment(true);
    try {
      // SIMULASI PEMBAYARAN: Langsung kirim webhook ke backend
      await PaymentService.notifyMidtrans({
        transaction_status: "settlement",
        order_id: order.id,
        payment_type: "gopay",
        gross_amount: String(order.total_amount || 0),
        fraud_status: "accept",
      });

      queryClient.invalidateQueries({ queryKey: CUSTOMER_ORDER_QUERY_KEYS.root });
      toast.success("Pembayaran Non-Tunai Berhasil (Simulasi)!");
      setPaymentStatus("settlement");

      /* MIDTRANS SNAP POPUP (DI-DISABLE UNTUK SIMULASI SIMULTAN)
      let snapToken =
        order?.snap_token ||
        order?.payment?.snap_token ||
        sessionStorage.getItem(`snap_token_${order.id}`);

      if (!snapToken) {
        const tokenResponse = await PaymentService.getMidtransSnapToken(order.id);
        snapToken = tokenResponse?.snap_token || tokenResponse?.data?.snap_token;

        if (snapToken) {
          sessionStorage.setItem(`snap_token_${order.id}`, snapToken);
        }
      }

      if (!snapToken) {
        throw new Error("Gagal mendapatkan Snap Token Midtrans");
      }

      const snap = await loadMidtransSnapScript();

      snap.pay(snapToken, {
        onSuccess: async (result) => {
          toast.success("Pembayaran berhasil!");
          setPaymentStatus("settlement");

          try {
            await PaymentService.notifyMidtrans({
              transaction_status: result?.transaction_status || "settlement",
              order_id: result?.order_id || order.id,
              payment_type: result?.payment_type || "gopay",
              gross_amount: String(result?.gross_amount || order.total_amount),
              fraud_status: result?.fraud_status || "accept",
            });
          } catch {
            // silent catch
          }
        },
        onPending: () => {
          toast.info("Pembayaran tertunda. Silakan selesaikan pembayaran Anda.");
          setPaymentStatus("pending");
        },
        onError: () => {
          toast.error("Pembayaran gagal. Silakan coba lagi.");
          setPaymentStatus("failed");
        },
        onClose: () => {
          toast.info("Pop-up pembayaran ditutup.");
        },
      });
      */
    } catch (error) {
      toast.error(error.message || "Terjadi kesalahan saat memproses simulasi pembayaran");
    } finally {
      setIsProcessingPayment(false);
    }
  }, [order, queryClient]);

  useEffect(() => {
    if (!loading && !order) {
      navigate(`${ROUTES.PUBLIC.ORDER_HISTORY}${queryWithCode}`);
    }
  }, [navigate, order, loading, queryWithCode]);

  return {
    order,
    items,
    taxAmount: order?.taxAmount || 0,
    displayIndex,
    loading,
    backLink,
    queryWithCode,
    handlePayWithMidtrans,
    isProcessingPayment,
    paymentStatus,
  };
};

export default useHistoryOrderDetail;
