import useDeleteCategory from "@/Hooks/Dashboard/Category/useDeleteCategory";
import { toast } from "sonner";

import DashModalConfirmation from "@/Components/Fragments/Dashboard/Common/Modal/DashModalConfirmation";

const CategoryModalDelete = ({ selectedCategory, onOpenModal }) => {
  const { deleteCategoryById, loading } = useDeleteCategory();

  const handleDelete = async (categoryId) => {
    try {
      await deleteCategoryById(categoryId);
      onOpenModal(null);
      toast.success(`Category ${selectedCategory?.name} berhasil dihapus`);
    } catch (error) {
      toast.error(error?.message || "Gagal menghapus kategori");
    }
  };

  return (
    <DashModalConfirmation
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
