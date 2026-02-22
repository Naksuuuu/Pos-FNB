import { toast } from "sonner";
import { PackageMinus } from "lucide-react";

import useDeleteMenu from "@/Hooks/Dashboard/Menu/useDeleteMenu";

import DashboardModalConfirmation from "@/Components/Fragments/Dashboard/Common/Modal/DashboardModalConfirmation";

const MenuModalDelete = ({ selectedMenu, onOpenModal }) => {
  const { deleteMenuById, loading } = useDeleteMenu();

  const handleDelete = async (menuId) => {
    try {
      await deleteMenuById(menuId);
      onOpenModal(null);
      toast.success(`Menu ${selectedMenu?.name} berhasil dihapus`);
    } catch (error) {
      toast.error(error?.message || "Gagal menghapus menu");
    }
  };

  return (
    <DashboardModalConfirmation
      isOpen={!!selectedMenu}
      title={`Hapus ${selectedMenu?.name}?`}
      description="Aksi ini tidak dapat dibatalkan, menu akan dihapus secara permanen."
      onOpenModal={onOpenModal}
      loading={loading}
      handleDelete={handleDelete}
      id={selectedMenu?.id}
      icon={PackageMinus}
    />
  );
};

export default MenuModalDelete;
