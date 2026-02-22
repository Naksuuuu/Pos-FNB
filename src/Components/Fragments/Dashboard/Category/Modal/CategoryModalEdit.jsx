import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { EditCategorySchema } from "@/Schema/Category/CategorySchema";
import useEditCategory from "@/Hooks/Dashboard/Category/useEditCategory";

import DashModalForm from "@/Components/Fragments/Dashboard/Common/Modal/DashModalForm";
import CategoryForm from "@/Components/Fragments/Dashboard/Category/Form/CategoryForm";

const CategoryModalEdit = ({ selectedCategory, onOpenModal }) => {
  const { edit, loading } = useEditCategory();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(EditCategorySchema),
    defaultValues: {
      name: selectedCategory.name,
    },
  });

  const handleSubmitForm = async (data) => {
    try {
      const response = await edit(selectedCategory.id, data);
      onOpenModal(null);
      toast.success(response.message || "Kategori berhasil diperbarui");
    } catch (error) {
      if (error?.validationErrors) {
        Object.entries(error.validationErrors).forEach(([field, message]) => {
          setError(field, { type: "server", message });
        });
        return;
      }

      toast.error(error?.message || "Gagal memperbarui kategori");
    }
  };

  return (
    <DashModalForm
      isOpen={!!selectedCategory}
      onOpenModal={onOpenModal}
      loading={loading}
      handleSubmit={handleSubmit}
      onSubmitForm={handleSubmitForm}
      title={`Edit Kategori ${selectedCategory?.name}`}
    >
      <CategoryForm register={register} errors={errors} />
    </DashModalForm>
  );
};
export default CategoryModalEdit;
