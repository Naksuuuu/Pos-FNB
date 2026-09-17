import { useMemo, useState, useCallback } from "react";
import { useParams, useNavigate, useSearchParams, useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";

import CatalogService from "@/Features/Customer/Catalog/Services/CatalogService";
import { CUSTOMER_CATALOG_QUERY_KEYS } from "@/Features/Customer/Catalog/Constants/CatalogConstant";
import { ROUTES } from "@/Constants/RouteConstant";
import useTenantTier from "@/Features/Shared/Hooks/useTenantTier";

const useDetailCatalog = () => {
  const catalogId = useParams().catalogId;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { isTenantPro, loading: loadingTenant } = useTenantTier();
  const canUseCustom = !loadingTenant && isTenantPro;

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

  const [selectedCustoms, setSelectedCustoms] = useState(isTenantPro && isFromOrder && Array.isArray(location.state?.selectedCustoms) ? location.state.selectedCustoms : []);

  const toggleCustomOption = useCallback(
    (optionId) => {
      if (!canUseCustom) return;

      setSelectedCustoms((prev) => (prev.includes(optionId) ? prev.filter((id) => id !== optionId) : [...prev, optionId]));
    },
    [canUseCustom],
  );

  const selectedCustomObjects = useMemo(() => {
    if (!canUseCustom || !catalog?.custom_options || !Array.isArray(catalog.custom_options)) return [];
    return catalog.custom_options.filter((opt) => selectedCustoms.includes(opt.id));
  }, [canUseCustom, catalog, selectedCustoms]);

  const customOptionsTotalPrice = useMemo(() => {
    return selectedCustomObjects.reduce((sum, opt) => sum + (Number(opt.price) || 0), 0);
  }, [selectedCustomObjects]);

  const itemUnitPrice = useMemo(() => {
    return (Number(catalog?.price) || 0) + customOptionsTotalPrice;
  }, [catalog?.price, customOptionsTotalPrice]);

  const incrementQuantity = useCallback((qty) => {
    setQuantity((prev) => Math.max(1, prev + qty));
  }, []);

  const decrentQuantity = useCallback((qty) => {
    setQuantity((prev) => Math.max(1, prev - qty));
  }, []);

  const handleOrder = useCallback(
    (catalog, quantity) => {
      const storedOrders = JSON.parse(sessionStorage.getItem("orderItems") || "[]");
      const basePrice = Number(catalog.price) || 0;
      const customPrice = selectedCustomObjects.reduce((acc, opt) => acc + (Number(opt.price) || 0), 0);
      const unitPrice = basePrice + customPrice;

      const customIdsKey = canUseCustom ? [...selectedCustoms].sort().join(",") : "";
      const previousKey = location.state?.custom_ids_key;

      let existingIndex = -1;
      if (isFromOrder && previousKey !== undefined) {
        existingIndex = storedOrders.findIndex((item) => item.menu_id === catalog.id && (item.custom_ids_key || "") === previousKey);
      }

      if (existingIndex === -1) {
        existingIndex = storedOrders.findIndex((item) => item.menu_id === catalog.id && (item.custom_ids_key || "") === customIdsKey);
      }

      if (existingIndex !== -1) {
        const existing = storedOrders[existingIndex];
        const nextQty = isFromOrder ? quantity : existing.qty + quantity;
        const updated = {
          ...existing,
          qty: nextQty,
          price: unitPrice * nextQty,
          custom_ids_key: customIdsKey,
          selected_customs: selectedCustomObjects,
        };
        storedOrders.splice(existingIndex, 1, updated);
      } else {
        storedOrders.unshift({
          name: catalog.name,
          menu_id: catalog.id,
          qty: quantity,
          price: unitPrice * quantity,
          custom_ids_key: customIdsKey,
          selected_customs: selectedCustomObjects,
        });
      }

      sessionStorage.setItem("orderItems", JSON.stringify(storedOrders));
      navigate({
        pathname: isFromOrder ? ROUTES.PUBLIC.ORDER : ROUTES.PUBLIC.CATALOG,
        search: queryWithCode,
      });
    },
    [canUseCustom, isFromOrder, location.state, navigate, queryWithCode, selectedCustomObjects, selectedCustoms],
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
    selectedCustoms,
    toggleCustomOption,
    selectedCustomObjects,
    customOptionsTotalPrice,
    itemUnitPrice,
  };
};

export default useDetailCatalog;
