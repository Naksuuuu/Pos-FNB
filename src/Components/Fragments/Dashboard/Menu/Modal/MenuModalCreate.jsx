import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { CreateMenuSchema } from "@/Schema/Menu/MenuSchema";
import useCreateMenu from "@/Hooks/Dashboard/Menu/useCreateMenu";

import DashboardModalForm from "@/Components/Fragments/Dashboard/Common/Modal/DashboardModalForm";
import MenuForm from "@/Components/Fragments/Dashboard/Menu/Form/MenuForm";

const MenuModalCreate = ({ isOpen, onOpenModal }) => {
  const { create, loading, categoryOptions } = useCreateMenu();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(CreateMenuSchema),
  });

  const handleSubmitForm = async (data) => {
    try {
      const response = await create(data);
      onOpenModal(false);
      toast.success(response.message || "Menu berhasil dibuat");
    } catch (error) {
      if (error?.validationErrors) {
        Object.entries(error.validationErrors).forEach(([field, message]) => {
          setError(field, { type: "server", message });
        });
        return;
      }

      toast.error(error?.message || "Gagal membuat menu");
    }
  };

  return (
    <DashboardModalForm isOpen={isOpen} onOpenModal={onOpenModal} loading={loading} handleSubmit={handleSubmit} onSubmitForm={handleSubmitForm} title="Tambah Menu">
      <MenuForm register={register} control={control} errors={errors} categoryOptions={categoryOptions} type="create" />
    </DashboardModalForm>
  );
};
export default MenuModalCreate;
