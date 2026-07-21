import { useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { ROUTES } from "@/Constants/RouteConstant";
import useHistoryOrders from "./useHistoryOrders";

const useHistoryOrderDetail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tableCodeFromQuery = searchParams.get("code")?.trim() || "";
  const orderIdFromQuery = searchParams.get("orderId")?.trim() || "";
  const queryWithCode = tableCodeFromQuery ? `?code=${encodeURIComponent(tableCodeFromQuery)}` : "";
  const backLink = `${ROUTES.PUBLIC.ORDER_HISTORY}${queryWithCode}`;

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

  const taxAmount = subtotal * (parseFloat(order?.tax_percentage || "0") / 100);

  const orderIndex = useMemo(() => {
    if (!order) return -1;

    return rawOrders.findIndex((o) => {
      const oId = o?.order?.id || o?.data?.order?.id || o?.id;
      return oId === order?.id;
    });
  }, [order, rawOrders]);

  const displayIndex = orderIndex !== -1 ? orderIndex + 1 : 1;

  useEffect(() => {
    if (!loading && !order) {
      navigate(`${ROUTES.PUBLIC.ORDER_HISTORY}${queryWithCode}`);
    }
  }, [navigate, order, loading, queryWithCode]);

  return {
    order,
    items,
    taxAmount,
    displayIndex,
    loading,
    backLink,
    queryWithCode,
  };
};

export default useHistoryOrderDetail;
