import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import useCreateDiningTable from "@/Features/Dashboard/DiningTable/Hooks/useCreateDiningTable";
import { CreateDiningTableSchema } from "@/Features/Dashboard/DiningTable/Schema/DiningTableSchema";

import DashModalForm from "@/Features/Dashboard/Shared/Component/Modal/DashModalForm";
import DiningTableForm from "@/Features/Dashboard/DiningTable/Components/Form/DiningTableForm";

const DiningTableModalCreate = ({ isOpen, onOpenModal }) => {
  const { create, loading } = useCreateDiningTable();
  const {
    handleSubmit,
    setError,
    formState: { errors },
    register,
    control,
  } = useForm({
    resolver: zodResolver(CreateDiningTableSchema),
  });

  const handleSubmitForm = async (data) => {
    try {
      const response = await create(data);
      onOpenModal(false);
      toast.success(response.message || "Meja berhasil dibuat");
    } catch (error) {
      if (error?.validationErrors) {
        Object.entries(error.validationErrors).forEach(([field, message]) => {
          setError(field, { type: "server", message });
        });
        return;
      }

      toast.error(error?.message || "Gagal membuat meja makan");
    }
  };

  return (
    <DashModalForm isOpen={isOpen} onOpenModal={onOpenModal} loading={loading} handleSubmit={handleSubmit} onSubmitForm={handleSubmitForm} title="Tambah Meja Makan">
      <DiningTableForm register={register} errors={errors} control={control} />
    </DashModalForm>
  );
};
export default DiningTableModalCreate;

