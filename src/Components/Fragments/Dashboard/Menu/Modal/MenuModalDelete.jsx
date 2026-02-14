import useDeleteMenu from "@/Hooks/Menu/useDeleteMenu";
import { toast } from "sonner";

import DashboardModalConfirmation from "@/Components/Fragments/Dashboard/Common/Modal/DashboardModalConfirmation";

const MenuModalDelete = ({ selectedProduct, onOpenModal }) => {
  const { deleteMenuById, loading } = useDeleteMenu();

  const handleDelete = async (menuId) => {
    try {
      await deleteMenuById(menuId);
      onOpenModal(null);
      toast.success(`Menu ${selectedProduct?.name} berhasil dihapus`);
    } catch (error) {
      toast.error(error?.message || "Failed to delete menu");
    }
  };

  return (
    <DashboardModalConfirmation
      isOpen={!!selectedProduct}
      title={`Hapus ${selectedProduct?.name}?`}
      description="Aksi ini tidak dapat dibatalkan, menu akan dihapus secara permanen."
      onOpenModal={onOpenModal}
      loading={loading}
      handleDelete={handleDelete}
      id={selectedProduct?.id}
    />
  );
};

export default MenuModalDelete;
