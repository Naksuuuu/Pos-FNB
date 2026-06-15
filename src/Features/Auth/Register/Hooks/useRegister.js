import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";

import RegisterService from "@/Features/Auth/Register/Service/RegisterService";
import { RegisterSchema } from "@/Features/Auth/Register/Schema/RegisterSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { ROUTES } from "@/Constants/RouteConstant";

const useRegister = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    setError,
    formState: { errors },
    register,
    control,
  } = useForm({
    resolver: zodResolver(RegisterSchema),
  });

  const mutation = useMutation({
    mutationFn: async (registerData) => {
      try {
        const response = await RegisterService.register(registerData);

        if (!response.success || (response.status !== 200 && response.status !== 201)) {
          throw new Error(response?.message || "Gagal Registrasi");
        }

        return response;
      } catch (error) {
        if (error?.isValidationError) {
          throw error;
        }

        throw new Error(error?.message || "Gagal Registrasi");
      }
    },
    onSuccess: async () => {},
  });

  const registerForm = useCallback(
    async (registerData) => {
      const response = await mutation.mutateAsync(registerData);
      return response;
    },
    [mutation],
  );

  const handleSubmitForm = async (data) => {
    try {
      const response = await registerForm(data);
      toast.success(response.message || "Registrasi Berhasil");
      navigate(ROUTES.AUTH.LOGIN);
    } catch (error) {
      if (error?.validationErrors) {
        Object.entries(error.validationErrors).forEach(([field, message]) => {
          setError(field, { type: "server", message });
        });
        return;
      }

      toast.error(error?.message || "Gagal menambahkan user");
    }
  };

  return {
    handleSubmitForm,
    handleSubmit,
    register,
    control,
    errors,
    loading: mutation.isPending,
  };
};

export default useRegister;
