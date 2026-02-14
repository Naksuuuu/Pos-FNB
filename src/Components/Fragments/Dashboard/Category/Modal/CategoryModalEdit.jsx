import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { EditCategorySchema } from "@/Schema/Category/CategorySchema";
import useEditCategory from "@/Hooks/Category/useEditCategory";

import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/Components/Elements/Shadcn/field";
import { Input } from "@/Components/Elements/Shadcn/input";
import DashboardModalForm from "@/Components/Fragments/Dashboard/Common/Modal/DashboardModalForm";

const CategoryModalEdit = ({ selectedCategory, onOpenModal }) => {
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

  const handleSubmitForm = async (data) => {
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
    <DashboardModalForm isOpen={!!selectedCategory} onOpenModal={onOpenModal} loading={loading} handleSubmit={handleSubmit} onSubmitForm={handleSubmitForm}>
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Nama Kategori</FieldLabel>
            <Input id="name" autoComplete="off" {...register("name")} aria-invalid={errors.name ? "true" : "false"} />
            {errors.name && <FieldError>{errors.name.message}</FieldError>}
          </Field>
        </FieldGroup>
      </FieldSet>
    </DashboardModalForm>
  );
};
export default CategoryModalEdit;
