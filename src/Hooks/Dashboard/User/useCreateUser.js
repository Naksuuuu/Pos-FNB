import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import useFilterParams from "@/Hooks/Common/useFilterParams";

import { createUser, fetchUsers } from "@/Redux/Features/Dashboard/User/UserSlice";
import { selectUserCreateLoading } from "@/Redux/Features/Dashboard/User/UserSelector";

const useCreateUser = () => {
  const { setFilters } = useFilterParams();
  const dispatch = useDispatch();
  const loading = useSelector(selectUserCreateLoading);

  const create = useCallback(
    async (userData) => {
      const response = await dispatch(createUser(userData)).unwrap();
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

  return { create, loading };
};

export default useCreateUser;
