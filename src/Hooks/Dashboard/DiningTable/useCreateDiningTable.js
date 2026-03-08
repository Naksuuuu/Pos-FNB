import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import useFilterParams from "@/Hooks/Common/useFilterParams";

import { createDiningTable, fetchDiningTables } from "@/Redux/Features/Dashboard/DiningTable/DiningTableSlice";
import { selectDiningTableCreateLoading } from "@/Redux/Features/Dashboard/DiningTable/DiningTableSelector";

const useCreateDiningTable = () => {
  const { setFilters } = useFilterParams();
  const dispatch = useDispatch();
  const loading = useSelector(selectDiningTableCreateLoading);

  const create = useCallback(
    async (tableData) => {
      const response = await dispatch(createDiningTable(tableData)).unwrap();
      setFilters({ page: 1 });
      dispatch(fetchDiningTables({ page: 1 }));
      return response;
    },
    [dispatch, setFilters],
  );
  return { create, loading };
};

export default useCreateDiningTable;
