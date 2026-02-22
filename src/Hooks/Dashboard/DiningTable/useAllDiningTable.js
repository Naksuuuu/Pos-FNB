import {
  selectAllDiningTables,
  selectDiningTableError,
  selectDiningTableLoading,
  selectDiningTablePagination,
  selectDiningTableStatistic,
} from "@/Redux/Features/Dashboard/DiningTable/DiningTableSelector";
import { fetchDiningTables } from "@/Redux/Features/Dashboard/DiningTable/DiningTableSlice";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

const useAllDiningTable = () => {
  const dispatch = useDispatch();
  const diningTables = useSelector(selectAllDiningTables);
  const loading = useSelector(selectDiningTableLoading);
  const errorMessage = useSelector(selectDiningTableError);
  const pagination = useSelector(selectDiningTablePagination);
  const statistic = useSelector(selectDiningTableStatistic);

  const loadDiningTables = useCallback(
    async (params) => {
      await dispatch(fetchDiningTables(params));
    },
    [dispatch],
  );

  return { diningTables, loadDiningTables, loading, errorMessage, pagination, statistic };
};

export default useAllDiningTable;
