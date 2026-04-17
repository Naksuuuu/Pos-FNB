import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import LoginService from "@/Features/Auth/Login/Services/LoginService";
import { AUTH_QUERY_KEYS } from "@/Features/Auth/Login/Constants/AuthConstant";
import { clearCredentials, setAuthLoading, setCredentials } from "@/Redux/Features/Auth/Login/LoginSlice";
import { clearAllAuthData, setAuthToken, setUserData } from "@/Utils/sessionUtils";

const useLogin = () => {
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationKey: AUTH_QUERY_KEYS.login(),
    mutationFn: async (data) => {
      const response = await LoginService.login(data);

      if (!response.success || !response.data?.auth?.token || !response.data?.user) {
        throw new Error(response.message || "Failed to login");
      }

      return response;
    },
    onMutate: () => {
      dispatch(setAuthLoading(true));
    },
    onSuccess: (response) => {
      const token = response.data.auth.token;
      const user = response.data.user;

      setAuthToken(token);
      setUserData(user);
      dispatch(setCredentials({ user, token }));
    },
    onError: () => {
      clearAllAuthData();
      dispatch(clearCredentials());
    },
    onSettled: () => {
      dispatch(setAuthLoading(false));
    },
  });

  const Login = useCallback(
    async (data) => {
      const response = await mutation.mutateAsync(data);
      return response;
    },
    [mutation],
  );

  return {
    Login,
    loading: mutation.isPending,
  };
};

export default useLogin;
