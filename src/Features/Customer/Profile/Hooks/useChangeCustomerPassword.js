import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import CustomerProfileService from "@/Features/Customer/Profile/Services/CustomerProfileService";
import { CustomerChangePasswordSchema } from "../Schema/CustomerProfileSchema";

const useChangeCustomerPassword = (onSuccess) => {
  const mutation = useMutation({
    mutationFn: async (data) => {
      try {
        const response = await CustomerProfileService.changePassword(data);

        if (!response.success) {
          throw new Error(response?.message || "Failed to change password");
        }

        return response;
      } catch (error) {
        if (error?.isValidationError) {
          throw error;
        }

        throw new Error(error?.message || "Failed to change password");
      }
    },
  });

  const changePassword = useCallback(
    async (data) => {
      const response = await mutation.mutateAsync(data);
      return response;
    },
    [mutation],
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    resolver: zodResolver(CustomerChangePasswordSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await changePassword(data);
      toast.success(response.message || "Password berhasil diubah");
      reset();
      onSuccess?.();
    } catch (error) {
      if (error?.validationErrors) {
        Object.entries(error.validationErrors).forEach(([field, message]) => {
          setError(field, { type: "server", message });
        });
        return;
      }
      toast.error(error?.message || "Gagal mengubah password");
    }
  });

  return {
    onSubmit,
    register,
    errors,
    loading: mutation.isPending,
  };
};

export default useChangeCustomerPassword;
