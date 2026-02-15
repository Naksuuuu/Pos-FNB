import { useCallback, useEffect, useState } from "react";
import useAllDiningTable from "@/Hooks/DiningTable/useAllDiningTable";

import { Button } from "@/Components/Elements/Shadcn/button";
import DiningTableTable from "@/Components/Fragments/Dashboard/DiningTable/Table/DiningTableTable";
import DiningTableModalCreate from "@/Components/Fragments/Dashboard/DiningTable/Modal/DiningTableModalCreate";
import DiningTableModalEdit from "@/Components/Fragments/Dashboard/DiningTable/Modal/DiningTableModalEdit";
import DiningTableModalDelete from "@/Components/Fragments/Dashboard/DiningTable/Modal/DiningTableModalDelete";

const DiningTablePage = () => {
  const { diningTables, loadDiningTables, loading, errorMessage } = useAllDiningTable();
  const [selectedCreateTable, setSelectedCreateTable] = useState(null);
  const [selectedEditTable, setSelectedEditTable] = useState(null);
  const [selectedDeleteTable, setSelectedDeleteTable] = useState(null);

  useEffect(() => {
    loadDiningTables();
  }, [loadDiningTables]);

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
    <div className="space-y-4">
      <div className="flex justify-between w-full gap-4">
        {/* <DashboardInputSearch onSearchChange={handleSearchChange} value={optimisticSearch} placeholder="Cari menu..." /> */}
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
