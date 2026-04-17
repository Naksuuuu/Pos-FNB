import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import LoginService from "@/Features/Auth/Login/Services/LoginService";
import { AUTH_QUERY_KEYS } from "@/Features/Auth/Login/Constants/AuthConstant";
import { clearCredentials } from "@/Redux/Features/Auth/Login/LoginSlice";
import { clearAllAuthData, getAuthToken } from "@/Utils/sessionUtils";
import { ROUTES } from "@/Constants/RouteConstant";

const useLogout = () => {
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationKey: AUTH_QUERY_KEYS.logout(),
    mutationFn: async () => {
      const token = getAuthToken();

      if (token) {
        await LoginService.logout(token);
      }

      return true;
    },
    onSettled: () => {
      clearAllAuthData();
      dispatch(clearCredentials());
      window.location.href = ROUTES.AUTH.LOGIN;
    },
  });

  const logout = useCallback(async () => {
    await mutation.mutateAsync();
  }, [mutation]);

  return { logout, loading: mutation.isPending };
};

export default useLogout;
