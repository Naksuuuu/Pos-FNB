import { Button } from "@/Components/Elements/Shadcn/Button/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/Elements/Shadcn/Dialog/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/Elements/Shadcn/Table/table";

import { dummyProducts } from "@/Pages/Customer/Catalog/ListCatalog";
import { Trash } from "lucide-react";
import { useState } from "react";

function ProductTable() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const products = dummyProducts.map((product) => {
    const { extra, ...productWithoutExtra } = product;
    return productWithoutExtra;
  });

  return (
    <div>
      <Table className="border!">
        <TableHeader>
          <TableRow className="bg-gray-100 hover:bg-gray-200">
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Harga</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow className="" key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.harga}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-full text-red-500 hover:bg-red-200 hover:text-red-600 cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <Trash />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={selectedProduct !== null} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>{`Are you sure you want to delete ${selectedProduct?.name}?`}</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your product and remove your data from our
              servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                variant="destructive"
                className="cursor-pointer"
                onClick={() => console.log(`Deleting ${selectedProduct?.id}`)}
              >
                Delete
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProductTable;
