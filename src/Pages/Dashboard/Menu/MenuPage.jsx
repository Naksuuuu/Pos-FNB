import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Plus, Settings } from "lucide-react";

import { IS_AVAILABLE_OPTIONS, SORT_DIRECTION_OPTIONS, SORY_BY_OPTIONS } from "@/Constants/Dashboard/Menu/MenuConstant";

import useAllMenu from "@/Hooks/Dashboard/Menu/useAllMenu";
import useCheckboxMenu from "@/Hooks/Dashboard/Menu/useCheckboxMenu";

import { Card } from "@/Components/Elements/Cards/Card";
import { DropDown } from "@/Components/Elements/Buttons/DropDown";
import { ButtonResetFilter } from "@/Components/Elements/Buttons/ButtonResetFilter";
import { Select } from "@/Components/Elements/Inputs/Select";
import { InputSearch } from "@/Components/Elements/Inputs/InputSearch";
import { Field } from "@/Components/Elements/Shadcn/field";
import { Label } from "@/Components/Elements/Shadcn/label";
import { Button } from "@/Components/Elements/Shadcn/button";

import MenuModalCreate from "@/Components/Fragments/Dashboard/Menu/Modal/MenuModalCreate";
import MenuModalEdit from "@/Components/Fragments/Dashboard/Menu/Modal/MenuModalEdit";
import MenuModalDelete from "@/Components/Fragments/Dashboard/Menu/Modal/MenuModalDelete";
import MenuTable from "@/Components/Fragments/Dashboard/Menu/Table/MenuTable";
import CategoryModalCreate from "@/Components/Fragments/Dashboard/Category/Modal/CategoryModalCreate";
import DiningTableModalCreate from "@/Components/Fragments/Dashboard/DiningTable/Modal/DiningTableModalCreate";
import MenuStatistic from "@/Components/Fragments/Dashboard/Menu/Statistic/MenuStatistic";
import MenuModalBulkDelete from "@/Components/Fragments/Dashboard/Menu/Modal/MenuModalBulkDelete";

const MenuPage = memo(() => {
  const {
    menus,
    loading,
    errorMessage,
    pagination,
    categoryOptions,
    statistic,
    filters,
    showReset,
    optimisticSearch,
    handlePageChange,
    handleSearchChange,
    handleSortByChange,
    handleSortDirectionChange,
    handleIsAvailableChange,
    handleCategoryIdChange,
    handleResetFilter,
  } = useAllMenu();

  const { allItemsChecked, handleAllCheckboxChange, handleCheckboxChange, isChecked, setIsChecked } = useCheckboxMenu();

  // coupling reset checkbox ketika melakukan filter atau reset filter
  const { page: _page, ...filtersWithoutPage } = filters;
  const filtersKey = JSON.stringify(filtersWithoutPage);
  useEffect(() => {
    setIsChecked([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersKey]);

  const [selectedEditMenu, setSelectedEditMenu] = useState(null);
  const [selectedDeleteMenu, setSelectedDeleteMenu] = useState(null);
  const [selectedAddMenu, setSelectedAddMenu] = useState(false);
  const [selectedBulkDeleteMenu, setSelectedBulkDeleteMenu] = useState(false);

  const handleOpenBulkDeleteModal = useCallback((state) => {
    setSelectedBulkDeleteMenu(state);
  }, []);

  const handleOpenDeleteModal = useCallback((menuSelected) => {
    setSelectedDeleteMenu(menuSelected);
  }, []);

  const handleOpenEditModal = useCallback((menuSelected) => {
    setSelectedEditMenu(menuSelected);
  }, []);

  const handleOpenCreateModal = useCallback((state) => {
    setSelectedAddMenu(state);
  }, []);

  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [diningTableModalOpen, setDiningTableModalOpen] = useState(false);

  const handleOpenCreateCategoryModal = useCallback((state) => {
    setCategoryModalOpen(state);
  }, []);

  const handleOpenCreateDiningTableModal = useCallback((state) => {
    setDiningTableModalOpen(state);
  }, []);

  const categoryItems = useMemo(
    () => [
      { key: "list-cat", label: "Lihat Semua Kategori", to: "/dashboard/inventory/category" },
      { key: "add-cat", label: "Tambah Kategori", onClick: () => handleOpenCreateCategoryModal(true) },
    ],
    [handleOpenCreateCategoryModal],
  );

  const tableItems = useMemo(
    () => [
      { key: "list-table", label: "Lihat Semua Meja", to: "/dashboard/inventory/table" },
      { key: "add-table", label: "Tambah Meja", onClick: () => handleOpenCreateDiningTableModal(true) },
    ],
    [handleOpenCreateDiningTableModal],
  );

  return (
    <>
      <MenuStatistic statistic={statistic} />

      <Card className="space-y-4">
        <div className="grid items-end grid-cols-2 gap-4 xl:grid-cols-4">
          <Field>
            <Label htmlFor="search">Cari Menu</Label>
            <InputSearch id="search" name="search" onSearchChange={handleSearchChange} value={optimisticSearch} placeholder="Cari menu..." />
          </Field>

          <Button onClick={handleOpenCreateModal}>
            <Plus />
            Tambah Menu
          </Button>

          <DropDown triggerLabel="Kelola Kategori" triggerIcon={Settings} items={categoryItems} buttonProps={{ variant: "default", size: "default" }} contentAlign="start" />

          <DropDown triggerLabel="Kelola Meja" triggerIcon={Settings} items={tableItems} buttonProps={{ variant: "default", size: "default" }} contentAlign="start" />
        </div>

        <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
          <Field>
            <Label htmlFor="sort_by">Berdasarkan</Label>
            <Select id="sort_by" name="sort_by" items={SORY_BY_OPTIONS} onValueChange={handleSortByChange} value={filters.sort_by || null} label="Berdasarkan" placeholder="Pilih Berdasarkan" />
          </Field>

          <Field>
            <Label htmlFor="sort_direction">Urutan</Label>
            <Select
              id="sort_direction"
              name="sort_direction"
              items={SORT_DIRECTION_OPTIONS}
              onValueChange={handleSortDirectionChange}
              value={filters.sort_direction || null}
              label="Urutan"
              placeholder="Pilih urutan"
            />
          </Field>

          <Field>
            <Label htmlFor="is_available">Ketersediaan</Label>
            <Select
              id="is_available"
              name="is_available"
              items={IS_AVAILABLE_OPTIONS}
              onValueChange={handleIsAvailableChange}
              value={filters.is_available || null}
              label="Ketersediaan"
              placeholder="Pilih ketersediaan"
            />
          </Field>

          <Field>
            <Label htmlFor="category_id">Kategori</Label>
            <Select
              id="category_id"
              name="category_id"
              items={categoryOptions}
              onValueChange={handleCategoryIdChange}
              value={filters.category_id || null}
              label="Kategori"
              placeholder="Pilih kategori"
            />
          </Field>
        </div>
      </Card>

      <ButtonResetFilter onResetFilter={handleResetFilter} condition={showReset} />
      <div
        className={`grid grid-cols-5 justify-end gap-4 transition-all overflow-hidden h-fit  duration-500 ease-out ${allItemsChecked.length > 0 ? "max-h-16 visible opacity-100 translate-y-0" : "max-h-0 invisible m-0 p-0 opacity-0 -translate-y-5 pointer-events-none"}`}
      >
        <Button variant="outline" onClick={() => setIsChecked([])}>
          Batal Pilih
        </Button>
        <Button variant="destructive" className="col-span-4" onClick={() => handleOpenBulkDeleteModal(true)}>
          Hapus {allItemsChecked.length} Data Terpilih?
        </Button>
      </div>

      <Card className="space-y-2 overflow-hidden">
        <MenuTable
          loading={loading}
          errorMessage={errorMessage}
          menus={menus}
          pagination={pagination}
          onOpenDeleteModal={handleOpenDeleteModal}
          onOpenEditModal={handleOpenEditModal}
          handlePageChange={handlePageChange}
          isChecked={isChecked}
          handleAllCheckboxChange={handleAllCheckboxChange}
          handleCheckboxChange={handleCheckboxChange}
        />
      </Card>

      {selectedDeleteMenu && <MenuModalDelete selectedMenu={selectedDeleteMenu} onOpenModal={handleOpenDeleteModal} />}
      {selectedEditMenu && <MenuModalEdit selectedMenu={selectedEditMenu} onOpenModal={handleOpenEditModal} />}
      {selectedAddMenu && <MenuModalCreate isOpen={selectedAddMenu} onOpenModal={handleOpenCreateModal} />}
      {selectedBulkDeleteMenu && <MenuModalBulkDelete isOpen={selectedBulkDeleteMenu} onOpenModal={handleOpenBulkDeleteModal} items={allItemsChecked} setIsChecked={setIsChecked} />}

      {categoryModalOpen && <CategoryModalCreate isOpen={categoryModalOpen} onOpenModal={handleOpenCreateCategoryModal} />}
      {diningTableModalOpen && <DiningTableModalCreate isOpen={diningTableModalOpen} onOpenModal={handleOpenCreateDiningTableModal} />}
    </>
  );
});

MenuPage.displayName = "MenuPage";

export default MenuPage;
