import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteDiningTable, fetchDiningTables } from "@/Redux/Features/Dashboard/DiningTable/DiningTableSlice";
import { selectDiningTableDeleteLoading } from "@/Redux/Features/Dashboard/DiningTable/DiningTableSelector";

const useDeleteDiningTable = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectDiningTableDeleteLoading);
  const deleteDiningTableById = useCallback(
    async (diningTableId) => {
      const response = await dispatch(deleteDiningTable(diningTableId)).unwrap();
      dispatch(fetchDiningTables());
      return response;
    },
    [dispatch],
  );
  return { deleteDiningTableById, loading };
};

export default useDeleteDiningTable;
