import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import useFilterParams from "@/Hooks/Common/useFilterParams";

import { deleteUser, fetchUsers } from "@/Redux/Features/Dashboard/User/UserSlice";
import { selectUserDeleteLoading } from "@/Redux/Features/Dashboard/User/UserSelector";

const useDeleteUser = () => {
  const { setFilters } = useFilterParams();
  const dispatch = useDispatch();
  const loading = useSelector(selectUserDeleteLoading);

  const deleteUserById = useCallback(
    async (userId) => {
      const response = await dispatch(deleteUser(userId)).unwrap();
      setFilters({
        page: 1,
      });
      dispatch(
        fetchUsers({
          page: 1,
        }),
      );
      return response;
    },
    [dispatch, setFilters],
  );

  return { deleteUserById, loading };
};

export default useDeleteUser;
