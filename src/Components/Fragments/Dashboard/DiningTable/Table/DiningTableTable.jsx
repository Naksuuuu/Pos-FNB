import { memo } from "react";
import { Pen, Trash } from "lucide-react";

import { TABLE_DINING_TABLE_HEAD_COLUMNS } from "@/Constants/Dashboard/DiningTable/DiningTableConstant";

import { Badge } from "@/Components/Elements/Shadcn/badge";
import { Pagination } from "@/Components/Elements/Paginations/Pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/Elements/Shadcn/table";

import DashTableError from "@/Components/Fragments/Dashboard/Common/Table/DashTableError";
import DashTableLoading from "@/Components/Fragments/Dashboard/Common/Table/DashTableLoading";

const DiningTableTable = memo(({ diningTables, loading, errorMessage, onOpenEditModal, onOpenDeleteModal, pagination, handlePageChange }) => {
  return (
    <>
      <Table className="min-w-full border-b">
        <TableHeader>
          <TableRow>
            {TABLE_DINING_TABLE_HEAD_COLUMNS.map((column) => (
              <TableHead key={column.header} className={column.width}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading && !errorMessage && <DashTableLoading rows={15} columns={TABLE_DINING_TABLE_HEAD_COLUMNS.length} />}
          {errorMessage && !loading && <DashTableError message={errorMessage} />}
          {!loading &&
            !errorMessage &&
            diningTables.map((table, index) => (
              <TableRow key={table.id}>
                <TableCell>{pagination.from + index}</TableCell>
                <TableCell>{table.code}</TableCell>
                <TableCell className="text-center">
                  {table.status == "available" ? (
                    <Badge className="py-1 px-2 bg-success/10 text-success">Tersedia</Badge>
                  ) : (
                    <Badge className="py-1 px-2 bg-destructive/10 text-destructive">Dipakai</Badge>
                  )}
                </TableCell>
                <TableCell className="flex gap-2 text-center justify-center">
                  <Pen className="size-4 text-success" onClick={() => onOpenEditModal(table)} />
                  <Trash className="size-4 text-destructive" onClick={() => onOpenDeleteModal(table)} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </>
  );
});
export default DiningTableTable;
