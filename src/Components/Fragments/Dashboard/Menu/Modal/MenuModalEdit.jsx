import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { EditMenuSchema } from "@/Schema/Menu/MenuSchema";
import useEditMenu from "@/Hooks/Dashboard/Menu/useEditMenu";

import DashboardModalForm from "@/Components/Fragments/Dashboard/Common/Modal/DashboardModalForm";
import MenuForm from "@/Components/Fragments/Dashboard/Menu/Form/MenuForm";
import { SquarePen } from "lucide-react";

const MenuModalEdit = ({ selectedMenu, onOpenModal }) => {
  const { edit, loading, categoryOptions } = useEditMenu();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(EditMenuSchema),
    defaultValues: {
      name: selectedMenu.name,
      price: String(selectedMenu.price),
      description: selectedMenu.description,
      category_id: String(selectedMenu.category_id),
      is_available: selectedMenu.is_available,
    },
  });

  const handleSubmitForm = async (data) => {
    try {
      const response = await edit(selectedMenu.id, data);
      onOpenModal(null);
      toast.success(response.message || "Menu berhasil diperbarui");
    } catch (error) {
      if (error?.validationErrors) {
        Object.entries(error.validationErrors).forEach(([field, message]) => {
          setError(field, { type: "server", message });
        });
        return;
      }

      toast.error(error?.message || "Gagal memperbarui menu");
    }
  };

  return (
    <DashboardModalForm isOpen={!!selectedMenu} onOpenModal={onOpenModal} loading={loading} handleSubmit={handleSubmit} onSubmitForm={handleSubmitForm} title="Edit Menu" icon={SquarePen}>
      <MenuForm register={register} control={control} errors={errors} categoryOptions={categoryOptions} type="edit" selectedMenu={selectedMenu} />
    </DashboardModalForm>
  );
};

export default MenuModalEdit;
