import { Button } from "@/Components/Elements/Shadcn/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/Components/Elements/Shadcn/dialog";
import { Spinner } from "@/Components/Elements/Shadcn/spinner";

const ModalConfirmation = ({ isOpen, title, description, onOpenModal, loading, handleDelete, id }) => {
  return (
    <Dialog open={isOpen} onOpenChange={() => onOpenModal(null)}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
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
