import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { EditMenuSchema } from "@/Features/Dashboard/Menu/Schema/MenuSchema";
import useEditMenu from "@/Features/Dashboard/Menu/Hooks/useEditMenu";

import DashModalForm from "@/Features/Dashboard/Shared/Component/Modal/DashModalForm";
import MenuForm from "@/Features/Dashboard/Menu/Components/Form/MenuForm";
import { PackageSearch } from "lucide-react";

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
      hpp: String(selectedMenu.hpp),
      description: selectedMenu.description,
      category_id: String(selectedMenu.category_id),
      is_available: selectedMenu.is_available,
      customs: selectedMenu?.custom_options ? selectedMenu.custom_options.map((opt) => opt.id) : [],
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
    <DashModalForm
      isOpen={!!selectedMenu}
      onOpenModal={onOpenModal}
      loading={loading}
      handleSubmit={handleSubmit}
      onSubmitForm={handleSubmitForm}
      title="Edit Menu"
      icon={PackageSearch}
    >
      <MenuForm
        register={register}
        control={control}
        errors={errors}
        categoryOptions={categoryOptions}
        type="edit"
        selectedMenu={selectedMenu}
      />
    </DashModalForm>
  );
};

export default MenuModalEdit;
