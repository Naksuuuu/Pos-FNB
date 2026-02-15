import { toast } from "sonner";

import useDeleteDiningTable from "@/Hooks/Dashboard/DiningTable/useDeleteDiningTable";

import DashboardModalConfirmation from "@/Components/Fragments/Dashboard/Common/Modal/DashboardModalConfirmation";

const DiningTableModalDelete = ({ selectedDiningTable, onOpenModal }) => {
  const { deleteDiningTableById, loading } = useDeleteDiningTable();

  const handleDelete = async (diningTableId) => {
    try {
      await deleteDiningTableById(diningTableId);
      onOpenModal(null);
      toast.success(`Meja ${selectedDiningTable?.code} berhasil dihapus`);
    } catch (error) {
      toast.error(error?.message || "Gagal menghapus meja makan");
    }
  };

  return (
    <DashboardModalConfirmation
      isOpen={!!selectedDiningTable}
      title={`Hapus ${selectedDiningTable?.code}?`}
      description="Aksi ini tidak dapat dibatalkan, meja makan akan dihapus secara permanen."
      onOpenModal={onOpenModal}
      loading={loading}
      handleDelete={handleDelete}
      id={selectedDiningTable?.id}
    />
  );
};

export default DiningTableModalDelete;
