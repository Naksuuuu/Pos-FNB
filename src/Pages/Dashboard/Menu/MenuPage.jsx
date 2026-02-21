import { memo, useCallback, useEffect, useRef, useState } from "react";

import { IS_AVAILABLE_OPTIONS, SORT_DIRECTION_OPTIONS, SORY_BY_OPTIONS } from "@/Constants/Dashboard/Menu/MenuConstant";

import useAllMenu from "@/Hooks/Dashboard/Menu/useAllMenu";
import useFilterParams from "@/Hooks/Common/useFilterParams";

import { Button } from "@/Components/Elements/Shadcn/button";
import { Card } from "@/Components/Elements/Cards/Card";
import MenuModalCreate from "@/Components/Fragments/Dashboard/Menu/Modal/MenuModalCreate";
import MenuModalEdit from "@/Components/Fragments/Dashboard/Menu/Modal/MenuModalEdit";
import MenuModalDelete from "@/Components/Fragments/Dashboard/Menu/Modal/MenuModalDelete";
import MenuTable from "@/Components/Fragments/Dashboard/Menu/Table/MenuTable";
import DashboardInputSearch from "@/Components/Fragments/Dashboard/Common/DashboardInputSearch";
import DashboardSelectFilter, { DashboardResetFilter } from "@/Components/Fragments/Dashboard/Common/DashboardSelectFilter";

const MenuPage = memo(() => {
  const { filters, updateFilters, resetFilters } = useFilterParams();
  const { menus, loadMenus, loading, errorMessage, pagination, categoryOptions } = useAllMenu();
  const [selectedEditMenu, setSelectedEditMenu] = useState(null);
  const [selectedDeleteMenu, setSelectedDeleteMenu] = useState(null);
  const [selectedAddMenu, setSelectedAddMenu] = useState(false);

  const search = filters.search || "";
  const [optimisticSearch, setOptimisticSearch] = useState(search);

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

  const handleOpenDeleteModal = useCallback((menuSelected) => {
    setSelectedDeleteMenu(menuSelected);
  }, []);

  const handleOpenEditModal = useCallback((menuSelected) => {
    setSelectedEditMenu(menuSelected);
  }, []);

  const handleOpenCreateModal = useCallback((state) => {
    setSelectedAddMenu(state);
  }, []);

  return (
    <>
      <Card>
        <div className="grid grid-cols-2  gap-4 xl:grid-cols-4">
          <DashboardSelectFilter items={SORY_BY_OPTIONS} onValueChange={handleSortByChange} value={filters.sort_by || null} label="Cari Berdasarkan" placeholder="Pilih opsi" />
          <DashboardSelectFilter items={SORT_DIRECTION_OPTIONS} onValueChange={handleSortDirectionChange} value={filters.sort_direction || null} label="Urutan" placeholder="Pilih urutan" />
          <DashboardSelectFilter items={IS_AVAILABLE_OPTIONS} onValueChange={handleIsAvailableChange} value={filters.is_available || null} label="Ketersediaan" placeholder="Pilih ketersediaan" />
          <DashboardSelectFilter items={categoryOptions} onValueChange={handleCategoryIdChange} value={filters.category_id || null} label="Kategori" placeholder="Pilih kategori" />
          <div className="col-span-full flex justify-between w-full gap-4 bg-background">
            <DashboardInputSearch onSearchChange={handleSearchChange} value={optimisticSearch} placeholder="Cari menu..." />
            <Button onClick={handleOpenCreateModal}>Tambah Menu</Button>
          </div>
        </div>
      </Card>

      <DashboardResetFilter onResetFilter={handleResetFilter} condition={showReset} />

      <Card className="overflow-hidden">
        <MenuTable
          loading={loading}
          errorMessage={errorMessage}
          menus={menus}
          pagination={pagination}
          onOpenDeleteModal={handleOpenDeleteModal}
          onOpenEditModal={handleOpenEditModal}
          onPageChange={handlePageChange}
        />
      </Card>

      {selectedDeleteMenu && <MenuModalDelete selectedMenu={selectedDeleteMenu} onOpenModal={handleOpenDeleteModal} />}
      {selectedEditMenu && <MenuModalEdit selectedMenu={selectedEditMenu} onOpenModal={handleOpenEditModal} />}
      {selectedAddMenu && <MenuModalCreate isOpen={selectedAddMenu} onOpenModal={handleOpenCreateModal} />}
    </>
  );
});

export default MenuPage;
