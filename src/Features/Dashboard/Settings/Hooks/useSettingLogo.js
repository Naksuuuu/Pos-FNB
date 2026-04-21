import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { SETTINGS_QUERY_KEYS } from "@/Features/Dashboard/Settings/Constants/SettingsConstant";
import useSettingResource from "@/Features/Dashboard/Settings/Hooks/useSettingResource";
import SettingsService from "@/Features/Dashboard/Settings/Services/SettingsService";
import { SettingLogoSchema } from "@/Features/Dashboard/Settings/Schema/SettingsSchema";

const useSettingLogo = () => {
  const queryClient = useQueryClient();
  const { setting } = useSettingResource();
  const [logoPreview, setLogoPreview] = useState(null);

  const {
    register: registerLogo,
    handleSubmit: onSubmitLogo,
    reset: resetLogo,
    setError: setLogoError,
    formState: { errors: logoErrors },
  } = useForm({
    resolver: zodResolver(SettingLogoSchema),
    defaultValues: {
      logo: undefined,
    },
  });

  useEffect(() => {
    return () => {
      if (logoPreview) {
        URL.revokeObjectURL(logoPreview);
      }
    };
  }, [logoPreview]);

  const uploadMutation = useMutation({
    mutationFn: async (logoFiles) => {
      try {
        const response = await SettingsService.uploadLogo(logoFiles);

        if (!response.success || (response.status !== 200 && response.status !== 201)) {
          throw new Error(response?.message || "Failed to upload logo");
        }

        return response;
      } catch (error) {
        if (error?.isValidationError) {
          throw error;
        }

        throw new Error(error?.message || "Failed to upload logo");
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: SETTINGS_QUERY_KEYS.detail() });
    },
  });

  const uploadLogo = useCallback(
    async (logoFiles) => {
      const response = await uploadMutation.mutateAsync(logoFiles);
      return response;
    },
    [uploadMutation],
  );

  const handleLogoFileChange = useCallback((event) => {
    const file = event.target.files?.[0];

    if (!file) {
      setLogoPreview(null);
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setLogoPreview(previewUrl);
  }, []);

  const handleSubmitLogoForm = onSubmitLogo(async (formData) => {
    if (!setting) {
      toast.error("Tidak ada settings");
      return;
    }

    try {
      const response = await uploadLogo(formData.logo);
      setLogoPreview(null);
      resetLogo({ logo: undefined });
      toast.success(response?.message || "Logo berhasil diunggah");
    } catch (error) {
      if (error?.validationErrors) {
        Object.entries(error.validationErrors).forEach(([field, message]) => {
          setLogoError(field, { type: "server", message });
        });
        return;
      }

      toast.error(error?.message || "Gagal mengunggah logo");
    }
  });

  return {
    setting,
    logoPreview,
    logoFieldProps: {
      ...registerLogo("logo", {
        setValueAs: (files) => (files && files.length > 0 ? files : undefined),
        onChange: handleLogoFileChange,
      }),
    },
    logoErrors,
    loadingUpload: uploadMutation.isPending,
    onSubmitLogo: handleSubmitLogoForm,
    resetLogo,
  };
};

export default useSettingLogo;
