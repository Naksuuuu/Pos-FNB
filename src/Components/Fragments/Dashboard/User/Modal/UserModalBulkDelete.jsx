import { toast } from "sonner";
import { UserMinus } from "lucide-react";

import useBulkDeleteUser from "@/Hooks/Dashboard/User/useBulkDeleteUser";

import DashModalConfirmation from "@/Components/Fragments/Dashboard/Common/Modal/DashModalConfirmation";

const UserModalBulkDelete = ({ isOpen, onOpenModal, items, setIsChecked }) => {
  const { bulkDelete, loading } = useBulkDeleteUser();

  const handleBulkDelete = async (userIds) => {
    try {
      const result = await bulkDelete(userIds);

      if (result.success) {
        const message = result.data.count > 1 ? `${result.data.count} ${result.message}` : result.message;
        toast.success(message || "Berhasil menghapus user");
        setIsChecked([]);
        onOpenModal(null);
      }
    } catch (error) {
      toast.error(error.message || "Gagal menghapus user");
    }
  };
  return (
    <DashModalConfirmation
      isOpen={!!isOpen}
      title={`Hapus ${items.length} User?`}
      description={`Aksi ini tidak dapat dibatalkan, ${items.length} user akan dihapus secara permanen.`}
      onOpenModal={onOpenModal}
      loading={loading}
      handleDelete={handleBulkDelete}
      id={items}
      icon={UserMinus}
    />
  );
};

export default UserModalBulkDelete;
