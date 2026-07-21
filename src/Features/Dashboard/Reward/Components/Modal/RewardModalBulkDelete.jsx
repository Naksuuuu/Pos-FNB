import { toast } from "sonner";
import { Trash2 } from "lucide-react";

import useBulkDeleteReward from "@/Features/Dashboard/Reward/Hooks/useBulkDeleteReward";
import DashModalConfirmation from "@/Features/Dashboard/Shared/Component/Modal/DashModalConfirmation";

const RewardModalBulkDelete = ({ isOpen, onOpenModal, items, setIsChecked }) => {
  const { bulkDelete, loading } = useBulkDeleteReward();

  const handleBulkDelete = async (rewardIds) => {
    try {
      const result = await bulkDelete(rewardIds);

      if (result.success) {
        const message = result.data.count > 1 ? `${result.data.count} ${result.message}` : result.message;
        toast.success(message || "Berhasil menghapus reward");
        setIsChecked([]);
        onOpenModal(null);
      }
    } catch (error) {
      toast.error(error.message || "Gagal menghapus reward");
    }
  };

  return (
    <DashModalConfirmation
      isOpen={!!isOpen}
      title={`Hapus ${items.length} Reward?`}
      description={`Aksi ini tidak dapat dibatalkan, ${items.length} reward akan dihapus secara permanen.`}
      onOpenModal={onOpenModal}
      loading={loading}
      handleDelete={handleBulkDelete}
      id={items}
      icon={Trash2}
    />
  );
};

export default RewardModalBulkDelete;
