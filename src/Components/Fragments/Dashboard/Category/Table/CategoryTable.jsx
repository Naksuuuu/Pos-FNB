import { memo } from "react";
import { Pen, Trash } from "lucide-react";

import { rupiah } from "@/Utils/rupiahHelper";

import { Button } from "@/Components/Elements/Shadcn/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/Elements/Shadcn/table";
import { Skeleton } from "@/Components/Elements/Shadcn/skeleton";
import { Spinner } from "@/Components/Elements/Shadcn/spinner";

const CategoryTable = memo(({ loading, errorMessage, categories = [], loadCategories, onOpenDeleteModal, onOpenEditModal }) => {
  return (
    <div className="overflow-hidden border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading && !errorMessage && <TableSkeleton />}
          {errorMessage && !loading && <TableError message={errorMessage} loadCategories={loadCategories} />}
          {!loading &&
            !errorMessage &&
            categories.map((category, index) => (
              <TableRow key={category.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  <Button size="icon" variant="ghost" className="text-red-500 rounded-full hover:bg-red-200 hover:text-red-600" onClick={() => onOpenDeleteModal(category)}>
                    <Trash />
                  </Button>
                  <Button size="icon" variant="ghost" className="rounded-full  text-emerald-500 hover:bg-emerald-200 hover:text-emerald-600" onClick={() => onOpenEditModal(category)}>
                    <Pen />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
});

const TableSkeleton = memo(() => {
  return (
    <TableRow>
      <TableCell colSpan={6}>
        <div className="relative flex items-center justify-center">
          <Skeleton className="w-full h-125" />
          <Spinner className="absolute size-8" />
        </div>
      </TableCell>
    </TableRow>
  );
});

const TableError = memo(({ message = "Cannot connect to the server", loadCategories }) => {
  return (
    <TableRow>
      <TableCell colSpan={6}>
        <div className="flex flex-col items-center justify-center gap-4 p-4 text-center text-red-500 h-125">
          <p>{message}</p>
          <Button className="ml-4" onClick={loadCategories}>
            Muat Ulang
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
});

export default CategoryTable;
