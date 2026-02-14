import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload } from "lucide-react";
import { toast } from "sonner";

import { EditMenuSchema } from "@/Schema/Menu/MenuSchema";

import useEditMenu from "@/Hooks/Menu/useEditMenu";

import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/Components/Elements/Shadcn/field";
import { Input } from "@/Components/Elements/Shadcn/input";
import { Textarea } from "@/Components/Elements/Shadcn/textarea";
import DashboardModalForm from "@/Components/Fragments/Dashboard/Common/Modal/DashboardModalForm";
import DashboardSelectFilter from "@/Components/Fragments/Dashboard/Common/DashboardSelectFilter";

const MenuModalEdit = ({ selectedProduct, onOpenModal }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const { edit, loading, categoryOptions } = useEditMenu();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(EditMenuSchema),
    defaultValues: {
      name: selectedProduct.name,
      price: String(selectedProduct.price),
      stock: String(selectedProduct.stock),
      description: selectedProduct.description,
      category_id: String(selectedProduct.category_id),
    },
  });

  const handleSubmitForm = async (data) => {
    try {
      const response = await edit(selectedProduct.id, data);
      onOpenModal(null);
      toast.success(response.message || "Menu updated successfully");
    } catch (error) {
      if (error?.validationErrors) {
        Object.entries(error.validationErrors).forEach(([field, message]) => {
          setError(field, { type: "server", message });
        });
        return;
      }

      toast.error(error?.message || "Failed to update menu");
    }
  };

  const onFileChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImagePreview(url);
  }, []);

  return (
    <DashboardModalForm isOpen={!!selectedProduct} onOpenModal={onOpenModal} loading={loading} handleSubmit={handleSubmit} onSubmitForm={handleSubmitForm}>
      <FieldSet>
        <FieldGroup>
          <div className="w-full ">
            <img src={selectedProduct.image_url} alt={selectedProduct.name} className="object-cover w-full mx-auto rounded-md aspect-video" />
          </div>
          <Field>
            <FieldLabel htmlFor="image">Foto Baru</FieldLabel>
            {imagePreview && (
              <div className="w-full ">
                <img src={imagePreview} alt={selectedProduct.name} className="object-cover w-full mx-auto rounded-md aspect-video" />
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
          <Field>
            <FieldLabel htmlFor="name">Nama Menu</FieldLabel>
            <Input id="name" name="name" autoComplete="off" {...register("name")} aria-invalid={errors.name ? "true" : "false"} />
            {errors.name && <FieldError>{errors.name.message}</FieldError>}
          </Field>
          <Field>
            <FieldLabel htmlFor="price">Harga</FieldLabel>
            <Input id="price" name="price" autoComplete="off" {...register("price")} aria-invalid={errors.price ? "true" : "false"} />
            {errors.price && <FieldError>{errors.price.message}</FieldError>}
          </Field>
          <Field>
            <FieldLabel htmlFor="stock">Stok</FieldLabel>
            <Input id="stock" name="stock" autoComplete="off" {...register("stock")} aria-invalid={errors.stock ? "true" : "false"} />
            {errors.stock && <FieldError>{errors.stock.message}</FieldError>}
          </Field>
          <Field>
            <FieldLabel htmlFor="category_id">ID Kategori</FieldLabel>
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
          <Field>
            <FieldLabel htmlFor="description">Deskripsi</FieldLabel>
            <Textarea id="description" name="description" autoComplete="off" {...register("description")} aria-invalid={errors.description ? "true" : "false"} />
            {errors.description && <FieldError>{errors.description.message}</FieldError>}
          </Field>
        </FieldGroup>
      </FieldSet>
    </DashboardModalForm>
  );
};
export default MenuModalEdit;
