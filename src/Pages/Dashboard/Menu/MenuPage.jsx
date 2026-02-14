import { memo, useCallback, useEffect, useRef, useState } from "react";

import useAllMenu from "@/Hooks/Menu/useAllMenu";
import useFilterParams from "@/Hooks/Common/useFilterParams";

import { Button } from "@/Components/Elements/Shadcn/button";
import MenuModalCreate from "@/Components/Fragments/Dashboard/Menu/Modal/MenuModalCreate";
import MenuModalEdit from "@/Components/Fragments/Dashboard/Menu/Modal/MenuModalEdit";
import MenuModalDelete from "@/Components/Fragments/Dashboard/Menu/Modal/MenuModalDelete";
import MenuTable from "@/Components/Fragments/Dashboard/Menu/Table/MenuTable";
import DashboardPagination from "@/Components/Fragments/Dashboard/Common/DashboardPagination";
import DashboardInputSearch from "@/Components/Fragments/Dashboard/Common/DashboardInputSearch";
import DashboardSelectFilter, { DashboardResetFilter } from "@/Components/Fragments/Dashboard/Common/DashboardSelectFilter";

const SORY_BY_OPTIONS = [
  { label: "Semua", value: "" },
  { label: "Tanggal Dibuat", value: "created_at" },
  { label: "Nama ", value: "name" },
  { label: "Harga ", value: "price" },
  { label: "Stok ", value: "stock" },
];

const SORT_DIRECTION_OPTIONS = [
  { label: "Default", value: "" },
  { label: "A-Z", value: "asc" },
  { label: "Z-A", value: "desc" },
];

const IS_AVAILABLE_OPTIONS = [
  { label: "Semua", value: "" },
  { label: "Aktif", value: "1" },
  { label: "Tidak Aktif", value: "0" },
];

const DEFAULT_CATEGORY_ID_OPTIONS = [{ label: "Semua", value: "" }];

const MenuPage = memo(() => {
  const { menus, loadMenus, loading, errorMessage, pagination, categories } = useAllMenu();
  const { filters, updateFilters, resetFilters } = useFilterParams();
  const [selectedEditProduct, setSelectedEditProduct] = useState(null);
  const [selectedDeleteProduct, setSelectedDeleteProduct] = useState(null);
  const [selectedAddProduct, setSelectedAddProduct] = useState(false);

  const search = filters.search || "";
  const [optimisticSearch, setOptimisticSearch] = useState(search);
  const [categoryOptions, setCategoryOptions] = useState([DEFAULT_CATEGORY_ID_OPTIONS]);

  useEffect(() => {
    if (categories.length === 0) return;
    setCategoryOptions([...DEFAULT_CATEGORY_ID_OPTIONS, ...categories.map((category) => ({ label: category.name, value: category.id }))]);
  }, [categories]);

  useEffect(() => {
    setOptimisticSearch(search);
  }, [search]);

  const showReset = !!(filters.sort_by || filters.sort_direction || filters.is_available || filters.category_id || search);

  useEffect(() => {
    loadMenus(filters);
  }, [loadMenus, filters]);

  const handlePageChange = useCallback(
    (newPage) => {
      updateFilters({ page: newPage });
    },
    [updateFilters],
  );

  const timerRef = useRef(null);
  const handleSearchChange = useCallback(
    (e) => {
      setOptimisticSearch(e.target.value);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        updateFilters({ search: e.target.value });
      }, 300);
    },
    [updateFilters],
  );

  const handleSortByChange = useCallback(
    (e) => {
      updateFilters({ sort_by: e });
    },
    [updateFilters],
  );

  const handleSortDirectionChange = useCallback(
    (e) => {
      updateFilters({ sort_direction: e });
    },
    [updateFilters],
  );

  const handleIsAvailableChange = useCallback(
    (e) => {
      updateFilters({ is_available: e });
    },
    [updateFilters],
  );

  const handleCategoryIdChange = useCallback(
    (e) => {
      updateFilters({ category_id: e });
    },
    [updateFilters],
  );

  const handleResetFilter = useCallback(() => {
    resetFilters();
  }, [resetFilters]);

  const handleOpenDeleteModal = useCallback((productSelected) => {
    setSelectedDeleteProduct(productSelected);
  }, []);

  const handleOpenEditModal = useCallback((productSelected) => {
    setSelectedEditProduct(productSelected);
  }, []);

  const handleOpenCreateModal = useCallback((state) => {
    setSelectedAddProduct(state);
  }, []);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2  gap-4 xl:grid-cols-4">
        <DashboardSelectFilter items={SORY_BY_OPTIONS} onValueChange={handleSortByChange} value={filters.sort_by || null} label="Cari Berdasarkan" placeholder="Pilih opsi" />
        <DashboardSelectFilter items={SORT_DIRECTION_OPTIONS} onValueChange={handleSortDirectionChange} value={filters.sort_direction || null} label="Urutan" placeholder="Pilih urutan" />
        <DashboardSelectFilter items={IS_AVAILABLE_OPTIONS} onValueChange={handleIsAvailableChange} value={filters.is_available || null} label="Ketersediaan" placeholder="Pilih ketersediaan" />
        <DashboardSelectFilter items={categoryOptions} onValueChange={handleCategoryIdChange} value={filters.category_id || null} label="Kategori" placeholder="Pilih kategori" />
      </div>

      <div className="flex justify-between w-full gap-4">
        <DashboardInputSearch onSearchChange={handleSearchChange} value={optimisticSearch} placeholder="Cari menu..." />
        <Button onClick={handleOpenCreateModal}>Tambah Menu</Button>
      </div>

      <DashboardResetFilter onResetFilter={handleResetFilter} condition={showReset} />

      <MenuTable loading={loading} errorMessage={errorMessage} menus={menus} pagination={pagination} onOpenDeleteModal={handleOpenDeleteModal} onOpenEditModal={handleOpenEditModal} />

      <DashboardPagination pagination={pagination} onPageChange={handlePageChange} />

      {selectedDeleteProduct && <MenuModalDelete selectedProduct={selectedDeleteProduct} onOpenModal={handleOpenDeleteModal} />}
      {selectedEditProduct && <MenuModalEdit selectedProduct={selectedEditProduct} onOpenModal={handleOpenEditModal} />}
      {selectedAddProduct && <MenuModalCreate isOpen={selectedAddProduct} onOpenModal={handleOpenCreateModal} />}
    </div>
  );
});

export default MenuPage;
