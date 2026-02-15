import { useCallback, useEffect, useState } from "react";
import useAllDiningTable from "@/Hooks/DiningTable/useAllDiningTable";

import { Button } from "@/Components/Elements/Shadcn/button";
import DiningTableTable from "@/Components/Fragments/Dashboard/DiningTable/Table/DiningTableTable";
import DiningTableModalCreate from "@/Components/Fragments/Dashboard/DiningTable/Modal/DiningTableModalCreate";
import DiningTableModalEdit from "@/Components/Fragments/Dashboard/DiningTable/Modal/DiningTableModalEdit";

const DiningTablePage = () => {
  const { diningTables, loadDiningTables, loading, errorMessage } = useAllDiningTable();
  const [selectedCreateTable, setSelectedCreateTable] = useState(null);
  const [selectedEditTable, setSelectedEditTable] = useState(null);

  useEffect(() => {
    loadDiningTables();
  }, [loadDiningTables]);

  const handleOpenCreateModal = useCallback((state) => {
    setSelectedCreateTable(state);
  }, []);

  const handleOpenEditModal = useCallback((state) => {
    setSelectedEditTable(state);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between w-full gap-4">
        {/* <DashboardInputSearch onSearchChange={handleSearchChange} value={optimisticSearch} placeholder="Cari menu..." /> */}
        <Button onClick={handleOpenCreateModal}>Tambah Meja</Button>
      </div>

      <DiningTableTable diningTables={diningTables} loading={loading} errorMessage={errorMessage} onOpenEditModal={handleOpenEditModal} />

      {selectedCreateTable && <DiningTableModalCreate isOpen={!!selectedCreateTable} onOpenModal={handleOpenCreateModal} />}
      {selectedEditTable && <DiningTableModalEdit selectedDiningTable={selectedEditTable} onOpenModal={handleOpenEditModal} />}
    </div>
  );
};
export default DiningTablePage;
