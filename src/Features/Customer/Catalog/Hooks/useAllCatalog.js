import { useCallback, useEffect, useMemo, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

import CatalogService from "@/Features/Customer/Catalog/Services/CatalogService";
import { CUSTOMER_CATALOG_QUERY_KEYS } from "@/Features/Customer/Catalog/Constants/CatalogConstant";
import useAvailableCustomerTables from "@/Features/Customer/Catalog/Hooks/useAvailableCustomerTables";
import useTenant from "@/Features/Shared/Hooks/useTenant";
import { ROUTES } from "@/Constants/RouteConstant";

const useAllCatalog = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { tables, loadingTables } = useAvailableCustomerTables();
  const { tenant, loadingTenant } = useTenant();

  const { data, isLoading, refetch } = useQuery({
    queryKey: CUSTOMER_CATALOG_QUERY_KEYS.list({}),
    queryFn: async () => {
      const response = await CatalogService.catalogs({});

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch catalogs");
      }

      return response.data;
    },
  });

  const catalogs = useMemo(() => data?.menus || [], [data]);
  const loading = isLoading;
  const storedItems = JSON.parse(sessionStorage.getItem("orderItems") || "[]");
  const tableCode = searchParams.get("code")?.trim() || "";
  const scanWarningShownRef = useRef(false);
  const sectionRefs = useRef({});

  const orderItems = useMemo(() => storedItems, [storedItems]);

  const totalPrice = useMemo(() => orderItems.reduce((acc, item) => acc + item.price, 0), [orderItems]);
  const groupedCatalogs = useMemo(() => {
    if (catalogs.length === 0) return null;

    return Object.groupBy(catalogs, (catalog) => catalog.category.name);
  }, [catalogs]);

  const categoryNames = useMemo(() => Object.keys(groupedCatalogs || {}), [groupedCatalogs]);
  const tenantName = tenant?.restaurant_name || "Tenant";
  const openingTime = tenant?.opening_time ? String(tenant.opening_time).slice(0, 5) : "00:00";
  const closingTime = tenant?.closing_time ? String(tenant.closing_time).slice(0, 5) : "23:59";
  const tableOptions = useMemo(() => tables.map((table) => ({ label: table.code, value: table.code })), [tables]);
  const isScannedMode = Boolean(tableCode);
  const isSelectedTableValid = useMemo(
    () => (tableCode ? tables.some((table) => table.code === tableCode) : false),
    [tableCode, tables],
  );

  useEffect(() => {
    if (!isScannedMode || loadingTables || isSelectedTableValid || scanWarningShownRef.current) {
      return;
    }

    toast.warning("Meja tidak aktif atau Tidak tercatat");
    scanWarningShownRef.current = true;
  }, [isScannedMode, isSelectedTableValid, loadingTables]);

  useEffect(() => {
    if (!isScannedMode || loadingTables) {
      return;
    }

    if (isSelectedTableValid) {
      scanWarningShownRef.current = false;
    }
  }, [isScannedMode, isSelectedTableValid, loadingTables]);

  const handleTableChange = useCallback(
    (value) => {
      const nextParams = new URLSearchParams(searchParams);

      if (value) {
        nextParams.set("code", value);
      } else {
        nextParams.delete("code");
      }

      setSearchParams(nextParams);
    },
    [searchParams, setSearchParams],
  );

  const scrollToCategory = useCallback((categoryName) => {
    const targetSection = sectionRefs.current[categoryName];

    if (!targetSection) {
      return;
    }

    targetSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  const registerSectionRef = useCallback(
    (categoryName) => (element) => {
      sectionRefs.current[categoryName] = element;
    },
    [],
  );

  const handleCheckout = useCallback(() => {
    if (!isSelectedTableValid) {
      toast.warning("Pilih nomor meja terlebih dahulu");
      return;
    }

    navigate({
      pathname: ROUTES.PUBLIC.ORDER,
      search: tableCode ? `?code=${encodeURIComponent(tableCode)}` : "",
    });
  }, [isSelectedTableValid, navigate, tableCode]);

  const loadCatalogs = refetch;

  return {
    loadCatalogs,
    catalogs,
    loading,
    orderItems,
    totalPrice,
    groupedCatalogs,
    categoryNames,
    tenant,
    loadingTenant,
    tenantName,
    openingTime,
    closingTime,
    tables,
    loadingTables,
    tableOptions,
    tableCode,
    isScannedMode,
    isSelectedTableValid,
    handleTableChange,
    handleCheckout,
    scrollToCategory,
    registerSectionRef,
  };
};

export default useAllCatalog;
