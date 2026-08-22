import { toast } from "sonner";

import useDeleteCustomOption from "@/Features/Dashboard/CustomOption/Hooks/useDeleteCustomOption";
import DashModalConfirmation from "@/Features/Dashboard/Shared/Component/Modal/DashModalConfirmation";

const CustomOptionModalDelete = ({ selectedCustomOption, onOpenModal }) => {
  const { remove, loading } = useDeleteCustomOption();

  const handleDelete = async (id) => {
    try {
      const response = await remove(id);
      onOpenModal(null);
      toast.success(response?.message || `Opsi kustom "${selectedCustomOption?.name}" berhasil dihapus`);
    } catch (error) {
      toast.error(error?.message || "Gagal menghapus opsi kustom");
    }
  };

  return (
    <DashModalConfirmation
      isOpen={!!selectedCustomOption}
      title={`Hapus ${selectedCustomOption?.name}?`}
      description="Aksi ini tidak dapat dibatalkan, opsi kustom akan dihapus secara permanen."
      onOpenModal={onOpenModal}
      loading={loading}
      handleDelete={handleDelete}
      id={selectedCustomOption?.id}
    />
  );
};

export default CustomOptionModalDelete;
