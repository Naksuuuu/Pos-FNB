import { toast } from "sonner";

import DashboardModalConfirmation from "@/Components/Fragments/Dashboard/Common/Modal/DashboardModalConfirmation";
import useDeleteDiningTable from "@/Hooks/DiningTable/useDeleteDiningTable";

const DiningTableModalDelete = ({ selectedDiningTable, onOpenModal }) => {
  const { deleteDiningTableById, loading } = useDeleteDiningTable();

  const handleDelete = async (diningTableId) => {
    try {
      const response = await deleteDiningTableById(diningTableId);
      onOpenModal(null);
      toast.success(response?.message || "Meja makan berhasil dihapus");
    } catch (error) {
      toast.error(error?.message || "Gagal menghapus meja makan");
    }
  };

  return (
    <DashboardModalConfirmation
      isOpen={!!selectedDiningTable}
      title={`Hapus ${selectedDiningTable?.name}?`}
      description="Aksi ini tidak dapat dibatalkan, meja makan akan dihapus secara permanen."
      onOpenModal={onOpenModal}
      loading={loading}
      handleDelete={handleDelete}
      id={selectedDiningTable?.id}
    />
  );
};

export default DiningTableModalDelete;
