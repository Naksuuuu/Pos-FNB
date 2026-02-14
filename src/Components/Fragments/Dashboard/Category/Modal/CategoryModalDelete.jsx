import useDeleteCategory from "@/Hooks/Category/useDeleteCategory";
import { toast } from "sonner";

import DashboardModalConfirmation from "@/Components/Fragments/Dashboard/Common/Modal/DashboardModalConfirmation";

const CategoryModalDelete = ({ selectedCategory, onOpenModal }) => {
  const { deleteCategoryById, loading } = useDeleteCategory();

  const handleDelete = async (categoryId) => {
    try {
      await deleteCategoryById(categoryId);
      onOpenModal(null);
      toast.success(`Category ${selectedCategory?.name} berhasil dihapus`);
    } catch (error) {
      toast.error(error?.message || "Failed to delete category");
    }
  };

  return (
    <DashboardModalConfirmation
      isOpen={!!selectedCategory}
      title={`Hapus ${selectedCategory?.name}?`}
      description="Aksi ini tidak dapat dibatalkan, kategori akan dihapus secara permanen."
      onOpenModal={onOpenModal}
      loading={loading}
      handleDelete={handleDelete}
      id={selectedCategory?.id}
    />
  );
};

export default CategoryModalDelete;
