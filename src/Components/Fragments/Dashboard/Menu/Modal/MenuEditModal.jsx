import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload } from "lucide-react";
import { toast } from "sonner";

import { EditMenuSchema } from "@/Schema/Menu/MenuSchema";

import useEditMenu from "@/Hooks/Menu/useEditMenu";

import { Button } from "@/Components/Elements/Shadcn/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/Components/Elements/Shadcn/dialog";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/Components/Elements/Shadcn/field";
import { Input } from "@/Components/Elements/Shadcn/input";
import { Textarea } from "@/Components/Elements/Shadcn/textarea";
import { Spinner } from "@/Components/Elements/Shadcn/spinner";

const MenuEditModal = ({ selectedProduct, onOpenModal }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const { edit, loading } = useEditMenu();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
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

  const onSubmit = async (data) => {
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
    <Dialog open={selectedProduct !== null} onOpenChange={() => onOpenModal(null)}>
      <DialogContent showCloseButton={false}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Ubah Menu</DialogTitle>
            <DialogDescription>Ubah Menu yang sudah ada</DialogDescription>
          </DialogHeader>

          <div className="no-scrollbar max-h-[50vh] overflow-y-auto">
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
                  <Input id="name" autoComplete="off" {...register("name")} aria-invalid={errors.name ? "true" : "false"} />
                  {errors.name && <FieldError>{errors.name.message}</FieldError>}
                </Field>
                <Field>
                  <FieldLabel htmlFor="price">Harga</FieldLabel>
                  <Input id="price" autoComplete="off" {...register("price")} aria-invalid={errors.price ? "true" : "false"} />
                  {errors.price && <FieldError>{errors.price.message}</FieldError>}
                </Field>
                <Field>
                  <FieldLabel htmlFor="stock">Stok</FieldLabel>
                  <Input id="stock" autoComplete="off" {...register("stock")} aria-invalid={errors.stock ? "true" : "false"} />
                  {errors.stock && <FieldError>{errors.stock.message}</FieldError>}
                </Field>
                <Field>
                  <FieldLabel htmlFor="category_id">ID Kategori</FieldLabel>
                  <Input id="category_id" autoComplete="off" {...register("category_id")} aria-invalid={errors.category_id ? "true" : "false"} />
                  {errors.category_id && <FieldError>{errors.category_id.message}</FieldError>}
                </Field>
                <Field>
                  <FieldLabel htmlFor="description">Deskripsi</FieldLabel>
                  <Textarea id="description" autoComplete="off" {...register("description")} aria-invalid={errors.description ? "true" : "false"} />
                  {errors.description && <FieldError>{errors.description.message}</FieldError>}
                </Field>
              </FieldGroup>
            </FieldSet>
          </div>
          <DialogFooter>
            <DialogClose render={(props) => <Button {...props} variant="outline" className="cursor-pointer" />}>Batal</DialogClose>
            <Button type="submit" disabled={loading} className="relative cursor-pointer bg-emerald-500 hover:bg-emerald-600">
              <span className={loading ? "invisible" : "visible"}>Ubah</span>

              {loading && (
                <div className="absolute ">
                  <Spinner />
                </div>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default MenuEditModal;
