import { toast } from "sonner";
import { Trash2 } from "lucide-react";

import useBulkDeleteCategory from "@/Features/Dashboard/Category/Hooks/useBulkDeleteCategory";

import DashModalConfirmation from "@/Features/Dashboard/Shared/Component/Modal/DashModalConfirmation";

const CategoryModalBulkDelete = ({ isOpen, onOpenModal, items, setIsChecked }) => {
  const { bulkDelete, loading } = useBulkDeleteCategory();

  const handleBulkDelete = async (categoryIds) => {
    try {
      const result = await bulkDelete(categoryIds);

      if (result.success) {
        const message = result.data.count > 1 ? `${result.data.count} ${result.message}` : result.message;
        toast.success(message || "Berhasil menghapus kategori");
        setIsChecked([]);
        onOpenModal(null);
      }
    } catch (error) {
      toast.error(error.message || "Gagal menghapus kategori");
    }
  };

  return (
    <DashModalConfirmation
      isOpen={!!isOpen}
      title={`Hapus ${items.length} Kategori?`}
      description={`Aksi ini tidak dapat dibatalkan, ${items.length} kategori akan dihapus secara permanen.`}
      onOpenModal={onOpenModal}
      loading={loading}
      handleDelete={handleBulkDelete}
      id={items}
      icon={Trash2}
    />
  );
};

export default CategoryModalBulkDelete;


