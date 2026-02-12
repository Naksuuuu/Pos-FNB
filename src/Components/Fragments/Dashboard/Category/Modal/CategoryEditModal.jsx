import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { EditCategorySchema } from "@/Schema/Category/CategorySchema";
import useEditCategory from "@/Hooks/Category/useEditCategory";

import { Button } from "@/Components/Elements/Shadcn/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/Components/Elements/Shadcn/dialog";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/Components/Elements/Shadcn/field";
import { Input } from "@/Components/Elements/Shadcn/input";
import { Spinner } from "@/Components/Elements/Shadcn/spinner";

const CategoryEditModal = ({ selectedCategory, onOpenModal }) => {
  const { edit, loading } = useEditCategory();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(EditCategorySchema),
    defaultValues: {
      name: selectedCategory.name,
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await edit(selectedCategory.id, data);
      onOpenModal(null);
      toast.success(response.message || "Kategori updated successfully");
    } catch (error) {
      if (error?.validationErrors) {
        Object.entries(error.validationErrors).forEach(([field, message]) => {
          setError(field, { type: "server", message });
        });
        return;
      }

      toast.error(error?.message || "Failed to update kategori");
    }
  };

  return (
    <Dialog open={selectedCategory !== null} onOpenChange={() => onOpenModal(null)}>
      <DialogContent showCloseButton={false}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Ubah Kategori</DialogTitle>
            <DialogDescription>Ubah Kategori yang sudah ada</DialogDescription>
          </DialogHeader>

          <div className="no-scrollbar max-h-[50vh] overflow-y-auto">
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name">Nama Kategori</FieldLabel>
                  <Input id="name" autoComplete="off" {...register("name")} aria-invalid={errors.name ? "true" : "false"} />
                  {errors.name && <FieldError>{errors.name.message}</FieldError>}
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
export default CategoryEditModal;
