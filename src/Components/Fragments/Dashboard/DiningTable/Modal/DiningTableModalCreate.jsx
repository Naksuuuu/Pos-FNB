import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import useCreateDiningTable from "@/Hooks/Dashboard/DiningTable/useCreateDiningTable";
import { CreateDiningTableSchema } from "@/Schema/DiningTable/DiningTableSchema";

import DashboardModalForm from "@/Components/Fragments/Dashboard/Common/Modal/DashboardModalForm";
import DiningTableForm from "@/Components/Fragments/Dashboard/DiningTable/Form/DiningTableForm";

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
    <DashboardModalForm isOpen={isOpen} onOpenModal={onOpenModal} loading={loading} handleSubmit={handleSubmit} onSubmitForm={handleSubmitForm} title="Tambah Meja Makan">
      <DiningTableForm register={register} errors={errors} control={control} />
    </DashboardModalForm>
  );
};
export default DiningTableModalCreate;
