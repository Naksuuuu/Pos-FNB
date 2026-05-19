import { Fragment, memo, useCallback, useState } from "react";
import { Eye } from "lucide-react";
import { format } from "date-fns";

import { rupiah } from "@/Utils/rupiahHelper";

import { ORDER_STATUS_BADGE, TABLE_ORDER_HEAD_COLUMNS } from "@/Features/Dashboard/Order/Constants/OrderConstant";
import { PER_PAGE_OPTIONS } from "@/Constants/CommonConstant";

import { Pagination } from "@/Components/Elements/Paginations/Pagination";
import { Select } from "@/Components/Elements/Inputs/Select";
import { Badge } from "@/Components/Elements/Shadcn/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/Elements/Shadcn/table";
import { Separator } from "@/Components/Elements/Shadcn/separator";
import { Button } from "@/Components/Elements/Shadcn/button";

import DashTableError from "@/Features/Dashboard/Shared/Component/Table/DashTableError";
import DashTableLoading from "@/Features/Dashboard/Shared/Component/Table/DashTableLoading";

const OrderTable = memo(
  ({ loading, errorMessage, orders = [], pagination, handlePageChange, handlePerPageChange, filters }) => {
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
            {loading && !errorMessage && (
              <DashTableLoading rows="15" columns={TABLE_ORDER_HEAD_COLUMNS.length} actionCountLoading={1} />
            )}
            {errorMessage && !loading && <DashTableError message={errorMessage} />}
            {!loading &&
              !errorMessage &&
              orders.map((order, index) => (
                <Fragment key={order.id}>
                  <TableRow>
                    <TableCell>{pagination.from + index}</TableCell>
                    <TableCell>
                      <p onClick={() => handleExpandedRow(order.id)} className="w-full cursor-pointer">
                        {order.order_no}
                      </p>
                    </TableCell>
                    <TableCell className="w-2/6 truncate">
                      <p
                        onClick={() => handleExpandedRow(order.id)}
                        className="w-full whitespace-normal cursor-pointer"
                      >
                        {order.customer_name}
                      </p>
                    </TableCell>
                    <TableCell>{order.table?.code}</TableCell>
                    <TableCell>{rupiah(order.total_amount)}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={order.payment?.method === "tunai" ? "warning" : "success"}>
                        {order.payment?.method}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center ">
                      <Badge
                        variant={
                          ORDER_STATUS_BADGE.find((status) => status.value === order.status)?.variant || "default"
                        }
                        className="capitalize"
                      >
                        {ORDER_STATUS_BADGE.find((status) => status.value === order.status)?.label || order.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="flex items-center justify-center h-full gap-2 text-center">
                      <Button size="icon" variant="outline" onClick={() => handleExpandedRow(order.id)}>
                        <Eye className="cursor-pointer text-foreground size-4" />
                      </Button>
                    </TableCell>
                  </TableRow>

                  <TableRow className="w-full ">
                    <TableCell colSpan={TABLE_ORDER_HEAD_COLUMNS.length} className="relative p-0">
                      <div
                        className={`grid transition-all duration-300 ease-out ${expandedRowId === order.id ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                      >
                        <div className="overflow-hidden ">
                          <div className="flex justify-between gap-4 p-4">
                            <div className="w-1/3 text-start">
                              <p className="font-medium text-foreground">Item Dipesan ({order.items.length}) :</p>
                              <ul className="list-disc ml-2 space-y-0.5">
                                {order.items.map((item) => (
                                  <li key={item.id}>
                                    <p className="w-full whitespace-normal line-clamp-6">
                                      {item.qty}x {item.menu.name}{" "}
                                      <span className="text-xs font-semibold">({rupiah(item.subtotal)})</span>
                                    </p>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <Separator orientation="vertical" className="w-px " />
                            <div className="w-1/3 text-start ">
                              <p className="font-medium text-foreground">Notes :</p>
                              <p className="w-full whitespace-normal line-clamp-6">
                                {order.notes || "Tidak ada catatan "}
                              </p>
                            </div>

                            <Separator orientation="vertical" className="w-px " />
                            <div className="w-1/3 space-y-2 text-start">
                              <div>
                                <p className="font-medium text-foreground">Tanggal Dibuat :</p>
                                <p>
                                  {order.created_at
                                    ? format(order.created_at, "dd MMM yyyy HH:mm")
                                    : "Tidak ada tanggal dibuat"}
                                </p>
                              </div>
                              <div>
                                <p className="font-medium text-foreground">Terakhir Diperbaharui :</p>
                                <p>
                                  {order.updated_at
                                    ? format(order.updated_at, "dd MMM yyyy HH:mm")
                                    : "Tidak ada tanggal diperbaharui"}
                                </p>
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

        <div className="flex">
          <div className="flex items-center gap-2">
            <p className="text-nowrap">Data per halaman</p>
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
export default OrderTable;
