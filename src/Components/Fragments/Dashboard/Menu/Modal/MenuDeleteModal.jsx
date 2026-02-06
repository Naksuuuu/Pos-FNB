import { Button } from "@/Components/Elements/Shadcn/Button/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/Elements/Shadcn/Dialog/dialog";
import useDeleteMenu from "@/Hooks/Menu/useDeleteMenu";
import { memo, useCallback } from "react";

const MenuDeleteModal = memo(({ selectedProduct, onOpenModal }) => {
  const { deleteMenuById } = useDeleteMenu();

  const handleDelete = useCallback(
    async (menuId) => {
      await deleteMenuById(menuId);
      onOpenModal(null);
    },
    [deleteMenuById, onOpenModal],
  );

  return (
    <Dialog open={selectedProduct !== null} onOpenChange={() => onOpenModal(null)}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{`Delete ${selectedProduct?.name}?`}</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your menu and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="cursor-pointer">
              Cancel
            </Button>
          </DialogClose>
          <Button variant="destructive" className="cursor-pointer" onClick={() => handleDelete(selectedProduct?.id)}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

export default MenuDeleteModal;
