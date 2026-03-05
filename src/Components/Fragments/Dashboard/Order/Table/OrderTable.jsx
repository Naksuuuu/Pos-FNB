import { memo } from "react";
import { Pen, Trash } from "lucide-react";

import { rupiah } from "@/Utils/rupiahHelper";

import { TABLE_ORDER_HEAD_COLUMNS } from "@/Constants/Dashboard/Order/OrderConstant";

import { Pagination } from "@/Components/Elements/Paginations/Pagination";
import { Badge } from "@/Components/Elements/Shadcn/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/Elements/Shadcn/table";

import DashTableError from "@/Components/Fragments/Dashboard/Common/Table/DashTableError";
import DashTableLoading from "@/Components/Fragments/Dashboard/Common/Table/DashTableLoading";

const OrderTable = memo(({ loading, errorMessage, orders = [], pagination, onOpenDeleteModal, onOpenEditModal, handlePageChange }) => {
  return (
    <>
      <Table className="min-w-full border-b ">
        <TableHeader>
          <TableRow>
            {TABLE_ORDER_HEAD_COLUMNS.map((col) => (
              <TableHead key={col.header} className={`${col.width}`}>
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading && !errorMessage && <DashTableLoading rows="15" columns={TABLE_ORDER_HEAD_COLUMNS.length} />}
          {errorMessage && !loading && <DashTableError message={errorMessage} />}
          {!loading &&
            !errorMessage &&
            orders.map((order, index) => (
              <TableRow key={order.id}>
                <TableCell>{pagination.from + index}</TableCell>
                <TableCell>{order.order_no}</TableCell>
                <TableCell className="truncate">{order.customer_name}</TableCell>
                <TableCell>
                  <Badge variant={order.status === "completed" ? "success" : order.status === "pending" ? "warning" : "destructive"} className="capitalize">
                    {order.status === "completed" ? "Selesai" : order.status === "pending" ? "Pending" : "Dibatalkan"}
                  </Badge>
                </TableCell>
                <TableCell>{order.table?.code}</TableCell>
                <TableCell>{rupiah(order.total_amount)}</TableCell>

                <TableCell className="flex gap-2 text-center justify-center">
                  <Pen className="size-4 text-success" onClick={() => onOpenEditModal(order)} />
                  <Trash className="size-4 text-destructive" onClick={() => onOpenDeleteModal(order)} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </>
  );
});
export default OrderTable;
