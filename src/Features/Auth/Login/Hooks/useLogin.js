import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";

import LoginService from "@/Features/Auth/Login/Services/LoginService";
import { AUTH_QUERY_KEYS } from "@/Features/Auth/Shared/Constants/AuthConstant";
import { clearCredentials, setAuthLoading, setCredentials } from "@/Redux/Features/Auth/Login/LoginSlice";
import { clearAllAuthData, setAuthToken, setUserData } from "@/Utils/sessionUtils";
import { LoginSchema } from "@/Features/Auth/Login/Schema/LoginSchema";
import { toast } from "sonner";
import useTenantTier from "@/Features/Shared/Hooks/useTenantTier";

const useLogin = () => {
  const dispatch = useDispatch();
  const { isTenantPro } = useTenantTier();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const mutation = useMutation({
    mutationKey: AUTH_QUERY_KEYS.login(),
    mutationFn: async (data) => {
      const response = await LoginService.login(data);

      if (!response.success || !response.data?.auth?.token || !response.data?.user) {
        throw new Error(response.message || "Gagal Login");
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
      Cookies.remove("orderHistory");
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

  const handleSubmitForm = async (data) => {
    try {
      const response = await Login(data);
      toast.success(response.message || "Login berhasil");
    } catch (error) {
      if (error?.validationErrors) {
        Object.entries(error.validationErrors).forEach(([field, message]) => {
          setError(field, { type: "server", message });
        });
        return;
      }

      toast.error(error?.message || "Gagal login");
    }
  };

  return {
    loading: mutation.isPending,
    register,
    handleSubmit,
    errors,
    handleSubmitForm,
    isTenantPro,
  };
};

export default useLogin;
