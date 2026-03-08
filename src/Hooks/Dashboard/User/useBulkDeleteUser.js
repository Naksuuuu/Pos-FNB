import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import useFilterParams from "@/Hooks/Common/useFilterParams";

import { bulkDeleteUsers, fetchUsers } from "@/Redux/Features/Dashboard/User/UserSlice";
import { selectUserBulkDeleteLoading } from "@/Redux/Features/Dashboard/User/UserSelector";

const useBulkDeleteUser = () => {
  const { setFilters } = useFilterParams();
  const dispatch = useDispatch();
  const loading = useSelector(selectUserBulkDeleteLoading);

  const bulkDelete = useCallback(
    async (userIds) => {
      const newFilters = {
        page: 1,
      };
      const response = await dispatch(bulkDeleteUsers(userIds)).unwrap();
      setFilters(newFilters);
      dispatch(fetchUsers(newFilters));

      return response;
    },
    [dispatch, setFilters],
  );

  return { bulkDelete, loading };
};

export default useBulkDeleteUser;
