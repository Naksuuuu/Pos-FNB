import { toast } from "sonner";
import { Trash2 } from "lucide-react";

import useBulkDeleteDiningTable from "@/Features/Dashboard/DiningTable/Hooks/useBulkDeleteDiningTable";

import DashModalConfirmation from "@/Features/Dashboard/Shared/Component/Modal/DashModalConfirmation";

const DiningTableModalBulkDelete = ({ isOpen, onOpenModal, items, setIsChecked }) => {
  const { bulkDelete, loading } = useBulkDeleteDiningTable();

  const handleBulkDelete = async (tableIds) => {
    try {
      const result = await bulkDelete(tableIds);

      if (result.success) {
        const message = result.data.count > 1 ? `${result.data.count} ${result.message}` : result.message;
        toast.success(message || "Berhasil menghapus meja");
        setIsChecked([]);
        onOpenModal(null);
      }
    } catch (error) {
      toast.error(error.message || "Gagal menghapus meja");
    }
  };

  return (
    <DashModalConfirmation
      isOpen={!!isOpen}
      title={`Hapus ${items.length} Meja?`}
      description={`Aksi ini tidak dapat dibatalkan, ${items.length} meja akan dihapus secara permanen.`}
      onOpenModal={onOpenModal}
      loading={loading}
      handleDelete={handleBulkDelete}
      id={items}
      icon={Trash2}
    />
  );
};

export default DiningTableModalBulkDelete;

