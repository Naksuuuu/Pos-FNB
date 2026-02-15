import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import useEditDiningTable from "@/Hooks/Dashboard/DiningTable/useEditDiningTable";
import { editDiningTableSchema } from "@/Schema/DiningTable/DiningTableSchema";

import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/Components/Elements/Shadcn/field";
import DashboardModalForm from "@/Components/Fragments/Dashboard/Common/Modal/DashboardModalForm";
import DashboardSelectFilter from "@/Components/Fragments/Dashboard/Common/DashboardSelectFilter";

const DiningTableModalEdit = ({ selectedDiningTable, onOpenModal }) => {
  const { edit, loading, statusOptions } = useEditDiningTable();
  const {
    handleSubmit,
    setError,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(editDiningTableSchema),
    defaultValues: {
      status: selectedDiningTable.status,
    },
  });

  const handleSubmitForm = async (data) => {
    try {
      const response = await edit(selectedDiningTable.id, data);
      onOpenModal(false);
      toast.success(response.message || "Meja berhasil diperbarui");
    } catch (error) {
      if (error?.validationErrors) {
        Object.entries(error.validationErrors).forEach(([field, message]) => {
          setError(field, { type: "server", message });
        });
        return;
      }

      toast.error(error?.message || "Gagal memperbarui meja makan");
    }
  };

  return (
    <DashboardModalForm
      isOpen={!!selectedDiningTable}
      onOpenModal={onOpenModal}
      loading={loading}
      handleSubmit={handleSubmit}
      onSubmitForm={handleSubmitForm}
      title={`Edit Meja ${selectedDiningTable?.code}`}
    >
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="status">Status</FieldLabel>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <DashboardSelectFilter
                  items={statusOptions}
                  label="Status"
                  id="status"
                  name="status"
                  placeholder="Pilih status"
                  value={field.value || ""}
                  onValueChange={(val) => field.onChange(val)}
                  aria-invalid={errors.status ? "true" : "false"}
                />
              )}
            />
            {errors.status && <FieldError>{errors.status.message}</FieldError>}
          </Field>
        </FieldGroup>
      </FieldSet>
    </DashboardModalForm>
  );
};
export default DiningTableModalEdit;
