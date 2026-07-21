import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import CashierService from "@/Features/Dashboard/Cashier/Services/CashierService";
import { CASHIER_QUERY_KEYS } from "@/Features/Dashboard/Cashier/Constants/CashierConstant";
import { CashierMemberSchema } from "@/Features/Dashboard/Cashier/Schema/CashierMemberSchema";

const useCreateCashierMember = (onSuccess) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (memberData) => {
      try {
        const response = await CashierService.createMember(memberData);

        if (!response.success || (response.status !== 200 && response.status !== 201)) {
          throw new Error(response?.message || "Failed to create member");
        }

        return response;
      } catch (error) {
        if (error?.isValidationError) {
          throw error;
        }
        throw new Error(error?.message || "Failed to create member");
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: CASHIER_QUERY_KEYS.members() });
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CashierMemberSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      username: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmitForm = useCallback(
    async (data) => {
      try {
        const response = await mutation.mutateAsync(data);
        toast.success(response.message || "Member berhasil didaftarkan");
        reset();
        if (onSuccess) onSuccess();
      } catch (error) {
        if (error?.validationErrors) {
          Object.entries(error.validationErrors).forEach(([field, message]) => {
            setError(field, { type: "server", message });
          });
          return;
        }
        toast.error(error?.message || "Gagal mendaftarkan member");
      }
    },
    [mutation, reset, setError, onSuccess],
  );

  return {
    register,
    handleSubmit,
    onSubmitForm,
    reset,
    errors,
    loading: mutation.isPending,
  };
};

export default useCreateCashierMember;
