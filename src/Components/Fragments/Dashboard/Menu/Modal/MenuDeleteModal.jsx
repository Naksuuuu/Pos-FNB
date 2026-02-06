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
import { memo } from "react";

const MenuDeleteModal = memo(({ selectedProduct, onOpenModal }) => {
  return (
    <Dialog open={selectedProduct !== null} onOpenChange={() => onOpenModal(null)}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{`Are you sure you want to delete ${selectedProduct?.name}?`}</DialogTitle>
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
          <DialogClose asChild>
            <Button
              variant="destructive"
              className="cursor-pointer"
              onClick={() => console.log(`Update ${selectedProduct?.id}`)}
            >
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

export default MenuDeleteModal;
