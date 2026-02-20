import { selectDiningTableEditLoading } from "@/Redux/Features/Dashboard/DiningTable/DiningTableSelector";
import { editDiningTable, fetchDiningTables } from "@/Redux/Features/Dashboard/DiningTable/DiningTableSlice";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

const useEditDiningTable = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectDiningTableEditLoading);

  const edit = useCallback(
    async (tableId, tableData) => {
      const response = await dispatch(editDiningTable([tableId, tableData])).unwrap();
      dispatch(fetchDiningTables({ search: "" }));
      return response;
    },
    [dispatch],
  );

  return { edit, loading };
};

export default useEditDiningTable;
