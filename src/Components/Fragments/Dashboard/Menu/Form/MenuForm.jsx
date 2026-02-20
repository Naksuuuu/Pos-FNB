import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/Components/Elements/Shadcn/field";
import { Input } from "@/Components/Elements/Shadcn/input";
import DashboardSelectFilter from "@/Components/Fragments/Dashboard/Common/DashboardSelectFilter";
// import { Input } from "@/Components/Elements/Shadcn/input";
import { memo, useCallback, useState } from "react";
import { Controller } from "react-hook-form";
import { Upload } from "lucide-react";
import { Textarea } from "@/Components/Elements/Shadcn/textarea";
import { Switch } from "@/Components/Elements/Shadcn/switch";
import { ImageWithFallback } from "@/Components/Elements/Images/ImageWithFallback";

const MenuForm = memo(({ errors, control, register, categoryOptions, type = "create", selectedMenu = null }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const onFileChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImagePreview(url);
  }, []);

  return (
    <FieldSet>
      {type === "edit" ? (
        <FieldGroup>
          <div className="w-full ">
            <ImageWithFallback src={selectedMenu.image_url} alt={selectedMenu.name} className="object-cover w-full mx-auto rounded-md aspect-video" />
          </div>
          <Field>
            <FieldLabel htmlFor="image">Foto Baru</FieldLabel>
            {imagePreview && (
              <div className="w-full ">
                <img src={imagePreview} alt={selectedMenu.name} className="object-cover w-full mx-auto rounded-md aspect-video" />
              </div>
            )}

            <label htmlFor="image" className="block p-2 text-center border border-dashed rounded-md cursor-pointer hover:bg-primary/5">
              <div className="flex items-center justify-center gap-2 text-sm font-medium">
                <Upload className="size-4" /> Pilih gambar
              </div>
            </label>

            <Input
              type="file"
              id="image"
              name="image"
              autoComplete="off"
              {...register("image", {
                setValueAs: (files) => (files && files.length > 0 ? files : undefined),
                onChange: onFileChange,
              })}
              aria-invalid={errors.image ? "true" : "false"}
              className="hidden"
            />
            {errors.image && <FieldError>{errors.image.message}</FieldError>}
          </Field>
        </FieldGroup>
      ) : (
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="image">
              Foto <span className="text-destructive">*</span>
            </FieldLabel>
            {imagePreview && (
              <div className="w-full ">
                <img src={imagePreview} alt={"preview"} className="object-cover object-center w-full mx-auto rounded-md aspect-video" />
              </div>
            )}

            <label htmlFor="image" className="block p-2 text-center border border-dashed rounded-md cursor-pointer hover:bg-primary/5">
              <div className="flex items-center justify-center gap-2 text-sm font-medium">
                <Upload className="size-4" /> Pilih gambar
              </div>
            </label>

            <Input
              type="file"
              id="image"
              name="image"
              autoComplete="off"
              {...register("image", {
                setValueAs: (files) => (files && files.length > 0 ? files : undefined),
                onChange: onFileChange,
              })}
              aria-invalid={errors.image ? "true" : "false"}
              className="hidden"
            />
            {errors.image && <FieldError>{errors.image.message}</FieldError>}
          </Field>
        </FieldGroup>
      )}

      <FieldGroup className="grid grid-cols-2">
        <Field>
          <FieldLabel htmlFor="name">
            Nama Menu <span className="text-destructive">*</span>
          </FieldLabel>
          <Input id="name" name="name" autoComplete="off" {...register("name")} aria-invalid={errors.name ? "true" : "false"} />
          {errors.name && <FieldError>{errors.name.message}</FieldError>}
        </Field>
        <Field>
          <FieldLabel htmlFor="price">
            Harga <span className="text-destructive">*</span>
          </FieldLabel>
          <Input id="price" name="price" autoComplete="off" {...register("price")} aria-invalid={errors.price ? "true" : "false"} />
          {errors.price && <FieldError>{errors.price.message}</FieldError>}
        </Field>
        <Field>
          <FieldLabel htmlFor="category_id">
            Kategori <span className="text-destructive">*</span>
          </FieldLabel>

          <Controller
            name="category_id"
            control={control}
            render={({ field }) => (
              <DashboardSelectFilter
                items={categoryOptions}
                label="Kategori"
                id="category_id"
                name="category_id"
                placeholder="Pilih kategori"
                value={field.value || ""}
                onValueChange={(val) => field.onChange(val)}
                aria-invalid={errors.category_id ? "true" : "false"}
              />
            )}
          />
          {errors.category_id && <FieldError>{errors.category_id.message}</FieldError>}
        </Field>
        <Field orientation="horizontal">
          <FieldContent>
            <FieldLabel htmlFor="is_available">Status Ketersediaan</FieldLabel>
            <FieldDescription>Atur apakah menu ini tersedia untuk pelanggan.</FieldDescription>
            {errors.is_available && <FieldError>{errors.is_available.message}</FieldError>}
          </FieldContent>
          <Controller
            name="is_available"
            control={control}
            render={({ field }) => {
              return <Switch id="is_available" name="is_available" checked={field.value || false} onCheckedChange={field.onChange} aria-invalid={errors.is_available ? "true" : "false"} />;
            }}
          />
        </Field>
        <Field className="col-span-2">
          <FieldLabel htmlFor="description">Deskripsi</FieldLabel>
          <Textarea id="description" name="description" autoComplete="off" {...register("description")} aria-invalid={errors.description ? "true" : "false"} />
          {errors.description && <FieldError>{errors.description.message}</FieldError>}
        </Field>
      </FieldGroup>
    </FieldSet>
  );
});
export default MenuForm;
