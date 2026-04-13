import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import useSettingResource from "@/Hooks/Dashboard/Settings/useSettingResource";
import useSaveSetting from "@/Hooks/Dashboard/Settings/useSaveSetting";
import useSettingLogo from "@/Hooks/Dashboard/Settings/useSettingLogo";
import { SettingLogoSchema, UpdateSettingSchema } from "@/Schema/Settings/SettingsSchema";

import { Card } from "@/Components/Elements/Cards/Card";
import SettingsFormSection from "@/Components/Fragments/Dashboard/Settings/SettingsFormSection";
import SettingsLogoSection from "@/Components/Fragments/Dashboard/Settings/SettingsLogoSection";

const normalizeTime = (timeValue) => {
  if (!timeValue) {
    return "";
  }

  return String(timeValue).slice(0, 5);
};

const appendSeconds = (timeValue) => {
  if (!timeValue) {
    return timeValue;
  }

  return timeValue.length === 5 ? `${timeValue}:00` : timeValue;
};

const SettingsPage = () => {
  const { setting, loadingGet, loadSetting } = useSettingResource();
  const { save, loading: loadingSave } = useSaveSetting();
  const { uploadLogo, removeLogo, loadingUpload, loadingDelete: loadingDeleteLogo } = useSettingLogo();

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
      opening_time: "08:00",
      closing_time: "22:00",
      is_active: true,
    },
  });

  const {
    register: registerLogo,
    handleSubmit: handleSubmitLogo,
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
    loadSetting();
  }, [loadSetting]);

  useEffect(() => {
    if (!setting) {
      return;
    }

    reset({
      restaurant_name: setting.restaurant_name || "",
      tax_percentage: setting.tax_percentage ? String(setting.tax_percentage) : "0",
      dashboard_color: setting.dashboard_color || "#D97706",
      is_operational: Boolean(setting.is_operational),
      opening_time: normalizeTime(setting.opening_time) || "08:00",
      closing_time: normalizeTime(setting.closing_time) || "22:00",
      is_active: Boolean(setting.is_active),
    });
  }, [reset, setting]);

  const handleSubmitForm = async (formData) => {
    try {
      const response = await save({
        restaurant_name: formData.restaurant_name,
        tax_percentage: formData.tax_percentage,
        dashboard_color: formData.dashboard_color,
        is_operational: formData.is_operational,
        opening_time: appendSeconds(formData.opening_time),
        closing_time: appendSeconds(formData.closing_time),
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
  };

  const handleUploadLogo = async (formData) => {
    if (!setting?.id) {
      toast.error("Tidak ada settings");
      return;
    }

    const response = await uploadLogo({
      id: setting.id,
      logo: formData.logo,
    });

    return response;
  };

  const handleSubmitLogoForm = async (formData) => {
    try {
      const response = await handleUploadLogo(formData);
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
  };

  const handleDeleteLogo = async () => {
    if (!setting?.id) {
      toast.error("Tidak ada settings");
      return;
    }

    try {
      const response = await removeLogo(setting.id);
      toast.success(response.message || "Logo berhasil dihapus");
    } catch (error) {
      toast.error(error?.message || "Gagal menghapus logo");
    }
  };

  if (!loadingGet && !setting) {
    return (
      <div className="flex items-start justify-center w-full p-4">
        <Card className="w-full p-0 space-y-4 shadow-sm md:p-0" outerClassName="border border-border rounded-2xl p-0">
          <div className="flex flex-col p-4 pb-4 border-b bg-primary md:p-6 text-background">
            <h3 className="text-2xl font-semibold tracking-tight">Manajemen Settings</h3>
            <p className="text-sm">Atur profil tenant, jam operasional, dan tampilan dashboard.</p>
          </div>
          <div className="p-6">
            <p className="text-sm text-muted-foreground">Tidak ada settings</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-start justify-center w-full p-4">
      <div className="w-full space-y-4">
        <Card className="w-full p-0 space-y-4 shadow-sm md:p-0" outerClassName="border border-border rounded-2xl p-0">
          <div className="flex flex-col p-4 pb-4 border-b bg-primary md:p-6 text-background">
            <div className="flex flex-col w-full">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold tracking-tight">Manajemen Settings</h3>
              </div>
              <p className="text-sm">Atur profil tenant, jam operasional, dan tampilan dashboard.</p>
            </div>
          </div>

          <SettingsFormSection
            register={register}
            control={control}
            watch={watch}
            errors={errors}
            loadingSave={loadingSave}
            loadingGet={loadingGet}
            setting={setting}
            onSubmit={handleSubmit(handleSubmitForm)}
          />
        </Card>

        <SettingsLogoSection
          setting={setting}
          registerLogo={registerLogo}
          logoErrors={logoErrors}
          loadingUpload={loadingUpload}
          loadingDeleteLogo={loadingDeleteLogo}
          onSubmitLogo={handleSubmitLogo}
          onUploadLogo={handleSubmitLogoForm}
          onDeleteLogo={handleDeleteLogo}
          resetLogo={resetLogo}
        />
      </div>
    </div>
  );
};

export default SettingsPage;
