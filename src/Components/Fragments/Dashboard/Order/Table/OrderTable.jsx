import { Fragment, memo, useCallback, useState } from "react";
import { Eye } from "lucide-react";

import { rupiah } from "@/Utils/rupiahHelper";

import { ORDER_STATUS_BADGE, TABLE_ORDER_HEAD_COLUMNS } from "@/Constants/Dashboard/Order/OrderConstant";

import { Pagination } from "@/Components/Elements/Paginations/Pagination";
import { Badge } from "@/Components/Elements/Shadcn/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/Elements/Shadcn/table";

import DashTableError from "@/Components/Fragments/Dashboard/Common/Table/DashTableError";
import DashTableLoading from "@/Components/Fragments/Dashboard/Common/Table/DashTableLoading";
import { format } from "date-fns";
import { Separator } from "@/Components/Elements/Shadcn/separator";
import { Button } from "@/Components/Elements/Shadcn/button";

const OrderTable = memo(({ loading, errorMessage, orders = [], pagination, handlePageChange }) => {
  const [expandedRowId, setExpandedRowId] = useState(null);

  const handleExpandedRow = useCallback((id) => {
    setExpandedRowId((prevId) => (prevId === id ? null : id));
  }, []);

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
          {loading && !errorMessage && <DashTableLoading rows="15" columns={TABLE_ORDER_HEAD_COLUMNS.length} actionCountLoading={1} />}
          {errorMessage && !loading && <DashTableError message={errorMessage} />}
          {!loading &&
            !errorMessage &&
            orders.map((order, index) => (
              <Fragment key={order.id}>
                <TableRow>
                  <TableCell>{pagination.from + index}</TableCell>
                  <TableCell>
                    <p onClick={() => handleExpandedRow(order.id)} className="w-full  cursor-pointer">
                      {order.order_no}
                    </p>
                  </TableCell>
                  <TableCell className="w-2/6 truncate">
                    <p onClick={() => handleExpandedRow(order.id)} className="w-full whitespace-normal cursor-pointer">
                      {order.customer_name}
                    </p>
                  </TableCell>
                  <TableCell>{order.table?.code}</TableCell>
                  <TableCell>{rupiah(order.total_amount)}</TableCell>
                  <TableCell className="text-center ">
                    <Badge variant={ORDER_STATUS_BADGE.find((status) => status.value === order.status)?.variant || "default"} className="capitalize">
                      {ORDER_STATUS_BADGE.find((status) => status.value === order.status)?.label || order.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="flex gap-2 text-center justify-center">
                    <Button size="icon" variant="outline" onClick={() => handleExpandedRow(order.id)}>
                      <Eye className="size-4 text-black cursor-pointer" />
                    </Button>
                  </TableCell>
                </TableRow>

                <TableRow className="w-full ">
                  <TableCell colSpan={TABLE_ORDER_HEAD_COLUMNS.length} className="relative p-0">
                    <div className={`grid transition-all duration-300 ease-out ${expandedRowId === order.id ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                      <div className="overflow-hidden ">
                        <div className="flex justify-between gap-4 p-4">
                          <div className="w-1/3 text-start">
                            <p className="font-medium text-foreground">Item Dipesan ({order.items.length}) :</p>
                            <ul className="list-disc ml-2 space-y-0.5">
                              {order.items.map((item) => (
                                <li key={item.id}>
                                  <p className="w-full whitespace-normal line-clamp-6">
                                    {item.qty}x {item.menu.name} <span className="font-semibold text-xs">({rupiah(item.subtotal)})</span>
                                  </p>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <Separator orientation="vertical" className="w-px " />
                          <div className="w-1/3 text-start ">
                            <p className="font-medium text-foreground">Notes :</p>
                            <p className="w-full whitespace-normal line-clamp-6">{order.notes || "Tidak ada catatan "}</p>
                          </div>

                          <Separator orientation="vertical" className="w-px " />
                          <div className="w-1/3 text-start space-y-2">
                            <div>
                              <p className="font-medium text-foreground">Tanggal Dibuat :</p>
                              <p>{order.created_at ? format(order.created_at, "dd MMM yyyy HH:mm") : "Tidak ada tanggal dibuat"}</p>
                            </div>
                            <div>
                              <p className="font-medium text-foreground">Terakhir Diperbaharui :</p>
                              <p>{order.updated_at ? format(order.updated_at, "dd MMM yyyy HH:mm") : "Tidak ada tanggal diperbaharui"}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              </Fragment>
            ))}
        </TableBody>
      </Table>

      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </>
  );
});
export default OrderTable;
