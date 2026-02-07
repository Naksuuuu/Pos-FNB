import { Button } from "@/Components/Elements/Shadcn/Button/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/Elements/Shadcn/Dialog/dialog";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/Components/Elements/Shadcn/Field/field";
import { Input } from "@/Components/Elements/Shadcn/Input/input";
import { Textarea } from "@/Components/Elements/Shadcn/Input/textarea";
import useEditMenu from "@/Hooks/Menu/useEditMenu";
import { EditMenuSchema } from "@/Schema/Menu/MenuSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const MenuEditModal = ({ selectedProduct, onOpenModal }) => {
  const { edit } = useEditMenu();

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
      await edit(selectedProduct.id, data);
      onOpenModal(false);
    } catch (error) {
      if (error?.validationErrors) {
        Object.entries(error.validationErrors).forEach(([field, message]) => {
          setError(field, { type: "server", message });
        });
      }
    }
  };

  return (
    <Dialog open={selectedProduct !== null} onOpenChange={() => onOpenModal(null)}>
      <DialogContent showCloseButton={false}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldSet>
            <DialogHeader>
              <DialogTitle>Edit Menu</DialogTitle>
              <DialogDescription>Create New Menu</DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="image">Menu Image</FieldLabel>
                <Input
                  type="file"
                  id="image"
                  autoComplete="off"
                  {...register("image", {
                    setValueAs: (files) => (files && files.length > 0 ? files : undefined),
                  })}
                  aria-invalid={errors.image ? "true" : "false"}
                />
                {errors.image && <FieldError>{errors.image.message}</FieldError>}
              </Field>
              <Field>
                <FieldLabel htmlFor="name">Menu Name</FieldLabel>
                <Input
                  id="name"
                  autoComplete="off"
                  {...register("name")}
                  aria-invalid={errors.name ? "true" : "false"}
                />
                {errors.name && <FieldError>{errors.name.message}</FieldError>}
              </Field>
              <Field>
                <FieldLabel htmlFor="price">Price</FieldLabel>
                <Input
                  id="price"
                  autoComplete="off"
                  {...register("price")}
                  aria-invalid={errors.price ? "true" : "false"}
                />
                {errors.price && <FieldError>{errors.price.message}</FieldError>}
              </Field>
              <Field>
                <FieldLabel htmlFor="stock">Stock</FieldLabel>
                <Input
                  id="stock"
                  autoComplete="off"
                  {...register("stock")}
                  aria-invalid={errors.stock ? "true" : "false"}
                />
                {errors.stock && <FieldError>{errors.stock.message}</FieldError>}
              </Field>
              <Field>
                <FieldLabel htmlFor="category_id">Category ID</FieldLabel>
                <Input
                  id="category_id"
                  autoComplete="off"
                  {...register("category_id")}
                  aria-invalid={errors.category_id ? "true" : "false"}
                />
                {errors.category_id && <FieldError>{errors.category_id.message}</FieldError>}
              </Field>
              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Textarea
                  id="description"
                  autoComplete="off"
                  {...register("description")}
                  aria-invalid={errors.description ? "true" : "false"}
                />
                {errors.description && <FieldError>{errors.description.message}</FieldError>}
              </Field>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" className="cursor-pointer">
                    Cancel
                  </Button>
                </DialogClose>
                <Field orientation="horizontal" className="justify-end">
                  <Button type="submit" className="cursor-pointer bg-emerald-500 hover:bg-emerald-600">
                    Edit
                  </Button>
                </Field>
              </DialogFooter>
            </FieldGroup>
          </FieldSet>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default MenuEditModal;
