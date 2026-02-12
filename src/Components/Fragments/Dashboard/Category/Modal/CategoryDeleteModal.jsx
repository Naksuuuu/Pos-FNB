import useDeleteCategory from "@/Hooks/Category/useDeleteCategory";
import { toast } from "sonner";

import { Button } from "@/Components/Elements/Shadcn/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/Components/Elements/Shadcn/dialog";
import { Spinner } from "@/Components/Elements/Shadcn/spinner";

const CategoryDeleteModal = ({ selectedCategory, onOpenModal }) => {
  const { deleteCategoryById, loading } = useDeleteCategory();

  const handleDelete = async (categoryId) => {
    try {
      await deleteCategoryById(categoryId);
      onOpenModal(null);
      toast.success(`Category ${selectedCategory?.name} berhasil dihapus`);
    } catch (error) {
      toast.error(error?.message || "Failed to delete category");
    }
  };

  return (
    <Dialog open={selectedCategory !== null} onOpenChange={() => onOpenModal(null)}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{`Hapus ${selectedCategory?.name}?`}</DialogTitle>
          <DialogDescription>Aksi ini tidak dapat dibatalkan, menu akan dihapus secara permanen.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={(props) => <Button {...props} variant="outline" className="cursor-pointer" />}>Batal</DialogClose>
          <Button variant="destructive" disabled={loading} className="relative cursor-pointer" onClick={() => handleDelete(selectedCategory?.id)} size="default">
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

export default CategoryDeleteModal;
