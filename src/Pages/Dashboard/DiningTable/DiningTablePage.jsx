import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, Plus } from "lucide-react";
import { Link } from "react-router";

import { SORT_DIRECTION_OPTIONS, STATUS_OPTIONS } from "@/Constants/Dashboard/DiningTable/DiningTableConstant";

import useAllDiningTable from "@/Hooks/Dashboard/DiningTable/useAllDiningTable";
import useFilterParams from "@/Hooks/Common/useFilterParams";

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
import DiningTableStatistic from "@/Components/Fragments/Dashboard/DiningTable/Statistic/DiningTableStatistic";

const DiningTablePage = () => {
  const { filters, updateFilters, resetFilters } = useFilterParams();
  const { diningTables, loadDiningTables, loading, errorMessage, pagination, statistic } = useAllDiningTable();

  const [selectedCreateTable, setSelectedCreateTable] = useState(null);
  const [selectedEditTable, setSelectedEditTable] = useState(null);
  const [selectedDeleteTable, setSelectedDeleteTable] = useState(null);

  const search = filters.search || "";
  const [optimisticSearch, setOptimisticSearch] = useState(search);

  const showReset = !!(filters.sort_direction || filters.status || search);

  useEffect(() => {
    loadDiningTables(filters);
  }, [filters, loadDiningTables]);

  const handleSortDirectionChange = useCallback(
    (e) => {
      updateFilters({ sort_direction: e });
    },
    [updateFilters],
  );

  const handleStatusChange = useCallback(
    (e) => {
      updateFilters({ status: e });
    },
    [updateFilters],
  );

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
        updateFilters({ search: e.target.value, page: 1 });
      }, 300);
    },
    [updateFilters],
  );

  const handleResetFilter = useCallback(() => {
    resetFilters();
  }, [resetFilters]);

  const handleOpenCreateModal = useCallback((state) => {
    setSelectedCreateTable(state);
  }, []);

  const handleOpenEditModal = useCallback((state) => {
    setSelectedEditTable(state);
  }, []);

  const handleOpenDeleteModal = useCallback((state) => {
    setSelectedDeleteTable(state);
  }, []);

  return (
    <div className="bg-dashboard grid grid-cols-1 xl:grid-cols-3 gap-4">
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
            <InputSearch id="search" onSearchChange={handleSearchChange} value={optimisticSearch} placeholder="Cari Meja" />
          </Field>
          <div className="flex gap-4">
            <Field>
              <Label htmlFor="sort_staus">Status</Label>
              <Select id="sort_status" items={STATUS_OPTIONS} onValueChange={handleStatusChange} value={filters.status || null} label="Status" placeholder="Pilih Status" />
            </Field>
            <Field>
              <Label htmlFor="sort_direction">Urutan</Label>
              <Select id="sort_direction" items={SORT_DIRECTION_OPTIONS} onValueChange={handleSortDirectionChange} value={filters.sort_direction || null} label="Urutan" placeholder="Pilih urutan" />
            </Field>
          </div>
        </Card>

        <ButtonResetFilter condition={showReset} onResetFilter={handleResetFilter} />
      </div>

      <div className="xl:col-span-2">
        <Card className="overflow-hidden space-y-2">
          <DiningTableTable
            diningTables={diningTables}
            loading={loading}
            errorMessage={errorMessage}
            onOpenEditModal={handleOpenEditModal}
            onOpenDeleteModal={handleOpenDeleteModal}
            pagination={pagination}
            handlePageChange={handlePageChange}
          />
        </Card>
      </div>

      {selectedCreateTable && <DiningTableModalCreate isOpen={!!selectedCreateTable} onOpenModal={handleOpenCreateModal} />}
      {selectedEditTable && <DiningTableModalEdit selectedDiningTable={selectedEditTable} onOpenModal={handleOpenEditModal} />}
      {selectedDeleteTable && <DiningTableModalDelete selectedDiningTable={selectedDeleteTable} onOpenModal={handleOpenDeleteModal} />}
    </div>
  );
};
export default DiningTablePage;
