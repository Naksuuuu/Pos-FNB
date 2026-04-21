import { useCallback, useEffect } from "react";
import { useController, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, isValid, parse, parseISO } from "date-fns";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { SETTINGS_QUERY_KEYS } from "@/Features/Dashboard/Settings/Constants/SettingsConstant";
import useSettingResource from "@/Features/Dashboard/Settings/Hooks/useSettingResource";
import SettingsService from "@/Features/Dashboard/Settings/Services/SettingsService";
import { UpdateSettingSchema } from "@/Features/Dashboard/Settings/Schema/SettingsSchema";

const useSaveSetting = () => {
  const queryClient = useQueryClient();
  const { setting, loadingGet } = useSettingResource();

  const {
    control,
    register,
    watch,
    reset,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(UpdateSettingSchema),
    defaultValues: {
      restaurant_name: "",
      tax_percentage: "10",
      dashboard_color: "#D97706",
      is_operational: false,
      opening_time: "08:00:00",
      closing_time: "22:00:00",
      is_active: true,
    },
  });

  const { field: operationalField } = useController({
    name: "is_operational",
    control,
  });

  const { field: activeField } = useController({
    name: "is_active",
    control,
  });

  useEffect(() => {
    if (!setting) {
      return;
    }

    reset({
      restaurant_name: setting.restaurant_name || "",
      tax_percentage: setting.tax_percentage ? String(setting.tax_percentage) : "0",
      dashboard_color: setting.dashboard_color || "#D97706",
      is_operational: Boolean(setting.is_operational),
      opening_time: (() => {
        const openingRaw = String(setting.opening_time || "").trim();

        if (!openingRaw) {
          return "08:00:00";
        }

        const openingParsed = parse(openingRaw, openingRaw.length === 8 ? "HH:mm:ss" : "HH:mm", new Date());
        return isValid(openingParsed) ? format(openingParsed, "HH:mm:ss") : "08:00:00";
      })(),
      closing_time: (() => {
        const closingRaw = String(setting.closing_time || "").trim();

        if (!closingRaw) {
          return "22:00:00";
        }

        const closingParsed = parse(closingRaw, closingRaw.length === 8 ? "HH:mm:ss" : "HH:mm", new Date());
        return isValid(closingParsed) ? format(closingParsed, "HH:mm:ss") : "22:00:00";
      })(),
      is_active: Boolean(setting.is_active),
    });
  }, [reset, setting]);

  const mutation = useMutation({
    mutationFn: async (payload) => {
      try {
        const response = await SettingsService.update(payload);

        if (!response.success || (response.status !== 200 && response.status !== 201)) {
          throw new Error(response?.message || "Failed to save settings");
        }

        return response;
      } catch (error) {
        if (error?.isValidationError) {
          throw error;
        }

        throw new Error(error?.message || "Failed to save settings");
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: SETTINGS_QUERY_KEYS.detail() });
    },
  });

  const save = useCallback(
    async (payload) => {
      const response = await mutation.mutateAsync(payload);
      return response;
    },
    [mutation],
  );

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const response = await save({
        restaurant_name: formData.restaurant_name,
        tax_percentage: formData.tax_percentage,
        dashboard_color: formData.dashboard_color,
        is_operational: formData.is_operational,
        opening_time: formData.opening_time,
        closing_time: formData.closing_time,
        is_active: formData.is_active,
      });

      toast.success(response.message || "Settings berhasil disimpan");
    } catch (error) {
      if (error?.validationErrors) {
        Object.entries(error.validationErrors).forEach(([field, message]) => {
          setError(field, { type: "server", message });
        });
        return;
      }

      toast.error(error?.message || "Gagal menyimpan settings");
    }
  });

  const createdAtLabel = (() => {
    if (!setting?.created_at) {
      return "-";
    }

    const parsedDate = parseISO(String(setting.created_at));
    return isValid(parsedDate) ? format(parsedDate, "dd MMM yyyy, HH:mm") : "-";
  })();

  const updatedAtLabel = (() => {
    if (!setting?.updated_at) {
      return "-";
    }

    const parsedDate = parseISO(String(setting.updated_at));
    return isValid(parsedDate) ? format(parsedDate, "dd MMM yyyy, HH:mm") : "-";
  })();

  const selectedDashboardColor = watch("dashboard_color");
  const isOperational = watch("is_operational");
  const isActive = watch("is_active");

  return {
    loadingGet,
    loadingSave: mutation.isPending,
    createdAtLabel,
    updatedAtLabel,
    selectedDashboardColor,
    isOperational,
    isActive,
    errors,
    register,
    operationalField,
    activeField,
    onSubmit,
    timeInputProps: {
      opening_time: register("opening_time", {
        setValueAs: (value) => {
          const timeRaw = String(value || "").trim();

          if (!timeRaw) {
            return "";
          }

          const timeParsed = parse(timeRaw, timeRaw.length === 8 ? "HH:mm:ss" : "HH:mm", new Date());
          return isValid(timeParsed) ? format(timeParsed, "HH:mm:ss") : "";
        },
      }),
      closing_time: register("closing_time", {
        setValueAs: (value) => {
          const timeRaw = String(value || "").trim();

          if (!timeRaw) {
            return "";
          }

          const timeParsed = parse(timeRaw, timeRaw.length === 8 ? "HH:mm:ss" : "HH:mm", new Date());
          return isValid(timeParsed) ? format(timeParsed, "HH:mm:ss") : "";
        },
      }),
    },
  };
};

export default useSaveSetting;
