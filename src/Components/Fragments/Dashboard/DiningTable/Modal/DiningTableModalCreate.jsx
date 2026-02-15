import { memo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import useCreateDiningTable from "@/Hooks/DiningTable/useCreateDiningTable";
import { CreateDiningTableSchema } from "@/Schema/DiningTable/DiningTableSchema";

import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/Components/Elements/Shadcn/field";
import { Input } from "@/Components/Elements/Shadcn/input";
import DashboardModalForm from "@/Components/Fragments/Dashboard/Common/Modal/DashboardModalForm";

const DiningTableModalCreate = memo(({ isOpen, onOpenModal }) => {
  const { create, loading } = useCreateDiningTable();
  const {
    handleSubmit,
    setError,
    formState: { errors },
    register,
  } = useForm({
    resolver: zodResolver(CreateDiningTableSchema),
  });

  const handleSubmitForm = async (data) => {
    try {
      const response = await create(data);
      onOpenModal(false);
      toast.success(response.message);
    } catch (error) {
      if (error?.validationErrors) {
        Object.entries(error.validationErrors).forEach(([field, message]) => {
          setError(field, { type: "server", message });
        });
        return;
      }

      toast.error(error?.message || "Failed to create dining table");
    }
  };

  return (
    <DashboardModalForm isOpen={isOpen} onOpenModal={onOpenModal} loading={loading} handleSubmit={handleSubmit} onSubmitForm={handleSubmitForm}>
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="code">Code Meja</FieldLabel>
            <Input id="code" name="code" autoComplete="off" {...register("code")} aria-invalid={errors.code ? "true" : "false"} />
            {errors.code && <FieldError>{errors.code.message}</FieldError>}
          </Field>
        </FieldGroup>
      </FieldSet>
    </DashboardModalForm>
  );
});
export default DiningTableModalCreate;
