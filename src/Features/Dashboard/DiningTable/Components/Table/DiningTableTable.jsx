import { memo } from "react";
import { Pen, Trash } from "lucide-react";

import { TABLE_DINING_TABLE_HEAD_COLUMNS } from "@/Features/Dashboard/DiningTable/Constants/DiningTableConstant";
import { PER_PAGE_OPTIONS } from "@/Constants/CommonConstant";

import { Select } from "@/Components/Elements/Inputs/Select";
import { Pagination } from "@/Components/Elements/Paginations/Pagination";
import { Badge } from "@/Components/Elements/Shadcn/badge";
import { Button } from "@/Components/Elements/Shadcn/button";
import { Checkbox } from "@/Components/Elements/Shadcn/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/Elements/Shadcn/table";

import DashTableError from "@/Features/Dashboard/Shared/Component/Table/DashTableError";
import DashTableLoading from "@/Features/Dashboard/Shared/Component/Table/DashTableLoading";

const DiningTableTable = memo(
  ({
    diningTables,
    loading,
    errorMessage,
    onOpenEditModal,
    onOpenDeleteModal,
    pagination,
    handlePageChange,
    isChecked,
    handleAllCheckboxChange,
    handleCheckboxChange,
    handlePerPageChange,
    filters,
  }) => {
    return (
      <>
        <Table className="min-w-full border-b">
          <TableHeader>
            <TableRow>
              <TableHead className="w-8">
                <Checkbox
                  checked={isChecked.find((itm) => itm.page === pagination.current_page)?.idTables.length === diningTables.length && diningTables.length > 0}
                  onCheckedChange={() =>
                    handleAllCheckboxChange({
                      page: pagination.current_page,
                      idTables: diningTables.map((table) => table.id),
                    })
                  }
                />
              </TableHead>
              {TABLE_DINING_TABLE_HEAD_COLUMNS.map((column) => (
                <TableHead key={column.header} className={column.width}>
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && !errorMessage && <DashTableLoading rows={15} columns={TABLE_DINING_TABLE_HEAD_COLUMNS.length + 1} actionCountLoading={2} />}
            {errorMessage && !loading && <DashTableError message={errorMessage} />}
            {!loading && !errorMessage && diningTables.length < 1 && <DashTableError message="Tidak ada data meja" />}
            {!loading &&
              !errorMessage &&
              diningTables.map((table, index) => (
                <TableRow key={table.id}>
                  <TableCell className="w-8">
                    <Checkbox
                      checked={isChecked.find((itm) => itm.page === pagination.current_page)?.idTables.includes(table.id) ?? false}
                      onCheckedChange={() =>
                        handleCheckboxChange({
                          page: pagination.current_page,
                          idTables: [table.id],
                        })
                      }
                    />
                  </TableCell>
                  <TableCell>{pagination.from + index}</TableCell>
                  <TableCell>{table.code}</TableCell>
                  <TableCell className="text-center">
                    {table.status == "available" ? (
                      <Badge className="px-2 py-1 bg-success/10 text-success">Tersedia</Badge>
                    ) : (
                      <Badge className="px-2 py-1 bg-destructive/10 text-destructive">Dipakai</Badge>
                    )}
                  </TableCell>
                  <TableCell className="flex justify-center gap-2 text-center">
                    <div className="flex items-center justify-center h-full gap-2 text-center">
                      <Button variant="outline" onClick={() => onOpenEditModal(table)}>
                        <Pen className="cursor-pointer size-4 text-success" />
                      </Button>
                      <Button variant="outline" onClick={() => onOpenDeleteModal(table)}>
                        <Trash className="cursor-pointer size-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <div className="flex">
          <div className="flex items-center gap-2">
            <p className="text-nowrap">Data per halaman</p>
            <Select id="per-page" name="per-page" items={PER_PAGE_OPTIONS} value={filters.per_page || 15} onValueChange={(value) => handlePerPageChange(Number(value))} />
          </div>
          <Pagination pagination={pagination} onPageChange={handlePageChange} align="end" />
        </div>
      </>
    );
  },
);
export default DiningTableTable;
