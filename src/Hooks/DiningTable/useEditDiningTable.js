import { selectDiningTableEditLoading } from "@/Redux/Features/DiningTable/DiningTableSelector";
import { editDiningTable, fetchDiningTables } from "@/Redux/Features/DiningTable/DiningTableSlice";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

const useEditDiningTable = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectDiningTableEditLoading);
  const statusOptions = useMemo(
    () => [
      { value: "available", label: "Tersedia" },
      { value: "occupied", label: "Ditempati" },
    ],
    [],
  );

  const edit = useCallback(
    async (tableId, tableData) => {
      const response = await dispatch(editDiningTable([tableId, tableData])).unwrap();
      dispatch(fetchDiningTables());
      return response;
    },
    [dispatch],
  );

  return { edit, loading, statusOptions };
};

export default useEditDiningTable;
