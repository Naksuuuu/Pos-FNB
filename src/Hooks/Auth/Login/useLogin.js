import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectAuthLoading } from "@/Redux/Features/Auth/Login/LoginSelector";
import { LoginUser } from "@/Redux/Features/Auth/Login/LoginSlice";

const useLogin = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);

  const Login = useCallback(
    async (data) => {
      const response = await dispatch(LoginUser(data)).unwrap();
      return response;
    },
    [dispatch],
  );

  return {
    Login,
    loading,
  };
};

export default useLogin;
