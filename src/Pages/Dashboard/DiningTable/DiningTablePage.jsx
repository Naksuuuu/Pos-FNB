import { useCallback, useEffect, useRef, useState } from "react";

import useAllDiningTable from "@/Hooks/DiningTable/useAllDiningTable";
import useFilterParams from "@/Hooks/Common/useFilterParams";

import { Button } from "@/Components/Elements/Shadcn/button";
import DiningTableTable from "@/Components/Fragments/Dashboard/DiningTable/Table/DiningTableTable";
import DiningTableModalCreate from "@/Components/Fragments/Dashboard/DiningTable/Modal/DiningTableModalCreate";
import DiningTableModalEdit from "@/Components/Fragments/Dashboard/DiningTable/Modal/DiningTableModalEdit";
import DiningTableModalDelete from "@/Components/Fragments/Dashboard/DiningTable/Modal/DiningTableModalDelete";
import DashboardInputSearch from "@/Components/Fragments/Dashboard/Common/DashboardInputSearch";

const DiningTablePage = () => {
  const { filters, updateFilters } = useFilterParams();
  const { diningTables, loadDiningTables, loading, errorMessage } = useAllDiningTable();

  const [selectedCreateTable, setSelectedCreateTable] = useState(null);
  const [selectedEditTable, setSelectedEditTable] = useState(null);
  const [selectedDeleteTable, setSelectedDeleteTable] = useState(null);

  const search = filters.search || "";
  const [optimisticSearch, setOptimisticSearch] = useState(search);

  useEffect(() => {
    loadDiningTables(filters);
  }, [filters, loadDiningTables]);

  const handleOpenCreateModal = useCallback((state) => {
    setSelectedCreateTable(state);
  }, []);

  const handleOpenEditModal = useCallback((state) => {
    setSelectedEditTable(state);
  }, []);

  const handleOpenDeleteModal = useCallback((state) => {
    setSelectedDeleteTable(state);
  }, []);

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

  return (
    <div className="space-y-4">
      <div className="flex justify-between w-full gap-4">
        <DashboardInputSearch onSearchChange={handleSearchChange} value={optimisticSearch} placeholder="Cari Meja" />
        <Button onClick={handleOpenCreateModal}>Tambah Meja</Button>
      </div>

      <DiningTableTable diningTables={diningTables} loading={loading} errorMessage={errorMessage} onOpenEditModal={handleOpenEditModal} onOpenDeleteModal={handleOpenDeleteModal} />

      {selectedCreateTable && <DiningTableModalCreate isOpen={!!selectedCreateTable} onOpenModal={handleOpenCreateModal} />}
      {selectedEditTable && <DiningTableModalEdit selectedDiningTable={selectedEditTable} onOpenModal={handleOpenEditModal} />}
      {selectedDeleteTable && <DiningTableModalDelete selectedDiningTable={selectedDeleteTable} onOpenModal={handleOpenDeleteModal} />}
    </div>
  );
};
export default DiningTablePage;
