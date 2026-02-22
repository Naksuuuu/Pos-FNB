import { memo } from "react";
import { Pen, Trash } from "lucide-react";

import { TABLE_DINING_TABLE_HEAD_COLUMNS } from "@/Constants/Dashboard/DiningTable/DiningTableConstant";

import { Badge } from "@/Components/Elements/Shadcn/badge";
import { Button } from "@/Components/Elements/Shadcn/button";
import { Pagination } from "@/Components/Elements/Paginations/Pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/Elements/Shadcn/table";
import DashTableError from "@/Components/Fragments/Dashboard/Common/Table/DashTableError";
import DashTableLoading from "@/Components/Fragments/Dashboard/Common/Table/DashTableLoading";

const DiningTableTable = memo(
  ({ diningTables, loading, errorMessage, onOpenEditModal, onOpenDeleteModal, pagination, handlePageChange }) => {
    return (
      <>
        <Table className="min-w-full">
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
            {loading && !errorMessage && (
              <DashTableLoading rows={15} columns={TABLE_DINING_TABLE_HEAD_COLUMNS.length} />
            )}
            {errorMessage && !loading && <DashTableError message={errorMessage} />}
            {!loading &&
              !errorMessage &&
              diningTables.map((table, index) => (
                <TableRow key={table.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{table.code}</TableCell>
                  <TableCell>
                    {table.status == "available" ? (
                      <Badge className="py-1 px-2 bg-emerald-100 text-emerald-600">Tersedia</Badge>
                    ) : (
                      <Badge className="py-1 px-2 bg-red-100 text-red-600">Dipakai</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-red-500 rounded-full hover:bg-red-200 hover:text-red-600"
                      onClick={() => onOpenDeleteModal(table)}
                    >
                      <Trash />
                      <span className="sr-only">Hapus</span>
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="rounded-full  text-emerald-500 hover:bg-emerald-200 hover:text-emerald-600"
                      onClick={() => onOpenEditModal(table)}
                    >
                      <Pen />
                      <span className="sr-only">Edit</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <Pagination pagination={pagination} onPageChange={handlePageChange} />
      </>
    );
  },
);
export default DiningTableTable;
