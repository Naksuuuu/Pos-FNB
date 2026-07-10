import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import ProfileService from "@/Features/Dashboard/Profile/Services/ProfileService";
import { ChangePasswordSchema } from "../Schema/ProfileSchema";

const useChangePassword = (onSuccess) => {
  const mutation = useMutation({
    mutationFn: async (data) => {
      try {
        const response = await ProfileService.changePassword(data);

        if (!response.success || (response.status !== 200 && response.status !== 201)) {
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
    resolver: zodResolver(ChangePasswordSchema),
  });

  const handleSubmitForm = async (data) => {
    try {
      const response = await changePassword(data);
      onSuccess?.();
      toast.success(response.message || "Password berhasil diubah");
      reset();
    } catch (error) {
      if (error?.validationErrors) {
        Object.entries(error.validationErrors).forEach(([field, message]) => {
          setError(field, { type: "server", message });
        });
        return;
      }
      toast.error(error?.message || "Gagal mengubah password");
    }
  };

  return {
    handleSubmit,
    handleSubmitForm,
    register,
    errors,
    loading: mutation.isPending,
  };
};

export default useChangePassword;
