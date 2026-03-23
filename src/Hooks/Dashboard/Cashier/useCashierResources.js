import useFilterParams from "@/Hooks/Common/useFilterParams";
import { selectCashierNewOrderVM } from "@/Redux/Features/Dashboard/Cashier/CashierSelector";
import { cashierResources, fetchMenus } from "@/Redux/Features/Dashboard/Cashier/CashierNewOrderSlice";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const useCashierResources = () => {
  const { filters, updateFilters } = useFilterParams();
  const dispatch = useDispatch();
  const initialParams = useRef(filters || null);
  const hasResources = useRef(false);

  const search = filters.search || "";
  const [optimisticSearch, setOptimisticSearch] = useState(search);

  const { menus, categories: categoriesFromStore, tables: tablesFromStore, loadingResources, loadingCreateOrder, pagination } = useSelector(selectCashierNewOrderVM, shallowEqual);

  const categories = useMemo(() => [{ value: "", label: "Semua" }, ...categoriesFromStore.map((category) => ({ value: category.id, label: category.name }))], [categoriesFromStore]);

  const tables = useMemo(
    () => [
      { label: "Pilih nomor meja", value: "" },
      ...tablesFromStore.map((table) => ({
        label: `${table.code} (${table.status === "available" ? "Tersedia" : "Terisi"})`,
        value: table.code,
      })),
    ],
    [tablesFromStore],
  );

  const loadMenus = useCallback(
    (filters) => {
      dispatch(fetchMenus(filters));
    },
    [dispatch],
  );

  // filtering

  const timerRef = useRef(null);
  const handleSearchChange = useCallback(
    (e) => {
      setOptimisticSearch(e.target.value);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        updateFilters({ search: e.target.value, page: 1 });
      }, 300);
    },
    [updateFilters],
  );

  const handleCategoryChange = useCallback(
    (categoryId) => {
      updateFilters({ category_id: categoryId });
    },
    [updateFilters],
  );

  const handlePerPageChange = useCallback(
    (perPage) => {
      updateFilters({ per_page: perPage, page: 1 });
    },

    [updateFilters],
  );

  const handlePageChange = useCallback(
    (newPage) => {
      updateFilters({ page: newPage });
    },
    [updateFilters],
  );

  useEffect(() => {
    dispatch(
      cashierResources({
        ...initialParams.current,
      }),
    );

    hasResources.current = true;
  }, [dispatch]);

  useEffect(() => {
    if (!hasResources.current) {
      return;
    }

    loadMenus(filters);
  }, [filters, loadMenus]);

  return {
    filters,

    categories,
    menus,
    tables,
    pagination,

    optimisticSearch,

    loadingResources,
    loadingCreateOrder,

    handleCategoryChange,
    handlePerPageChange,
    handlePageChange,
    handleSearchChange,
  };
};

export default useCashierResources;
