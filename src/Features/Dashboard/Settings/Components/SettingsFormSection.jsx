import { Store } from "lucide-react";

import SettingsSectionRow from "@/Features/Dashboard/Settings/Components/SettingsSectionRow";
import useSaveSetting from "@/Features/Dashboard/Settings/Hooks/useSaveSetting";

import { Button } from "@/Components/Elements/Shadcn/button";
import { Input } from "@/Components/Elements/Inputs/Input";
import { Switch } from "@/Components/Elements/Shadcn/switch";
import { Spinner } from "@/Components/Elements/Shadcn/spinner";
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/Components/Elements/Shadcn/field";

const SettingsFormSection = () => {
  const { loadingGet, loadingSave, createdAtLabel, updatedAtLabel, selectedDashboardColor, isOperational, isActive, errors, register, setValue, operationalField, activeField, onSubmit, timeInputProps } =
    useSaveSetting();

  return (
    <form className="p-4 space-y-0 md:p-6" onSubmit={onSubmit}>
      <SettingsSectionRow title="Nama tenant" description="Nama tenant yang dipakai di dashboard dan identitas operasional.">
        <Field>
          <Input id="restaurant_name" name="restaurant_name" placeholder="Contoh: Resto Nusantara" {...register("restaurant_name")} aria-invalid={!!errors.restaurant_name} firstAddon={<Store />} />
          {errors.restaurant_name && <FieldError>{errors.restaurant_name.message}</FieldError>}
        </Field>
      </SettingsSectionRow>

      <SettingsSectionRow title="Pajak" description="Persentase pajak yang akan dipakai pada perhitungan transaksi.">
        <Field>
          <Input id="tax_percentage" name="tax_percentage" placeholder="Contoh: 10" {...register("tax_percentage")} aria-invalid={!!errors.tax_percentage} />
          {errors.tax_percentage && <FieldError>{errors.tax_percentage.message}</FieldError>}
        </Field>
      </SettingsSectionRow>

      <SettingsSectionRow title="Jam operasional" description="Atur jam buka dan jam tutup tenant.">
        <FieldGroup className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="opening_time">Jam Buka</FieldLabel>
            <Input id="opening_time" type="time" name="opening_time" {...timeInputProps.opening_time} aria-invalid={!!errors.opening_time} />
            {errors.opening_time && <FieldError>{errors.opening_time.message}</FieldError>}
          </Field>
          <Field>
            <FieldLabel htmlFor="closing_time">Jam Tutup</FieldLabel>
            <Input id="closing_time" type="time" name="closing_time" {...timeInputProps.closing_time} aria-invalid={!!errors.closing_time} />
            {errors.closing_time && <FieldError>{errors.closing_time.message}</FieldError>}
          </Field>
        </FieldGroup>
      </SettingsSectionRow>

      <SettingsSectionRow title="Warna dashboard" description="Pilih warna utama branding dashboard tenant.">
        <Field>
          <div className="flex items-center gap-2">
            <Input
              id="dashboard_color"
              type="color"
              className="w-24"
              value={selectedDashboardColor?.startsWith("#") && selectedDashboardColor.length === 7 ? selectedDashboardColor : "#D97706"}
              onChange={(e) => setValue("dashboard_color", e.target.value)}
              aria-invalid={!!errors.dashboard_color}
            />
            <Input
              id="dashboard_color_text"
              type="text"
              placeholder="Contoh: #D97706"
              {...register("dashboard_color")}
              aria-invalid={!!errors.dashboard_color}
            />
          </div>
          {errors.dashboard_color && <FieldError>{errors.dashboard_color.message}</FieldError>}
        </Field>
      </SettingsSectionRow>

      <SettingsSectionRow title="Status operasional" description="Aktifkan jika tenant sedang menerima pesanan.">
        <Field orientation="horizontal" className="items-center">
          <Switch id="is_operational" name="is_operational" checked={operationalField.value || false} onCheckedChange={operationalField.onChange} aria-invalid={!!errors.is_operational} />
          <FieldContent>
            <FieldDescription>{isOperational ? "Tenant beroperasi" : "Tenant tidak beroperasi"}</FieldDescription>
            {errors.is_operational && <FieldError>{errors.is_operational.message}</FieldError>}
          </FieldContent>
        </Field>
      </SettingsSectionRow>

      <SettingsSectionRow title="Status data" description="Menandakan record settings ini aktif di sistem.">
        <Field orientation="horizontal" className="items-center">
          <Switch id="is_active" name="is_active" checked={activeField.value || false} onCheckedChange={activeField.onChange} aria-invalid={!!errors.is_active} />
          <FieldContent>
            <FieldDescription>{isActive ? "Settings aktif" : "Settings nonaktif"}</FieldDescription>
            {errors.is_active && <FieldError>{errors.is_active.message}</FieldError>}
          </FieldContent>
        </Field>
      </SettingsSectionRow>

      <SettingsSectionRow title="Dibuat pada" description="Waktu saat tenant ini pertama kali dibuat.">
        <p className="text-sm font-medium">{createdAtLabel}</p>
      </SettingsSectionRow>

      <SettingsSectionRow title="Diperbarui pada" description="Waktu saat tenant ini terakhir diperbarui.">
        <p className="text-sm font-medium">{updatedAtLabel}</p>
      </SettingsSectionRow>

      <div className="flex justify-end pt-5">
        <Button type="submit" disabled={loadingSave || loadingGet} className="relative min-w-24">
          <span className={loadingSave ? "invisible" : "visible"}>Simpan</span>
          {loadingSave && (
            <div className="absolute">
              <Spinner />
            </div>
          )}
        </Button>
      </div>
    </form>
  );
};

export default SettingsFormSection;
