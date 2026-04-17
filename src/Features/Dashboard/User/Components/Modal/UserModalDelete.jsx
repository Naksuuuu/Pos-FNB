import { toast } from "sonner";
import { UserMinus } from "lucide-react";

import useDeleteUser from "@/Features/Dashboard/User/Hooks/useDeleteUser";
import DashModalConfirmation from "@/Features/Dashboard/Shared/Component/Modal/DashModalConfirmation";

const UserModalDelete = ({ selectedUser, onOpenModal }) => {
  const { deleteUserById, loading } = useDeleteUser();

  const handleDelete = async (userId) => {
    try {
      await deleteUserById(userId);
      onOpenModal(null);
      toast.success(`User ${selectedUser?.name} berhasil dihapus`);
    } catch (error) {
      toast.error(error?.message || "Gagal menghapus user");
    }
  };

  return (
    <DashModalConfirmation
      isOpen={!!selectedUser}
      title={`Hapus ${selectedUser?.name}?`}
      description="Aksi ini tidak dapat dibatalkan, user akan dihapus secara permanen."
      onOpenModal={onOpenModal}
      loading={loading}
      handleDelete={handleDelete}
      id={selectedUser?.id}
      icon={UserMinus}
    />
  );
};

export default UserModalDelete;

