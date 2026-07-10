import { useMemo, useState, useCallback } from "react";
import { useParams, useNavigate, useSearchParams, useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";

import CatalogService from "@/Features/Customer/Catalog/Services/CatalogService";
import { CUSTOMER_CATALOG_QUERY_KEYS } from "@/Features/Customer/Catalog/Constants/CatalogConstant";
import { ROUTES } from "@/Constants/RouteConstant";

const useDetailCatalog = () => {
  const catalogId = useParams().catalogId;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const isFromOrder = Boolean(location.state?.fromOrder);
  const [quantity, setQuantity] = useState(isFromOrder ? location.state.quantity : 1);

  const tableCode = searchParams.get("code")?.trim() || "";
  const queryWithCode = tableCode ? `?code=${encodeURIComponent(tableCode)}` : "";

  const { data, isLoading } = useQuery({
    queryKey: CUSTOMER_CATALOG_QUERY_KEYS.list({}),
    queryFn: async () => {
      const response = await CatalogService.catalogs({});

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch catalogs");
      }

      return response.data;
    },
  });

  const catalogs = useMemo(() => data?.menus || [], [data?.menus]);
  const loading = isLoading;

  const catalog = useMemo(() => catalogs.find((item) => item.id.toString() === catalogId), [catalogs, catalogId]);

  const incrementQuantity = useCallback((qty) => {
    setQuantity((prev) => Math.max(1, prev + qty));
  }, []);

  const decrentQuantity = useCallback((qty) => {
    setQuantity((prev) => Math.max(1, prev - qty));
  }, []);

  const handleOrder = useCallback(
    (catalog, quantity) => {
      const storedOrders = JSON.parse(sessionStorage.getItem("orderItems") || "[]");
      const existingIndex = storedOrders.findIndex((item) => item.menu_id === catalog.id && item.name === catalog.name);
      const unitPrice = catalog.price || 0;

      if (existingIndex !== -1) {
        const existing = storedOrders[existingIndex];
        const nextQty = isFromOrder ? quantity : existing.qty + quantity;
        const updated = {
          ...existing,
          qty: nextQty,
          price: unitPrice * nextQty,
        };
        storedOrders.splice(existingIndex, 1, updated);
      } else {
        storedOrders.unshift({
          name: catalog.name,
          menu_id: catalog.id,
          qty: quantity,
          price: unitPrice * quantity,
        });
      }

      sessionStorage.setItem("orderItems", JSON.stringify(storedOrders));
      navigate({
        pathname: isFromOrder ? ROUTES.PUBLIC.ORDER : ROUTES.PUBLIC.CATALOG,
        search: queryWithCode,
      });
    },
    [isFromOrder, navigate, queryWithCode],
  );

  return {
    catalog,
    loading,
    quantity,
    setQuantity,
    incrementQuantity,
    decrentQuantity,
    handleOrder,
    isFromOrder,
    queryWithCode,
  };
};

export default useDetailCatalog;
