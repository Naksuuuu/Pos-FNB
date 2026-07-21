import { toast } from "sonner";
import useDeleteReward from "@/Features/Dashboard/Reward/Hooks/useDeleteReward";
import DashModalConfirmation from "@/Features/Dashboard/Shared/Component/Modal/DashModalConfirmation";

const RewardModalDelete = ({ selectedReward, onOpenModal }) => {
  const { deleteRewardById, loading } = useDeleteReward();

  const handleDelete = async (rewardId) => {
    try {
      await deleteRewardById(rewardId);
      onOpenModal(null);
      toast.success(`Reward ${selectedReward?.name} berhasil dihapus`);
    } catch (error) {
      toast.error(error?.message || "Gagal menghapus reward");
    }
  };

  return (
    <DashModalConfirmation
      isOpen={!!selectedReward}
      title={`Hapus ${selectedReward?.name}?`}
      description="Aksi ini tidak dapat dibatalkan, reward akan dihapus secara permanen."
      onOpenModal={onOpenModal}
      loading={loading}
      handleDelete={handleDelete}
      id={selectedReward?.id}
    />
  );
};

export default RewardModalDelete;
