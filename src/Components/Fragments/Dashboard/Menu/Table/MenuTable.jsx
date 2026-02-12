import { memo } from "react";
import { Pen, Trash } from "lucide-react";

import { rupiah } from "@/Utils/rupiahHelper";

import { Button } from "@/Components/Elements/Shadcn/Button/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/Elements/Shadcn/Table/table";
import { Skeleton } from "@/Components/Elements/Shadcn/Skeleton/skeleton";
import { Spinner } from "@/Components/Elements/Shadcn/Spinner/spinner";

const MenuTable = memo(({ loading, errorMessage, menus = [], pagination, loadMenus, onOpenDeleteModal, onOpenEditModal }) => {
  return (
    <div className="overflow-hidden border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Kategori</TableHead>
            <TableHead>Harga</TableHead>
            <TableHead>Stok</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading && !errorMessage && <TableSkeleton />}
          {errorMessage && !loading && <TableError message={errorMessage} loadMenus={loadMenus} />}
          {!loading &&
            !errorMessage &&
            menus.map((menu, index) => (
              <TableRow key={menu.id}>
                <TableCell>{pagination.from + index}</TableCell>
                <TableCell>{menu.name}</TableCell>
                <TableCell>{menu.category?.name ?? "loading"}</TableCell>
                <TableCell>{rupiah(menu.price)}</TableCell>
                <TableCell>{menu.stock}</TableCell>
                <TableCell>
                  <Button size="icon" variant="ghost" className="text-red-500 rounded-full cursor-pointer hover:bg-red-200 hover:text-red-600" onClick={() => onOpenDeleteModal(menu)}>
                    <Trash />
                  </Button>
                  <Button size="icon" variant="ghost" className="rounded-full cursor-pointer text-emerald-500 hover:bg-emerald-200 hover:text-emerald-600" onClick={() => onOpenEditModal(menu)}>
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

const TableError = memo(({ message = "Cannot connect to the server", loadMenus }) => {
  return (
    <TableRow>
      <TableCell colSpan={6}>
        <div className="flex flex-col items-center justify-center gap-4 p-4 text-center text-red-500 h-125">
          <p>{message}</p>
          <Button className="ml-4" onClick={loadMenus}>
            Muat Ulang
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
});

export default MenuTable;
