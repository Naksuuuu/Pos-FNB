import { Button } from "@/Components/Elements/Shadcn/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/Components/Elements/Shadcn/dialog";
import { Spinner } from "@/Components/Elements/Shadcn/spinner";

const ModalForm = ({ isOpen, onOpenModal, title, loading, handleSubmit, onSubmitForm, children }) => {
  return (
    <Dialog open={isOpen} onOpenChange={() => onOpenModal(false)}>
      <DialogContent showCloseButton={false}>
        <form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>

          <div className="no-scrollbar max-h-[50vh] overflow-y-auto">{children}</div>

          <DialogFooter>
            <DialogClose render={(props) => <Button {...props} variant="outline" className="cursor-pointer" />}>Batal</DialogClose>
            <Button type="submit" disabled={loading} className="relative cursor-pointer" size="default">
              <span className={loading ? "invisible" : "visible"}>Simpan</span>
              {loading && (
                <div className="absolute ">
                  <Spinner />
                </div>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default ModalForm;
