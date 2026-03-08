import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import useFilterParams from "@/Hooks/Common/useFilterParams";

import { selectDiningTableBulkDeleteLoading } from "@/Redux/Features/Dashboard/DiningTable/DiningTableSelector";
import { bulkDeleteDiningTables, fetchDiningTables } from "@/Redux/Features/Dashboard/DiningTable/DiningTableSlice";

const useBulkDeleteDiningTable = () => {
  const { setFilters } = useFilterParams();
  const dispatch = useDispatch();
  const loading = useSelector(selectDiningTableBulkDeleteLoading);

  const bulkDelete = useCallback(
    async (tableIds) => {
      const newFilters = {
        page: 1,
      };
      const response = await dispatch(bulkDeleteDiningTables(tableIds)).unwrap();
      setFilters(newFilters);
      dispatch(fetchDiningTables(newFilters));

      return response;
    },
    [dispatch, setFilters],
  );

  return { bulkDelete, loading };
};

export default useBulkDeleteDiningTable;
