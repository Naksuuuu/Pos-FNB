import DiningTableTable from "@/Components/Fragments/Dashboard/DiningTable/Table/DiningTableTable";
import useAllDiningTable from "@/Hooks/DiningTable/useAllDiningTable";
import { useEffect } from "react";

const DiningTablePage = () => {
  const { diningTables, loadDiningTables, loading, errorMessage } = useAllDiningTable();

  useEffect(() => {
    loadDiningTables();
  }, [loadDiningTables]);

  return (
    <div>
      <DiningTableTable diningTables={diningTables} loading={loading} errorMessage={errorMessage} />
    </div>
  );
};
export default DiningTablePage;
