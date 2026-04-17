import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import useCreateCategory from "@/Features/Dashboard/Category/Hooks/useCreateCategory";

import { CreateCategorySchema } from "@/Features/Dashboard/Category/Schema/CategorySchema";
import DashModalForm from "@/Features/Dashboard/Shared/Component/Modal/DashModalForm";
import CategoryForm from "@/Features/Dashboard/Category/Components/Form/CategoryForm";

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
    <DashModalForm isOpen={isOpen} onOpenModal={onOpenModal} loading={loading} handleSubmit={handleSubmit} onSubmitForm={handleSubmitForm} title="Tambah Kategori">
      <CategoryForm register={register} errors={errors} />
    </DashModalForm>
  );
};
export default CategoryModalCreate;


