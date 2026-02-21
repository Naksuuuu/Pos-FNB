import { Pen, Trash } from "lucide-react";

import { Badge } from "@/Components/Elements/Shadcn/badge";
import { Button } from "@/Components/Elements/Shadcn/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/Elements/Shadcn/table";
import DashboardTableError from "@/Components/Fragments/Dashboard/Common/Table/DashboardTableError";
import DashboardTableLoading from "@/Components/Fragments/Dashboard/Common/Table/DashboardTableLoading";
import { useMemo } from "react";
import DashboardPagination from "@/Components/Fragments/Dashboard/Common/DashboardPagination";

const DiningTableTable = ({ diningTables, loading, errorMessage, onOpenEditModal, onOpenDeleteModal, pagination, handlePageChange }) => {
  const columns = useMemo(() => {
    return [
      {
        header: "No",
        width: "w-[50px]",
      },
      {
        header: "Kode Nama",
        width: "w-[150px]",
      },
      {
        header: "Status",
        width: "w-[100px]",
      },
      {
        header: "Aksi",
        width: "w-[100px]",
      },
    ];
  }, []);

  return (
    <>
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.header} className={column.width}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading && !errorMessage && <DashboardTableLoading rows={15} columns={columns.length} />}
          {errorMessage && !loading && <DashboardTableError message={errorMessage} />}
          {!loading &&
            !errorMessage &&
            diningTables.map((table, index) => (
              <TableRow key={table.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{table.code}</TableCell>
                <TableCell>
                  {table.status == "available" ? <Badge className="py-1 px-2 bg-emerald-100 text-emerald-600">Tersedia</Badge> : <Badge className="py-1 px-2 bg-red-100 text-red-600">Dipakai</Badge>}
                </TableCell>
                <TableCell>
                  <Button size="icon" variant="ghost" className="text-red-500 rounded-full hover:bg-red-200 hover:text-red-600" onClick={() => onOpenDeleteModal(table)}>
                    <Trash />
                    <span className="sr-only">Hapus</span>
                  </Button>
                  <Button size="icon" variant="ghost" className="rounded-full  text-emerald-500 hover:bg-emerald-200 hover:text-emerald-600" onClick={() => onOpenEditModal(table)}>
                    <Pen />
                    <span className="sr-only">Edit</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <DashboardPagination pagination={pagination} onPageChange={handlePageChange} />
    </>
  );
};
export default DiningTableTable;
