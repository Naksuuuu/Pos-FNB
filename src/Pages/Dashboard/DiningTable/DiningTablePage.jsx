import { useCallback, useEffect, useRef, useState } from "react";

import useAllDiningTable from "@/Hooks/Dashboard/DiningTable/useAllDiningTable";
import useFilterParams from "@/Hooks/Common/useFilterParams";

import { Button } from "@/Components/Elements/Shadcn/button";
import DiningTableTable from "@/Components/Fragments/Dashboard/DiningTable/Table/DiningTableTable";
import DiningTableModalCreate from "@/Components/Fragments/Dashboard/DiningTable/Modal/DiningTableModalCreate";
import DiningTableModalEdit from "@/Components/Fragments/Dashboard/DiningTable/Modal/DiningTableModalEdit";
import DiningTableModalDelete from "@/Components/Fragments/Dashboard/DiningTable/Modal/DiningTableModalDelete";
import DashboardInputSearch from "@/Components/Fragments/Dashboard/Common/DashboardInputSearch";
import { Card } from "@/Components/Elements/Cards/Card";
import { SORT_DIRECTION_OPTIONS, STATUS_OPTIONS } from "@/Constants/Dashboard/DiningTable/DiningTableConstant";
import DashboardSelectFilter from "@/Components/Fragments/Dashboard/Common/DashboardSelectFilter";

const DiningTablePage = () => {
  const { filters, updateFilters } = useFilterParams();
  const { diningTables, loadDiningTables, loading, errorMessage, pagination } = useAllDiningTable();

  const [selectedCreateTable, setSelectedCreateTable] = useState(null);
  const [selectedEditTable, setSelectedEditTable] = useState(null);
  const [selectedDeleteTable, setSelectedDeleteTable] = useState(null);

  const search = filters.search || "";
  const [optimisticSearch, setOptimisticSearch] = useState(search);

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
        updateFilters({ search: e.target.value });
      }, 300);
    },
    [updateFilters],
  );

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
    <>
      <Card>
        <div className="grid grid-cols-4 gap-4">
          <DashboardSelectFilter items={STATUS_OPTIONS} onValueChange={handleStatusChange} value={filters.status || null} label="Cari Berdasarkan Status" placeholder="Pilih opsi" />
          <DashboardSelectFilter items={SORT_DIRECTION_OPTIONS} onValueChange={handleSortDirectionChange} value={filters.sort_direction || null} label="Urutan" placeholder="Pilih urutan" />
          <DashboardInputSearch onSearchChange={handleSearchChange} value={optimisticSearch} placeholder="Cari Meja" />
          <Button onClick={handleOpenCreateModal}>Tambah Meja</Button>
        </div>
      </Card>

      <Card>
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

      {selectedCreateTable && <DiningTableModalCreate isOpen={!!selectedCreateTable} onOpenModal={handleOpenCreateModal} />}
      {selectedEditTable && <DiningTableModalEdit selectedDiningTable={selectedEditTable} onOpenModal={handleOpenEditModal} />}
      {selectedDeleteTable && <DiningTableModalDelete selectedDiningTable={selectedDeleteTable} onOpenModal={handleOpenDeleteModal} />}
    </>
  );
};
export default DiningTablePage;
