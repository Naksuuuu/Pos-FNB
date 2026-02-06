import { Button } from "@/Components/Elements/Shadcn/Button/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/Elements/Shadcn/Table/table";

import { Pen, Trash } from "lucide-react";
import { memo } from "react";

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
          {menus.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name.length > 100 ? `${product.name.substring(0, 50)}...` : product.name}</TableCell>
              <TableCell>{product.category?.name ?? "loading"}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-full text-red-500 hover:bg-red-200 hover:text-red-600 cursor-pointer"
                  onClick={() => onOpenDeleteModal(product)}
                >
                  <Trash />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-full text-emerald-500 hover:bg-emerald-200 hover:text-emerald-600 cursor-pointer"
                  onClick={() => onOpenEditModal(product)}
                >
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
