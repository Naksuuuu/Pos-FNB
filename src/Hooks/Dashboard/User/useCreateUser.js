import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createUser, fetchUsers } from "@/Redux/Features/Dashboard/User/UserSlice";
import { selectUserCreateLoading, selectUserPagination } from "@/Redux/Features/Dashboard/User/UserSelector";

const useCreateUser = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectUserCreateLoading);
  const pagination = useSelector(selectUserPagination);
  const [visiblePassword, setVisiblePassword] = useState({
    password: false,
    password_confirmation: false,
  });

  const create = useCallback(
    async (userData) => {
      const response = await dispatch(createUser(userData)).unwrap();
      dispatch(
        fetchUsers({
          page: 1,
          per_page: pagination?.per_page || 15,
        }),
      );
      return response;
    },
    [dispatch, pagination],
  );

  const handleVisiblePassword = useCallback((field) => {
    setVisiblePassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  }, []);

  return { create, loading, visiblePassword, handleVisiblePassword };
};

export default useCreateUser;
