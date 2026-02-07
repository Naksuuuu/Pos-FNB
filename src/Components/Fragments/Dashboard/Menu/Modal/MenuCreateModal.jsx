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
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/Components/Elements/Shadcn/Field/field";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateMenuSchema } from "@/Schema/Menu/MenuSchema";
import { Input } from "@/Components/Elements/Shadcn/Input/input";
import useCreateMenu from "@/Hooks/Menu/useCreateMenu";
import { Textarea } from "@/Components/Elements/Shadcn/Input/textarea";

const MenuCreateModal = memo(({ isOpen, onOpenModal }) => {
  const { createMenu } = useCreateMenu();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CreateMenuSchema),
  });

  const onSubmit = async (data) => {
    try {
      console.log("before create menu");
      await createMenu(data);
      console.log("after create menu");
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
    <Dialog open={isOpen} onOpenChange={() => onOpenModal(false)}>
      <DialogContent showCloseButton={false}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldSet>
            <DialogHeader>
              <DialogTitle>Add Menu</DialogTitle>
              <DialogDescription>Create New Menu</DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="image">Menu Image</FieldLabel>
                <Input
                  type="file"
                  id="image"
                  autoComplete="off"
                  {...register("image")}
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

              <DialogFooter className="justify-end">
                <DialogClose asChild>
                  <Button variant="outline" className="cursor-pointer">
                    Cancel
                  </Button>
                </DialogClose>
                <Field>
                  <Button type="submit" className="cursor-pointer bg-primaryhover:bg-emerald-600">
                    Add
                  </Button>
                </Field>
              </DialogFooter>
            </FieldGroup>
          </FieldSet>
        </form>
      </DialogContent>
    </Dialog>
  );
});
export default MenuCreateModal;
