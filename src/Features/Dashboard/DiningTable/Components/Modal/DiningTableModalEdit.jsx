import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import useEditDiningTable from "@/Features/Dashboard/DiningTable/Hooks/useEditDiningTable";
import { editDiningTableSchema } from "@/Features/Dashboard/DiningTable/Schema/DiningTableSchema";

import DashModalForm from "@/Features/Dashboard/Shared/Component/Modal/DashModalForm";
import DiningTableForm from "@/Features/Dashboard/DiningTable/Components/Form/DiningTableForm";

const DiningTableModalEdit = ({ selectedDiningTable, onOpenModal }) => {
  const { edit, loading } = useEditDiningTable();
  const {
    handleSubmit,
    setError,
    register,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(editDiningTableSchema),
    defaultValues: {
      code: selectedDiningTable.code,
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
    <DashModalForm
      isOpen={!!selectedDiningTable}
      onOpenModal={onOpenModal}
      loading={loading}
      handleSubmit={handleSubmit}
      onSubmitForm={handleSubmitForm}
      title={`Edit Meja ${selectedDiningTable?.code}`}
    >
      <DiningTableForm register={register} errors={errors} control={control} />
    </DashModalForm>
  );
};
export default DiningTableModalEdit;

