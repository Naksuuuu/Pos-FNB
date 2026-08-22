import { memo } from "react";
import { Pen, Trash } from "lucide-react";
import { format } from "date-fns";

import { TABLE_CUSTOM_OPTION_HEAD_COLUMNS } from "@/Features/Dashboard/CustomOption/Constants/CustomOptionConstant";
import { PER_PAGE_OPTIONS } from "@/Constants/CommonConstant";
import { rupiah } from "@/Utils/rupiahHelper";

import { Select } from "@/Components/Elements/Inputs/Select";
import { Pagination } from "@/Components/Elements/Paginations/Pagination";
import { Button } from "@/Components/Elements/Shadcn/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/Elements/Shadcn/table";

import DashTableError from "@/Features/Dashboard/Shared/Component/Table/DashTableError";
import DashTableLoading from "@/Features/Dashboard/Shared/Component/Table/DashTableLoading";

const CustomOptionTable = memo(
  ({
    customOptions = [],
    loading,
    errorMessage,
    onOpenEditModal,
    onOpenDeleteModal,
    pagination,
    handlePageChange,
    handlePerPageChange,
    filters,
  }) => {
    return (
      <>
        <Table className="min-w-full border-b">
          <TableHeader>
            <TableRow>
              {TABLE_CUSTOM_OPTION_HEAD_COLUMNS.map((column) => (
                <TableHead key={column.header} className={column.width}>
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && !errorMessage && (
              <DashTableLoading
                rows={15}
                columns={TABLE_CUSTOM_OPTION_HEAD_COLUMNS.length}
                actionCountLoading={2}
              />
            )}
            {errorMessage && !loading && <DashTableError message={errorMessage} />}
            {!loading && !errorMessage && customOptions.length < 1 && (
              <DashTableError message="Tidak ada data opsi kustom" />
            )}
            {!loading &&
              !errorMessage &&
              customOptions.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{pagination?.from ? pagination.from + index : index + 1}</TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="font-semibold text-primary">
                    {rupiah(Number(item.price) || 0)}
                  </TableCell>
                  <TableCell>
                    {item.created_at ? (
                      format(new Date(item.created_at), "dd MMM yyyy HH:mm")
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center h-full gap-2 text-center">
                      <Button variant="outline" size="sm" onClick={() => onOpenEditModal(item)}>
                        <Pen className="cursor-pointer size-4 text-success" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => onOpenDeleteModal(item)}>
                        <Trash className="cursor-pointer size-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <div className="flex justify-between items-center px-4 py-2">
          <div className="flex items-center gap-2">
            <p className="text-nowrap text-sm text-muted-foreground">Data per halaman</p>
            <Select
              id="per-page"
              name="per-page"
              items={PER_PAGE_OPTIONS}
              value={filters.per_page || 15}
              onValueChange={(value) => handlePerPageChange(Number(value))}
            />
          </div>
          <Pagination pagination={pagination} onPageChange={handlePageChange} align="end" />
        </div>
      </>
    );
  },
);

CustomOptionTable.displayName = "CustomOptionTable";

export default CustomOptionTable;
