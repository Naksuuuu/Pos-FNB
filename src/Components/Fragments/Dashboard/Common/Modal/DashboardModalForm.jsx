import { Button } from "@/Components/Elements/Shadcn/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/Components/Elements/Shadcn/dialog";
import { Spinner } from "@/Components/Elements/Shadcn/spinner";
import { SquarePlus } from "lucide-react";

const ModalForm = ({ isOpen, onOpenModal, title, loading, handleSubmit, onSubmitForm, children, icon: Icon }) => {
  return (
    <Dialog open={isOpen} onOpenChange={() => onOpenModal(false)}>
      <DialogContent showCloseButton={false} className="w-full md:max-w-3xl!">
        <form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="p-2 bg-emerald-100 rounded-md text-emerald-900">{Icon ? <Icon className="size-4" /> : <SquarePlus className="size-4" />}</div>
              <span className="font-semibold text-lg">{title}</span>
            </DialogTitle>
          </DialogHeader>

          <div className="no-scrollbar max-h-[50vh] overflow-y-auto overflow-x-hidden">{children}</div>

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
