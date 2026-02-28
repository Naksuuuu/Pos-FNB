import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { editUser, fetchUsers } from "@/Redux/Features/Dashboard/User/UserSlice";
import { selectUserEditLoading, selectUserPagination } from "@/Redux/Features/Dashboard/User/UserSelector";

const useEditUser = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectUserEditLoading);
  const pagination = useSelector(selectUserPagination);

  const edit = useCallback(
    async (userId, userData) => {
      const response = await dispatch(editUser([userId, userData])).unwrap();
      dispatch(
        fetchUsers({
          page: pagination?.current_page || 1,
        }),
      );
      return response;
    },
    [dispatch, pagination],
  );

  return { edit, loading };
};

export default useEditUser;
