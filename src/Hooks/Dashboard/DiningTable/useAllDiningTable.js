import { selectAllDiningTables, selectDiningTableError, selectDiningTableLoading, selectDiningTablePagination } from "@/Redux/Features/Dashboard/DiningTable/DiningTableSelector";
import { fetchDiningTables } from "@/Redux/Features/Dashboard/DiningTable/DiningTableSlice";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

const useAllDiningTable = () => {
  const dispatch = useDispatch();
  const diningTables = useSelector(selectAllDiningTables);
  const loading = useSelector(selectDiningTableLoading);
  const errorMessage = useSelector(selectDiningTableError);
  const pagination = useSelector(selectDiningTablePagination);

  const loadDiningTables = useCallback(
    async (params) => {
      await dispatch(fetchDiningTables(params));
    },
    [dispatch],
  );

  return { diningTables, loadDiningTables, loading, errorMessage, pagination };
};

export default useAllDiningTable;
