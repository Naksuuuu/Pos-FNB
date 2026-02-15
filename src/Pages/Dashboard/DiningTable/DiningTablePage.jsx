import { useCallback, useEffect, useState } from "react";
import useAllDiningTable from "@/Hooks/DiningTable/useAllDiningTable";

import DiningTableTable from "@/Components/Fragments/Dashboard/DiningTable/Table/DiningTableTable";
import { Button } from "@/Components/Elements/Shadcn/button";
import DiningTableModalCreate from "@/Components/Fragments/Dashboard/DiningTable/Modal/DiningTableModalCreate";

const DiningTablePage = () => {
  const { diningTables, loadDiningTables, loading, errorMessage } = useAllDiningTable();
  const [selectedCreateTable, setSelectedCreateTable] = useState(null);

  useEffect(() => {
    loadDiningTables();
  }, [loadDiningTables]);

  const handleOpenCreateModal = useCallback((state) => {
    setSelectedCreateTable(state);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between w-full gap-4">
        {/* <DashboardInputSearch onSearchChange={handleSearchChange} value={optimisticSearch} placeholder="Cari menu..." /> */}
        <Button onClick={handleOpenCreateModal}>Tambah Meja</Button>
      </div>

      <DiningTableTable diningTables={diningTables} loading={loading} errorMessage={errorMessage} />

      {selectedCreateTable && <DiningTableModalCreate isOpen={!!selectedCreateTable} onOpenModal={handleOpenCreateModal} />}
    </div>
  );
};
export default DiningTablePage;
