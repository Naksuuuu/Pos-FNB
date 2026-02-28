import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteUser, fetchUsers } from "@/Redux/Features/Dashboard/User/UserSlice";
import { selectUserDeleteLoading } from "@/Redux/Features/Dashboard/User/UserSelector";

const useDeleteUser = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectUserDeleteLoading);

  const deleteUserById = useCallback(
    async (userId) => {
      const response = await dispatch(deleteUser(userId)).unwrap();
      await dispatch(fetchUsers());
      return response;
    },
    [dispatch],
  );

  return { deleteUserById, loading };
};

export default useDeleteUser;
