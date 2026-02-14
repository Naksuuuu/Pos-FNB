import { memo } from "react";
import { Pen, Trash } from "lucide-react";

import { rupiah } from "@/Utils/rupiahHelper";

import { Button } from "@/Components/Elements/Shadcn/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/Elements/Shadcn/table";
import DashboardTableError from "@/Components/Fragments/Dashboard/Common/Table/DashboardTableError";
import DashboardTableLoading from "@/Components/Fragments/Dashboard/Common/Table/DashboardTableLoading";
import { Badge } from "@/Components/Elements/Shadcn/badge";

const MenuTable = memo(({ loading, errorMessage, menus = [], pagination, onOpenDeleteModal, onOpenEditModal }) => {
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
            <TableHead>Status</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading && !errorMessage && <DashboardTableLoading />}
          {errorMessage && !loading && <DashboardTableError message={errorMessage} />}
          {!loading &&
            !errorMessage &&
            menus.map((menu, index) => (
              <TableRow key={menu.id}>
                <TableCell>{pagination.from + index}</TableCell>
                <TableCell>{menu.name}</TableCell>
                <TableCell>{menu.category?.name ?? "Tidak ada Kategorgi"}</TableCell>
                <TableCell>{rupiah(menu.price)}</TableCell>
                <TableCell>{menu.stock}</TableCell>
                <TableCell>
                  {menu.is_available ? (
                    <Badge className="py-1 px-2 bg-emerald-100 text-emerald-600">Tersedia</Badge>
                  ) : (
                    <Badge variant="destructive" className="py-1 px-2 ">
                      Tidak Tersedia
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Button size="icon" variant="ghost" className="text-red-500 rounded-full hover:bg-red-200 hover:text-red-600" onClick={() => onOpenDeleteModal(menu)}>
                    <Trash />
                    <span className="sr-only">Hapus</span>
                  </Button>
                  <Button size="icon" variant="ghost" className="rounded-full  text-emerald-500 hover:bg-emerald-200 hover:text-emerald-600" onClick={() => onOpenEditModal(menu)}>
                    <Pen />
                    <span className="sr-only">Edit</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
});

export default MenuTable;
