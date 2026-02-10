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
          <DialogTitle>{`Delete ${selectedProduct?.name}?`}</DialogTitle>
          <DialogDescription>This action cannot be undone. This will permanently delete your menu and remove your data from our servers.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="cursor-pointer">
              Cancel
            </Button>
          </DialogClose>
          <Button variant="destructive" disabled={loading} className="relative cursor-pointer" onClick={() => handleDelete(selectedProduct?.id)} size="default">
            <span className={loading ? "invisible" : "visible"}>Delete</span>

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
