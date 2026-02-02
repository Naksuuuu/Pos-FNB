import { Button } from "@/Components/Elements/Shadcn/Button/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/Elements/Shadcn/Table/table";

import { dummyProducts } from "@/Pages/Customer/Catalog/ListCatalog";
import { Pen, Trash } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import ProductDeleteModal from "../Modal/ProductDeleteModal";
import ProductEditModal from "../Modal/ProductEditModal";

const ProductTable = () => {
  const [selectedEditProduct, setSelectedEditProduct] = useState(null);
  const [selectedDeleteProduct, setSelectedDeleteProduct] = useState(null);
  const products = useMemo(
    () =>
      dummyProducts.map((product) => {
        const { extra, ...productWithoutExtra } = product;
        return productWithoutExtra;
      }),
    [],
  );

  const handleOpenDeleteModal = useCallback((productSelected) => {
    setSelectedEditProduct(null);
    setSelectedDeleteProduct(productSelected);
  }, []);

  const handleOpenEditModal = useCallback((productSelected) => {
    setSelectedDeleteProduct(null);
    setSelectedEditProduct(productSelected);
  }, []);

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
                  onClick={() => handleOpenDeleteModal(product)}
                >
                  <Trash />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-full text-emerald-500 hover:bg-emerald-200 hover:text-emerald-600 cursor-pointer"
                  onClick={() => handleOpenEditModal(product)}
                >
                  <Pen />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedDeleteProduct && (
        <ProductDeleteModal selectedProduct={selectedDeleteProduct} handleOpenModal={handleOpenDeleteModal} />
      )}
      {selectedEditProduct && (
        <ProductEditModal selectedProduct={selectedEditProduct} handleOpenModal={handleOpenEditModal} />
      )}
    </div>
  );
};

export default ProductTable;
