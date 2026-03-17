import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, Plus } from "lucide-react";
import { Link } from "react-router";

import { SORT_DIRECTION_OPTIONS, STATUS_OPTIONS } from "@/Constants/Dashboard/DiningTable/DiningTableConstant";

import useAllDiningTable from "@/Hooks/Dashboard/DiningTable/useAllDiningTable";
import useCheckboxDiningTable from "@/Hooks/Dashboard/DiningTable/useCheckboxDiningTable";

import { ROUTES } from "@/Constants/Common/RouteConstant";

import { Button } from "@/Components/Elements/Shadcn/button";
import { Card } from "@/Components/Elements/Cards/Card";
import { InputSearch } from "@/Components/Elements/Inputs/InputSearch";
import { Select } from "@/Components/Elements/Inputs/Select";
import { ButtonResetFilter } from "@/Components/Elements/Buttons/ButtonResetFilter";
import { Field } from "@/Components/Elements/Shadcn/field";
import { Label } from "@/Components/Elements/Shadcn/label";

import DiningTableTable from "@/Components/Fragments/Dashboard/DiningTable/Table/DiningTableTable";
import DiningTableModalCreate from "@/Components/Fragments/Dashboard/DiningTable/Modal/DiningTableModalCreate";
import DiningTableModalEdit from "@/Components/Fragments/Dashboard/DiningTable/Modal/DiningTableModalEdit";
import DiningTableModalDelete from "@/Components/Fragments/Dashboard/DiningTable/Modal/DiningTableModalDelete";
import DiningTableModalBulkDelete from "@/Components/Fragments/Dashboard/DiningTable/Modal/DiningTableModalBulkDelete";
import DiningTableStatistic from "@/Components/Fragments/Dashboard/DiningTable/Statistic/DiningTableStatistic";

const DiningTablePage = () => {
  const {
    diningTables,
    loading,
    errorMessage,
    pagination,
    statistic,
    filters,
    showReset,
    optimisticSearch,
    handlePageChange,
    handleSearchChange,
    handleSortDirectionChange,
    handleStatusChange,
    handleResetFilter,
    handlePerPageChange,
  } = useAllDiningTable();

  const { allItemsChecked, handleAllCheckboxChange, handleCheckboxChange, isChecked, setIsChecked } = useCheckboxDiningTable();

  // coupling reset checkbox ketika melakukan filter atau reset filter
  const { page: _page, ...filtersWithoutPage } = filters;
  const filtersKey = JSON.stringify(filtersWithoutPage);
  useEffect(() => {
    setIsChecked([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersKey]);

  const [selectedCreateTable, setSelectedCreateTable] = useState(null);
  const [selectedEditTable, setSelectedEditTable] = useState(null);
  const [selectedDeleteTable, setSelectedDeleteTable] = useState(null);
  const [selectedBulkDeleteTable, setSelectedBulkDeleteTable] = useState(false);

  const handleOpenCreateModal = useCallback((state) => {
    setSelectedCreateTable(state);
  }, []);

  const handleOpenEditModal = useCallback((state) => {
    setSelectedEditTable(state);
  }, []);

  const handleOpenDeleteModal = useCallback((state) => {
    setSelectedDeleteTable(state);
  }, []);

  const handleOpenBulkDeleteModal = useCallback((state) => {
    setSelectedBulkDeleteTable(state);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 bg-dashboard xl:grid-cols-3">
      <div className="space-y-4">
        <Button className="w-full">
          <Link to={ROUTES.DASHBOARD.INVENTORY.MENU} className="flex items-center gap-2">
            <ArrowLeft className="size-4" />
            Kembali Ke Managemen Menu
          </Link>
        </Button>

        <DiningTableStatistic statistic={statistic} />

        <Button onClick={handleOpenCreateModal} className="w-full">
          <Plus /> Tambah Meja
        </Button>

        <Card className="space-y-4">
          <div>
            <h2 className="font-semibold ">Cari dan Filter</h2>
          </div>
          <Field>
            <Label htmlFor="search">Cari Meja</Label>
            <InputSearch id="search" name="search" onSearchChange={handleSearchChange} value={optimisticSearch} placeholder="Cari Meja" />
          </Field>
          <div className="flex gap-4">
            <Field>
              <Label htmlFor="sort_staus">Status</Label>
              <Select id="sort_status" name="sort_status" items={STATUS_OPTIONS} onValueChange={handleStatusChange} value={filters.status || null} label="Status" placeholder="Pilih Status" />
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
          </div>
        </Card>

        <ButtonResetFilter condition={showReset} onResetFilter={handleResetFilter} />
      </div>

      <div className="space-y-4 xl:col-span-2">
        <div
          className={`grid grid-cols-5 justify-end gap-4 transition-all overflow-hidden h-fit duration-500 ease-out ${allItemsChecked.length > 0 ? "max-h-16 visible opacity-100 translate-y-0" : "max-h-0 invisible m-0 p-0 opacity-0 -translate-y-5 pointer-events-none"}`}
        >
          <Button variant="outline" onClick={() => setIsChecked([])}>
            Batal Pilih
          </Button>
          <Button variant="destructive" className="col-span-4" onClick={() => handleOpenBulkDeleteModal(true)}>
            Hapus {allItemsChecked.length} Data Terpilih?
          </Button>
        </div>

        <Card className="space-y-2 overflow-hidden">
          <DiningTableTable
            diningTables={diningTables}
            loading={loading}
            errorMessage={errorMessage}
            onOpenEditModal={handleOpenEditModal}
            onOpenDeleteModal={handleOpenDeleteModal}
            pagination={pagination}
            handlePageChange={handlePageChange}
            isChecked={isChecked}
            handleAllCheckboxChange={handleAllCheckboxChange}
            handleCheckboxChange={handleCheckboxChange}
            handlePerPageChange={handlePerPageChange}
            filters={filters}
          />
        </Card>
      </div>

      {selectedCreateTable && <DiningTableModalCreate isOpen={!!selectedCreateTable} onOpenModal={handleOpenCreateModal} />}
      {selectedEditTable && <DiningTableModalEdit selectedDiningTable={selectedEditTable} onOpenModal={handleOpenEditModal} />}
      {selectedDeleteTable && <DiningTableModalDelete selectedDiningTable={selectedDeleteTable} onOpenModal={handleOpenDeleteModal} />}
      {selectedBulkDeleteTable && <DiningTableModalBulkDelete isOpen={selectedBulkDeleteTable} onOpenModal={handleOpenBulkDeleteModal} items={allItemsChecked} setIsChecked={setIsChecked} />}
    </div>
  );
};
export default DiningTablePage;
