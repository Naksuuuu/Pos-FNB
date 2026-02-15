import { memo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import useCreateCategory from "@/Hooks/Category/useCreateCategory";

import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/Components/Elements/Shadcn/field";
import { Input } from "@/Components/Elements/Shadcn/input";
import { CreateCategorySchema } from "@/Schema/Category/CategorySchema";
import DashboardModalForm from "@/Components/Fragments/Dashboard/Common/Modal/DashboardModalForm";

const CategoryModalCreate = ({ isOpen, onOpenModal }) => {
  const { create, loading } = useCreateCategory();
  const {
    handleSubmit,
    setError,
    formState: { errors },
    register,
  } = useForm({
    resolver: zodResolver(CreateCategorySchema),
  });

  const handleSubmitForm = async (data) => {
    try {
      const response = await create(data);
      onOpenModal(false);
      toast.success(response.message || "Kategori berhasil dibuat");
    } catch (error) {
      if (error?.validationErrors) {
        Object.entries(error.validationErrors).forEach(([field, message]) => {
          setError(field, { type: "server", message });
        });
        return;
      }

      toast.error(error?.message || "Gagal membuat kategori");
    }
  };

  return (
    <DashboardModalForm isOpen={isOpen} onOpenModal={onOpenModal} loading={loading} handleSubmit={handleSubmit} onSubmitForm={handleSubmitForm} title="Tambah Kategori">
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Nama Kategori</FieldLabel>
            <Input id="name" name="name" autoComplete="off" {...register("name")} aria-invalid={errors.name ? "true" : "false"} />
            {errors.name && <FieldError>{errors.name.message}</FieldError>}
          </Field>
        </FieldGroup>
      </FieldSet>
    </DashboardModalForm>
  );
};
export default CategoryModalCreate;
