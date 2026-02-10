import { memo } from "react";
import { Pen, Trash } from "lucide-react";

import { rupiah } from "@/Utils/rupiahHelper";

import { Button } from "@/Components/Elements/Shadcn/Button/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/Elements/Shadcn/Table/table";

const MenuTable = memo(({ menus, onOpenDeleteModal, onOpenEditModal }) => {
  // console.log(menus);

  return (
    <div className="rounded-lg overflow-hidden border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {menus.map((menu) => (
            <TableRow key={menu.id}>
              <TableCell>{menu.id}</TableCell>
              <TableCell>{menu.name.length > 100 ? `${menu.name.substring(0, 50)}...` : menu.name}</TableCell>
              <TableCell>{menu.category?.name ?? "loading"}</TableCell>
              <TableCell>{rupiah(menu.price)}</TableCell>
              <TableCell>{menu.stock}</TableCell>
              <TableCell>
                <Button size="icon" variant="ghost" className="rounded-full text-red-500 hover:bg-red-200 hover:text-red-600 cursor-pointer" onClick={() => onOpenDeleteModal(menu)}>
                  <Trash />
                </Button>
                <Button size="icon" variant="ghost" className="rounded-full text-emerald-500 hover:bg-emerald-200 hover:text-emerald-600 cursor-pointer" onClick={() => onOpenEditModal(menu)}>
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

export default MenuTable;
