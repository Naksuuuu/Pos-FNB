import { useCallback } from "react";
import { createDiningTable, fetchDiningTables } from "@/Redux/Features/DiningTable/DiningTableSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectDiningTableCreateLoading } from "@/Redux/Features/DiningTable/DiningTableSelector";

const useCreateDiningTable = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectDiningTableCreateLoading);

  const create = useCallback(
    async (tableData) => {
      const response = await dispatch(createDiningTable(tableData)).unwrap();
      dispatch(fetchDiningTables());
      return response;
    },
    [dispatch],
  );
  return { create, loading };
};

export default useCreateDiningTable;
