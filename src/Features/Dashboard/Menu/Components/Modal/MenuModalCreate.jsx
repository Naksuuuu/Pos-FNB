import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { CreateMenuSchema } from "@/Features/Dashboard/Menu/Schema/MenuSchema";
import useCreateMenu from "@/Features/Dashboard/Menu/Hooks/useCreateMenu";

import DashModalForm from "@/Features/Dashboard/Shared/Component/Modal/DashModalForm";
import MenuForm from "@/Features/Dashboard/Menu/Components/Form/MenuForm";
import { PackagePlus } from "lucide-react";

const MenuModalCreate = ({ isOpen, onOpenModal }) => {
  const { create, loading, categoryOptions, customOptionOptions } = useCreateMenu();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(CreateMenuSchema),
    defaultValues: {
      name: "",
      price: "",
      hpp: "",
      category_id: "",
      is_available: false,
      description: "",
      customs: [],
    },
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
    <DashModalForm
      isOpen={isOpen}
      onOpenModal={onOpenModal}
      loading={loading}
      handleSubmit={handleSubmit}
      onSubmitForm={handleSubmitForm}
      title="Tambah Menu"
      icon={PackagePlus}
    >
      <MenuForm
        register={register}
        control={control}
        errors={errors}
        categoryOptions={categoryOptions}
        customOptionOptions={customOptionOptions}
        type="create"
      />
    </DashModalForm>
  );
};
export default MenuModalCreate;
