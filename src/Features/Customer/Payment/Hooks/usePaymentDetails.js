import { useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import Cookies from "js-cookie";

import { ROUTES } from "@/Constants/RouteConstant";

const usePaymentDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tableCodeFromQuery = searchParams.get("code")?.trim() || "";
  const orderIdFromQuery = searchParams.get("orderId")?.trim() || "";

  const queryWithCode = tableCodeFromQuery ? `?code=${encodeURIComponent(tableCodeFromQuery)}` : "";
  const backLink = `${ROUTES.PUBLIC.CATALOG}${queryWithCode}`;

  const orderHistory = useMemo(() => {
    try {
      const stored = Cookies.get("orderHistory");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }, []);

  const storedOrder = useMemo(() => {
    if (orderIdFromQuery) {
      const found = orderHistory.find((o) => {
        const oData = o?.order || o?.data?.order || o || {};
        return oData.id === orderIdFromQuery;
      });
      if (found) return found;
    }
    return orderHistory[orderHistory.length - 1] || null;
  }, [orderHistory, orderIdFromQuery]);

  const order = useMemo(() => {
    return storedOrder?.order || storedOrder?.data?.order || storedOrder || null;
  }, [storedOrder]);

  const items = useMemo(() => order?.items || [], [order]);

  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => {
      const itemSub = Number(item.subtotal || item.price || 0);
      return acc + itemSub;
    }, 0);
  }, [items]);

  const taxPercentage = parseFloat(order?.tax_percentage || "0");
  const taxAmount = subtotal * (taxPercentage / 100);
  const grandTotal = subtotal + taxAmount;

  const orderIndex = useMemo(() => {
    if (!order) return -1;
    return orderHistory.findIndex((o) => {
      const oId = o?.order?.id || o?.data?.order?.id || o?.id;
      return oId === order?.id;
    });
  }, [order, orderHistory]);

  const displayIndex = orderIndex !== -1 ? orderIndex + 1 : orderHistory.length || 1;

  useEffect(() => {
    if (!order) {
      navigate(ROUTES.PUBLIC.CATALOG);
    }
  }, [navigate, order]);

  return {
    order,
    items,
    subtotal,
    taxPercentage,
    taxAmount,
    grandTotal,
    displayIndex,
    backLink,
    tableCodeFromQuery,
  };
};

export default usePaymentDetails;
