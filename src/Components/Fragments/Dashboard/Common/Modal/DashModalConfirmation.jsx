import { Button } from "@/Components/Elements/Shadcn/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/Components/Elements/Shadcn/dialog";
import { Spinner } from "@/Components/Elements/Shadcn/spinner";
import { Trash } from "lucide-react";

const ModalConfirmation = ({ isOpen, title, description, onOpenModal, loading, handleDelete, id, icon: Icon }) => {
  return (
    <Dialog open={isOpen} onOpenChange={() => onOpenModal(null)}>
      <DialogContent showCloseButton={false} className="gap-4">
        <DialogHeader className="gap-4">
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 rounded-md bg-destructive/10 text-destructive">{Icon ? <Icon className="size-6" /> : <Trash className="size-6" />}</div>
            <span className="font-semibold text-lg">{title}</span>
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={(props) => <Button {...props} variant="outline" className="cursor-pointer" />}>Batal</DialogClose>
          <Button variant="destructive" disabled={loading} className="relative cursor-pointer" onClick={() => handleDelete(id)} size="default">
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
export default ModalConfirmation;
