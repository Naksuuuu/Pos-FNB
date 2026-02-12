import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";

import useAllMenu from "@/Hooks/Menu/useAllMenu";

import { Button } from "@/Components/Elements/Shadcn/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/Components/Elements/Shadcn/select";
import MenuCreateModal from "@/Components/Fragments/Dashboard/Menu/Modal/MenuCreateModal";
import MenuDeleteModal from "@/Components/Fragments/Dashboard/Menu/Modal/MenuDeleteModal";
import MenuEditModal from "@/Components/Fragments/Dashboard/Menu/Modal/MenuEditModal";
import MenuTable from "@/Components/Fragments/Dashboard/Menu/Table/MenuTable";
import DashboardPagination from "@/Components/Fragments/Dashboard/Common/DashboardPagination";
import DashboardInputSearch from "@/Components/Fragments/Dashboard/Common/DashboardInputSearch";
import DashboardSelectFilter, { DashboardResetFilter } from "@/Components/Fragments/Dashboard/Common/DashboardSelectFilter";

const SORY_BY_OPTIONS = [
  { label: "Tanggal Dibuat", value: "created_at" },
  { label: "Nama ", value: "name" },
  { label: "Harga ", value: "price" },
  { label: "Stok ", value: "stock" },
];

const SORT_DIRECTION_OPTIONS = [
  { label: "A-Z", value: "asc" },
  { label: "Z-A", value: "desc" },
];

const IS_AVAILABLE_OPTIONS = [
  { label: "Aktif", value: "1" },
  { label: "Tidak Aktif", value: "0" },
];

const CATEGORY_ID_OPTIONS = [
  { label: "Makanan Berat", value: "01kh6gyke26g9k421yftvt5j38" },
  { label: "Dessert", value: "01kh6gykjhxjvgfmqmke0f3q7n" },
  { label: "Makanan Ringan", value: "01kh6gykhshb2spdq8f241dr52" },
];

const DashboardMenu = memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { menus, loadMenus, loading, errorMessage, pagination } = useAllMenu();
  const [selectedEditProduct, setSelectedEditProduct] = useState(null);
  const [selectedDeleteProduct, setSelectedDeleteProduct] = useState(null);
  const [selectedAddProduct, setSelectedAddProduct] = useState(false);

  const page = parseInt(searchParams.get("page") || pagination.current_page || 1);
  const per_page = searchParams.get("per_page") || pagination.per_page;
  const search = searchParams.get("search") || "";
  const [optimisticSearch, setOptimisticSearch] = useState(search);
  const sort_by = searchParams.get("sort_by") || "";
  const sort_direction = searchParams.get("sort_direction") || "";
  const is_available = searchParams.get("is_available") || "";
  const category_id = searchParams.get("category_id") || "";

  const showReset = !!(sort_by || sort_direction || is_available || category_id);

  useEffect(() => {
    const filters = {
      page,
      per_page,
      search,
      sort_by,
      sort_direction,
      is_available,
      category_id,
    };
    loadMenus(filters);
  }, [loadMenus, page, per_page, search, sort_by, sort_direction, is_available, category_id]);

  const updateUrlParams = useCallback(
    (newParams) => {
      const params = new URLSearchParams();
      params.set("page", newParams.page);

      if (newParams.per_page) {
        params.set("per_page", newParams.per_page);
      }
      if (newParams.search) {
        params.set("search", newParams.search);
      }

      if (newParams.sort_by) {
        params.set("sort_by", newParams.sort_by);
      }
      if (newParams.sort_direction) {
        params.set("sort_direction", newParams.sort_direction);
      }

      if (newParams.is_available) {
        params.set("is_available", newParams.is_available);
      }

      if (newParams.category_id) {
        params.set("category_id", newParams.category_id);
      }

      return setSearchParams(params);
    },
    [setSearchParams],
  );

  const handlePageChange = useCallback(
    (newPage) => {
      updateUrlParams({
        page: newPage,
        per_page,
        search,
        sort_by,
        sort_direction,
        is_available,
        category_id,
      });
    },
    [updateUrlParams, per_page, search, sort_by, sort_direction, is_available, category_id],
  );

  const timerRef = useRef(null);
  const handleSearchChange = useCallback(
    (e) => {
      const newParams = {
        page: 1,
        per_page,
        search: e.target.value,
        sort_by,
        sort_direction,
        is_available,
        category_id,
      };

      setOptimisticSearch(newParams.search);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        updateUrlParams(newParams);
      }, 300);
    },
    [updateUrlParams, per_page, sort_by, sort_direction, is_available, category_id],
  );

  const handleSortByChange = useCallback(
    (e) => {
      const newParams = {
        page: 1,
        per_page,
        search,
        sort_by: e,
        sort_direction,
        is_available,
        category_id,
      };

      updateUrlParams(newParams);
    },
    [updateUrlParams, per_page, search, sort_direction, is_available, category_id],
  );

  const handleSortDirectionChange = useCallback(
    (e) => {
      const newParams = {
        page: 1,
        per_page,
        search,
        sort_by,
        sort_direction: e,
        is_available,
        category_id,
      };

      updateUrlParams(newParams);
    },
    [updateUrlParams, per_page, search, sort_by, is_available, category_id],
  );

  const handleIsAvailableChange = useCallback(
    (e) => {
      const newParams = {
        page: 1,
        per_page,
        search,
        sort_by,
        sort_direction,
        is_available: e,
        category_id,
      };

      updateUrlParams(newParams);
    },
    [updateUrlParams, per_page, search, sort_by, sort_direction, category_id],
  );

  const handleCategoryIdChange = useCallback(
    (e) => {
      const newParams = {
        page: 1,
        per_page,
        search,
        sort_by,
        sort_direction,
        is_available,
        category_id: e,
      };

      updateUrlParams(newParams);
    },
    [updateUrlParams, per_page, search, sort_by, sort_direction, is_available],
  );

  const handleResetFilter = useCallback(() => {
    const newParams = {
      page: 1,
      per_page,
      search,
    };

    searchParams.delete("sort_by");
    searchParams.delete("sort_direction");
    searchParams.delete("is_available");
    searchParams.delete("category_id");

    updateUrlParams(newParams);
  }, [updateUrlParams, per_page, search, searchParams]);

  const handleOpenDeleteModal = useCallback((productSelected) => {
    setSelectedEditProduct(null);
    setSelectedDeleteProduct(productSelected);
  }, []);

  const handleOpenEditModal = useCallback((productSelected) => {
    setSelectedDeleteProduct(null);
    setSelectedEditProduct(productSelected);
  }, []);

  const handleOpenCreateModal = useCallback((state) => {
    setSelectedEditProduct(null);
    setSelectedDeleteProduct(null);
    setSelectedAddProduct(state);
  }, []);

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 py-4 xl:grid-cols-4">
        <div className="w-full">
          <DashboardSelectFilter items={SORY_BY_OPTIONS} onValueChange={handleSortByChange} value={sort_by} label="Cari Berdasarkan" placeholder="Pilih opsi" />
        </div>
        <div className="w-full">
          <DashboardSelectFilter items={SORT_DIRECTION_OPTIONS} onValueChange={handleSortDirectionChange} value={sort_direction} label="Urutan" placeholder="Pilih urutan" />
        </div>

        <div className="w-full">
          <DashboardSelectFilter items={IS_AVAILABLE_OPTIONS} onValueChange={handleIsAvailableChange} value={is_available} label="Ketersediaan" placeholder="Pilih ketersediaan" />
        </div>
        <div className="w-full">
          <DashboardSelectFilter items={CATEGORY_ID_OPTIONS} onValueChange={handleCategoryIdChange} value={category_id} label="Kategori" placeholder="Pilih kategori" />
        </div>
        <DashboardResetFilter onResetFilter={handleResetFilter} condition={showReset} />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between w-full gap-4">
          <DashboardInputSearch onSearchChange={(e) => handleSearchChange(e)} value={optimisticSearch} placeholder="Cari menu..." />
          <Button onClick={handleOpenCreateModal}>Tambah Menu</Button>
        </div>
        <MenuTable
          loading={loading}
          errorMessage={errorMessage}
          menus={menus}
          pagination={pagination}
          loadMenus={loadMenus}
          onOpenDeleteModal={handleOpenDeleteModal}
          onOpenEditModal={handleOpenEditModal}
        />

        <DashboardPagination pagination={pagination} onPageChange={handlePageChange} />
      </div>

      {selectedDeleteProduct && <MenuDeleteModal selectedProduct={selectedDeleteProduct} onOpenModal={handleOpenDeleteModal} />}
      {selectedEditProduct && <MenuEditModal selectedProduct={selectedEditProduct} onOpenModal={handleOpenEditModal} />}

      {selectedAddProduct && <MenuCreateModal isOpen={selectedAddProduct} onOpenModal={handleOpenCreateModal} />}
    </div>
  );
});

export default DashboardMenu;
