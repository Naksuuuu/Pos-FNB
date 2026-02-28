import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "@/Redux/Features/Dashboard/User/UserSlice";
import {
  selectAllUsers,
  selectUserError,
  selectUserLoading,
  selectUserStatistic,
  selectUserPagination,
  selectUserFilters,
} from "@/Redux/Features/Dashboard/User/UserSelector";

const useAllUser = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const loading = useSelector(selectUserLoading);
  const errorMessage = useSelector(selectUserError);
  const statistic = useSelector(selectUserStatistic);
  const pagination = useSelector(selectUserPagination);
  const reduxFilters = useSelector(selectUserFilters);

  const loadUsers = useCallback(
    async (filters = {}) => {
      await dispatch(fetchUsers(filters));
    },
    [dispatch],
  );

  return { users, loading, errorMessage, loadUsers, statistic, pagination, reduxFilters };
};

export default useAllUser;
