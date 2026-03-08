import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import useFilterParams from "@/Hooks/Common/useFilterParams";

import { deleteDiningTable, fetchDiningTables } from "@/Redux/Features/Dashboard/DiningTable/DiningTableSlice";
import { selectDiningTableDeleteLoading } from "@/Redux/Features/Dashboard/DiningTable/DiningTableSelector";

const useDeleteDiningTable = () => {
  const { setFilters } = useFilterParams();
  const dispatch = useDispatch();
  const loading = useSelector(selectDiningTableDeleteLoading);

  const deleteDiningTableById = useCallback(
    async (diningTableId) => {
      const response = await dispatch(deleteDiningTable(diningTableId)).unwrap();
      setFilters({ page: 1 });
      dispatch(fetchDiningTables({ page: 1 }));
      return response;
    },
    [dispatch, setFilters],
  );
  return { deleteDiningTableById, loading };
};

export default useDeleteDiningTable;
