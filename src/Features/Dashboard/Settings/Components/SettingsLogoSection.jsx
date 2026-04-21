import { Upload } from "lucide-react";

import useSettingLogo from "@/Features/Dashboard/Settings/Hooks/useSettingLogo";

import { Card } from "@/Components/Elements/Cards/Card";
import { Input } from "@/Components/Elements/Inputs/Input";
import { Button } from "@/Components/Elements/Shadcn/button";
import { Spinner } from "@/Components/Elements/Shadcn/spinner";
import { Field, FieldError, FieldLabel } from "@/Components/Elements/Shadcn/field";
import { ImageWithFallback } from "@/Components/Elements/Images/ImageWithFallback";

const SettingsLogoSection = () => {
  const { setting, logoPreview, logoFieldProps, logoErrors, loadingUpload, onSubmitLogo } = useSettingLogo();

  return (
    <Card className="space-y-4" outerClassName="border border-border rounded-2xl">
      <div>
        <h4 className="font-semibold">Logo Restoran</h4>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        <div className="space-y-1 md:col-span-4">
          <p className="text-sm font-semibold">Logo tenant</p>
          <p className="text-sm text-muted-foreground">Tambahkan logo agar identitas tenant lebih jelas pada dashboard dan dokumen operasional.</p>
        </div>

        <div className="space-y-3 md:col-span-8">
          <div className="flex items-center justify-center w-full max-h-[30vh] overflow-hidden border rounded-md bg-input/20 aspect-video">
            {logoPreview ? (
              <img src={logoPreview} alt={setting?.restaurant_name || "Preview logo tenant"} className="object-cover object-center w-full h-full" />
            ) : setting?.logo_url ? (
              <ImageWithFallback src={setting.logo_url} alt={setting?.restaurant_name || "Logo tenant"} className="object-cover object-center w-full h-full" />
            ) : (
              <p className="text-sm text-muted-foreground">Belum ada logo</p>
            )}
          </div>

          <form className="space-y-3" onSubmit={onSubmitLogo}>
            <Field>
              <FieldLabel htmlFor="logo">File Logo (JPG/PNG, max 2MB)</FieldLabel>

              <label htmlFor="logo" className="block p-2 text-center border border-dashed rounded-md cursor-pointer bg-input/30! hover:bg-input/80!">
                <div className="flex items-center justify-center gap-2 text-sm font-medium">
                  <Upload className="size-4" /> Pilih gambar
                </div>
              </label>

              <Input type="file" id="logo" name="logo" accept="image/jpeg,image/jpg,image/png" className="hidden" {...logoFieldProps} aria-invalid={!!logoErrors.logo} />
              {logoErrors.logo && <FieldError>{logoErrors.logo.message}</FieldError>}
            </Field>

            <div className="flex items-center gap-2">
              <Button type="submit" disabled={!setting || loadingUpload} className="relative min-w-28">
                <span className={loadingUpload ? "invisible" : "visible"}>Upload Logo</span>
                {loadingUpload && (
                  <div className="absolute">
                    <Spinner />
                  </div>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Card>
  );
};

export default SettingsLogoSection;
