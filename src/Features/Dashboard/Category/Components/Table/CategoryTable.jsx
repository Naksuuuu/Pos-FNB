import { memo } from "react";
import { Pen, Trash } from "lucide-react";

import { TABLE_CATEGORY_HEAD_COLUMNS } from "@/Features/Dashboard/Category/Constants/CategoryConstant";

import { Checkbox } from "@/Components/Elements/Shadcn/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/Elements/Shadcn/table";
import { Button } from "@/Components/Elements/Shadcn/button";

import DashTableError from "@/Features/Dashboard/Shared/Component/Table/DashTableError";
import DashTableLoading from "@/Features/Dashboard/Shared/Component/Table/DashTableLoading";

const CategoryTable = memo(({ loading, errorMessage, categories = [], onOpenDeleteModal, onOpenEditModal, isChecked, handleAllCheckboxChange, handleCheckboxChange }) => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-8">
              <Checkbox checked={isChecked.length === categories.length && categories.length > 0} onCheckedChange={() => handleAllCheckboxChange(categories.map((c) => c.id))} />
            </TableHead>
            {TABLE_CATEGORY_HEAD_COLUMNS.map((col) => (
              <TableHead key={col.header} className={`${col.width}`}>
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading && !errorMessage && <DashTableLoading rows="15" columns={TABLE_CATEGORY_HEAD_COLUMNS.length + 1} actionCountLoading={2} />}
          {errorMessage && !loading && <DashTableError message={errorMessage} />}
          {!loading && !errorMessage && categories.length < 1 && <DashTableError message="Tidak ada data kategori" />}
          {!loading &&
            !errorMessage &&
            categories.map((category, index) => (
              <TableRow key={category.id}>
                <TableCell className="w-8">
                  <Checkbox checked={isChecked.includes(category.id)} onCheckedChange={() => handleCheckboxChange(category.id)} />
                </TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell className="text-center">{category.menu_count}</TableCell>
                <TableCell className="flex gap-2 text-center justify-center">
                  <div className="flex items-center justify-center h-full gap-2 text-center">
                    <Button variant="outline" onClick={() => onOpenEditModal(category)}>
                      <Pen className="cursor-pointer size-4 text-success" />
                    </Button>
                    <Button variant="outline" onClick={() => onOpenDeleteModal(category)}>
                      <Trash className="cursor-pointer size-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
});

export default CategoryTable;


