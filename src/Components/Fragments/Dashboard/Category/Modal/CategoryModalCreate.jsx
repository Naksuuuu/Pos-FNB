import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import useCreateCategory from "@/Hooks/Dashboard/Category/useCreateCategory";

import { CreateCategorySchema } from "@/Schema/Category/CategorySchema";
import DashboardModalForm from "@/Components/Fragments/Dashboard/Common/Modal/DashboardModalForm";
import CategoryForm from "@/Components/Fragments/Dashboard/Category/Form/CategoryForm";

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
    <DashboardModalForm isOpen={isOpen} onOpenModal={onOpenModal} loading={loading} handleSubmit={handleSubmit} onSubmitForm={handleSubmitForm} title="Tambah Kategori">
      <CategoryForm register={register} errors={errors} />
    </DashboardModalForm>
  );
};
export default CategoryModalCreate;
