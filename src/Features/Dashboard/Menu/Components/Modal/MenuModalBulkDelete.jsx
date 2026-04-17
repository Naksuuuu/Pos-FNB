import { toast } from "sonner";
import { UserMinus } from "lucide-react";

import useBulkDeleteMenu from "@/Features/Dashboard/Menu/Hooks/useBulkDeleteMenu";

import DashModalConfirmation from "@/Features/Dashboard/Shared/Component/Modal/DashModalConfirmation";

const MenuModalBulkDelete = ({ isOpen, onOpenModal, items, setIsChecked }) => {
  const { bulkDelete, loading } = useBulkDeleteMenu();

  const handleBulkDelete = async (menuIds) => {
    try {
      const result = await bulkDelete(menuIds);

      if (result.success) {
        const message = result.data.count > 1 ? `${result.data.count} ${result.message}` : result.message;
        toast.success(message || "Berhasil menghapus menu");
        setIsChecked([]);
        onOpenModal(null);
      }
    } catch (error) {
      toast.error(error.message || "Gagal menghapus menu");
    }
  };
  return (
    <DashModalConfirmation
      isOpen={!!isOpen}
      title={`Hapus ${items.length} Menu?`}
      description={`Aksi ini tidak dapat dibatalkan, ${items.length} menu akan dihapus secara permanen.`}
      onOpenModal={onOpenModal}
      loading={loading}
      handleDelete={handleBulkDelete}
      id={items}
      icon={UserMinus}
    />
  );
};

export default MenuModalBulkDelete;

