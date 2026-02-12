import useDeleteMenu from "@/Hooks/Menu/useDeleteMenu";

import { Button } from "@/Components/Elements/Shadcn/Button/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/Components/Elements/Shadcn/Dialog/dialog";
import { toast } from "sonner";
import { Spinner } from "@/Components/Elements/Shadcn/Spinner/spinner";

const MenuDeleteModal = ({ selectedProduct, onOpenModal }) => {
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
    <Dialog open={selectedProduct !== null} onOpenChange={() => onOpenModal(null)}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{`Hapus ${selectedProduct?.name}?`}</DialogTitle>
          <DialogDescription>Aksi ini tidak dapat dibatalkan, menu akan dihapus secara permanen.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={(props) => <Button {...props} variant="outline" className="cursor-pointer" />}>Batal</DialogClose>
          <Button variant="destructive" disabled={loading} className="relative cursor-pointer" onClick={() => handleDelete(selectedProduct?.id)} size="default">
            <span className={loading ? "invisible" : "visible"}>Hapus</span>

            {loading && (
              <div className="absolute ">
                <Spinner />
              </div>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MenuDeleteModal;
