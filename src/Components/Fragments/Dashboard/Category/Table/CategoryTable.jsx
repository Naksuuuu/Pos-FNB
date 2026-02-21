import { memo } from "react";
import { Pen, Trash } from "lucide-react";

import { TABLE_CATEGORY_HEAD_COLUMNS } from "@/Constants/Dashboard/Category/CategoryConstant";

import { Button } from "@/Components/Elements/Shadcn/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/Elements/Shadcn/table";
import DashboardTableError from "@/Components/Fragments/Dashboard/Common/Table/DashboardTableError";
import DashboardTableLoading from "@/Components/Fragments/Dashboard/Common/Table/DashboardTableLoading";

const CategoryTable = memo(({ loading, errorMessage, categories = [], onOpenDeleteModal, onOpenEditModal }) => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {TABLE_CATEGORY_HEAD_COLUMNS.map((col) => (
              <TableHead key={col.header} className={`${col.width}`}>
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading && !errorMessage && <DashboardTableLoading rows="15" columns={TABLE_CATEGORY_HEAD_COLUMNS.length} />}
          {errorMessage && !loading && <DashboardTableError message={errorMessage} />}
          {!loading &&
            !errorMessage &&
            categories.map((category, index) => (
              <TableRow key={category.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.menu_count}</TableCell>
                <TableCell>
                  <Button size="icon" variant="ghost" className="text-red-500 rounded-full hover:bg-red-200 hover:text-red-600" onClick={() => onOpenDeleteModal(category)}>
                    <Trash />
                    <span className="sr-only">Hapus</span>
                  </Button>
                  <Button size="icon" variant="ghost" className="rounded-full  text-emerald-500 hover:bg-emerald-200 hover:text-emerald-600" onClick={() => onOpenEditModal(category)}>
                    <Pen />
                    <span className="sr-only">Edit</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
});

export default CategoryTable;
