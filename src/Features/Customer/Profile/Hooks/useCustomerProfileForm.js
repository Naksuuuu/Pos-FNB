import { useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { ROUTES } from "@/Constants/RouteConstant";
import { selectIsAuthenticated } from "@/Redux/Features/Auth/Login/LoginSelector";
import useCustomerProfile from "./useCustomerProfile";
import useEditCustomerProfile from "./useEditCustomerProfile";
import { CustomerUpdateProfileSchema } from "../Schema/CustomerProfileSchema";

const useCustomerProfileForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryParams = searchParams.toString() ? `?${searchParams.toString()}` : "";

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { profile, loading: loadingProfile } = useCustomerProfile();
  const { edit, loading: loadingEdit } = useEditCustomerProfile();

  const [openModalChangePassword, setOpenModalChangePassword] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(CustomerUpdateProfileSchema),
    defaultValues: {
      name: profile?.name || "",
      username: profile?.username || "",
      email: profile?.email || "",
      phone: profile?.phone || "",
    },
    values: {
      name: profile?.name || "",
      username: profile?.username || "",
      email: profile?.email || "",
      phone: profile?.phone || "",
    },
  });

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const response = await edit(formData);
      toast.success(response.message || "Profile berhasil diupdate");
      navigate({
        pathname: ROUTES.PUBLIC.USER,
        search: queryParams,
      });
    } catch (error) {
      if (error?.validationErrors) {
        Object.entries(error.validationErrors).forEach(([field, message]) => {
          setError(field, { type: "server", message });
        });
        return;
      }
      toast.error(error?.message || "Gagal mengupdate profile");
    }
  });

  const handleOpenModalChangePassword = useCallback((state) => {
    setOpenModalChangePassword(state);
  }, []);

  return {
    register,
    onSubmit,
    errors,
    profile,
    loadingProfile,
    loadingEdit,
    isAuthenticated,
    openModalChangePassword,
    handleOpenModalChangePassword,
    queryParams,
  };
};

export default useCustomerProfileForm;
