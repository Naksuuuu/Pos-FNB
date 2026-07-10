import { useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router";
import Cookies from "js-cookie";
import { format } from "date-fns";
import { id } from "date-fns/locale";

import { ROUTES } from "@/Constants/RouteConstant";
import { selectIsAuthenticated, selectAuthUser } from "@/Redux/Features/Auth/Login/LoginSelector";
import { CUSTOMER_ORDER_QUERY_KEYS } from "../Constants/OrderConstant";
import OrderService from "../Services/OrderService";
import useTenantTier from "@/Features/Shared/Hooks/useTenantTier";

const useHistoryOrders = () => {
  const navigate = useNavigate();
  const { isTenantPro } = useTenantTier();
  const [searchParams] = useSearchParams();
  const queryParams = searchParams.toString() ? `?${searchParams.toString()}` : "";
  const tableCodeFromQuery = searchParams.get("code")?.trim() || "";

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectAuthUser);

  const { data: orders, isLoading: loading } = useQuery({
    queryKey: CUSTOMER_ORDER_QUERY_KEYS.history(user?.id),
    queryFn: async () => {
      const response = await OrderService.getByCustomerId(user?.id);

      if (!response.success) {
        throw new Error(response.message || "Gagal mengambil riwayar order");
      }

      return response.data?.orders || response.data;
    },
    enabled: isAuthenticated && !!user?.id && !!isTenantPro,
  });

  const orderHistory = useMemo(() => {
    try {
      const stored = Cookies.get("orderHistory");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }, []);

  const rawOrders = useMemo(() => {
    return isAuthenticated && isTenantPro ? (Array.isArray(orders) ? orders : orders?.orders || []) : orderHistory;
  }, [isAuthenticated, orders, orderHistory, isTenantPro]);

  const formattedOrders = useMemo(() => {
    return rawOrders
      .map((item, index) => {
        const order = item?.order || item?.data?.order || item || {};
        const orderItems = order?.items || [];
        const subtotal = orderItems.reduce((acc, orderItem) => {
          return acc + Number(orderItem.subtotal || orderItem.price || 0);
        }, 0);
        const taxPercentage = parseFloat(order?.tax_percentage || "0");
        const taxAmount = subtotal * (taxPercentage / 100);
        const grandTotal = subtotal + taxAmount;

        return {
          id: order.id,
          orderNo: order.order_no,
          customerName: order.customer_name || "Pelanggan",
          tableCode: order.table?.code || "-",
          createdAt: order.created_at || null,
          grandTotal: grandTotal,
          displayIndex: index + 1,
        };
      })
      .reverse();
  }, [rawOrders]);

  const handleOrderClick = useCallback(
    (orderId) => {
      navigate(
        {
          pathname: ROUTES.PUBLIC.ORDER_HISTORY_DETAIL,
          search: `?orderId=${encodeURIComponent(orderId)}${tableCodeFromQuery ? `&code=${encodeURIComponent(tableCodeFromQuery)}` : ""}`,
        },
        {
          state: { fromHistory: true },
        },
      );
    },
    [navigate, tableCodeFromQuery],
  );

  const formatDateString = useCallback((dateString) => {
    if (!dateString) return "-";
    try {
      return format(new Date(dateString), "dd MMMM yyyy, HH:mm", { locale: id });
    } catch {
      return dateString;
    }
  }, []);

  return {
    rawOrders,
    formattedOrders,
    loading: isAuthenticated ? loading : false,
    handleOrderClick,
    formatDateString,
    queryParams,
  };
};

export default useHistoryOrders;
