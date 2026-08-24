import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import { AUTH_QUERY_KEYS } from "@/Features/Auth/Shared/Constants/AuthConstant";
import { clearCredentials } from "@/Redux/Features/Auth/Login/LoginSlice";
import { clearAllAuthData, getAuthToken } from "@/Utils/sessionUtils";
import { ROUTES } from "@/Constants/RouteConstant";
import LogoutService from "@/Features/Auth/Logout/Services/LogoutService";
import Cookies from "js-cookie";

const useLogout = () => {
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationKey: AUTH_QUERY_KEYS.logout(),
    mutationFn: async () => {
      const token = getAuthToken();

      if (token) {
        await LogoutService.logout(token);
      }

      return true;
    },
    onSettled: () => {
      clearAllAuthData();
      dispatch(clearCredentials());
      Cookies.remove("orderHistory", { path: "/" });

      window.location.href = ROUTES.AUTH.LOGIN;
    },
  });

  const logout = useCallback(async () => {
    await mutation.mutateAsync();
  }, [mutation]);

  return { logout, loading: mutation.isPending };
};

export default useLogout;
