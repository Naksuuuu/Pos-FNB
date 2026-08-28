import { Fragment, memo, useCallback, useState } from "react";
import { Eye, Printer } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

import { rupiah } from "@/Utils/rupiahHelper";
import { buildReceiptBytes } from "@/Utils/ReceiptFormatter";
import { useBluetoothPrinter } from "@/Features/Shared/Context/BluetoothPrinterContext";
import useTenant from "@/Features/Shared/Hooks/useTenant";

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
    const { isConnected, printRaw } = useBluetoothPrinter();
    const { tenant } = useTenant();

    const handleExpandedRow = useCallback((id) => {
      setExpandedRowId((prevId) => (prevId === id ? null : id));
    }, []);

    const handlePrintStruk = async (e, order) => {
      e.stopPropagation();
      if (!isConnected) {
        toast.error("Printer bluetooth belum terhubung. Hubungkan printer di navbar.");
        return;
      }
      try {
        const bytes = buildReceiptBytes({
          order,
          tenant,
          paymentMethod: order.payment?.method || "tunai",
          parsedCashAmount: Number(order.payment?.payment_amount || order.payment?.amount || order.total_amount || 0),
          changeAmount: Number(order.payment?.amount_change || 0),
        });
        const success = await printRaw(bytes);
        if (success) {
          toast.success("Struk berhasil dicetak");
        }
      } catch (err) {
        toast.error(`Gagal mencetak struk: ${err.message}`);
      }
    };

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
                    <TableCell>
                      {order.created_at ? format(new Date(order.created_at), "dd MMM yyyy HH:mm") : "-"}
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
                      <Button
                        size="icon"
                        variant="outline"
                        disabled={order.status === "canceled" || order.status === "submitted"}
                        onClick={(e) => handlePrintStruk(e, order)}
                      >
                        <Printer className="cursor-pointer text-foreground size-4" />
                      </Button>
                    </TableCell>
                  </TableRow>

                  <TableRow className="w-full">
                    <TableCell colSpan={TABLE_ORDER_HEAD_COLUMNS.length} className="relative p-0 bg-muted/5">
                      <div
                        className={`grid transition-all duration-300 ease-out ${expandedRowId === order.id ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                      >
                        <div className="overflow-hidden">
                          <div className="flex flex-col gap-4 p-5">
                            <div className="flex justify-between text-sm bg-background p-4 rounded-lg border">
                              <div>
                                <p className="font-semibold text-muted-foreground">Total Item</p>
                                <p className="text-foreground font-semibold mt-1">
                                  {order.items.reduce((sum, item) => sum + item.qty, 0)}
                                </p>
                              </div>
                              <div>
                                <p className="font-semibold text-muted-foreground">Catatan</p>
                                <p
                                  className="text-foreground font-medium mt-1 truncate"
                                  title={order.notes || "Tidak ada catatan"}
                                >
                                  {order.notes || "-"}
                                </p>
                              </div>
                              <div>
                                <p className="font-semibold text-muted-foreground">Subtotal</p>
                                <p className="text-foreground font-semibold mt-1">{rupiah(order.subtotal_amount)}</p>
                              </div>
                              <div>
                                <p className="font-semibold text-muted-foreground">Pajak</p>
                                <p className="text-foreground font-semibold mt-1">
                                  {Number(order.tax_percentage) > 0 ? `${Number(order.tax_percentage)}%` : "-"}
                                </p>
                              </div>
                              <div>
                                <p className="font-semibold text-muted-foreground">Diskon</p>
                                <p className="text-destructive font-semibold mt-1">
                                  {Number(order.discount_amount) > 0 ? `-${rupiah(order.discount_amount)}` : "-"}
                                </p>
                              </div>
                              <div>
                                <p className="font-semibold text-muted-foreground">Dibayar</p>
                                <p
                                  className={`font-bold mt-1 ${order.payment.payment_amount == 0 ? `text-destructive` : `text-emerald-600`}`}
                                >
                                  {order.payment.payment_amount == 0
                                    ? "Belum Bayar"
                                    : rupiah(order.payment.payment_amount)}
                                </p>
                              </div>
                              <div>
                                <p className="font-semibold text-muted-foreground">Kembalian</p>
                                <p className="text-emerald-600 font-bold mt-1">{rupiah(order.payment.amount_change)}</p>
                              </div>
                            </div>

                            {/* Nested Ordered Items Table */}
                            <div className="border rounded-lg overflow-hidden bg-background">
                              <Table>
                                <TableHeader className="bg-muted/40">
                                  <TableRow>
                                    <TableHead className="font-semibold">Item Detail</TableHead>
                                    <TableHead className="font-semibold text-center w-24">Kuantitas</TableHead>
                                    <TableHead className="font-semibold text-right w-36">Harga Satuan</TableHead>
                                    <TableHead className="font-semibold text-right w-36">Subtotal</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {order.items.map((item) => {
                                    const qty = Number(item.qty || 1);
                                    const customs = item.customs || [];
                                    const totalCustomsUnitPrice = customs.reduce(
                                      (sum, c) => sum + Number(c.price || 0),
                                      0,
                                    );
                                    const totalCustomsSubtotal = totalCustomsUnitPrice * qty;
                                    const baseUnitPrice =
                                      item.menu?.price != null
                                        ? Number(item.menu.price)
                                        : Math.max(Number(item.price || 0) - totalCustomsUnitPrice, 0);
                                    const baseSubtotal = baseUnitPrice * qty;
                                    // const totalItemSubtotal = Number(
                                    //   item.subtotal || baseSubtotal + totalCustomsSubtotal,
                                    // );

                                    return (
                                      <TableRow key={item.id} className="hover:bg-muted/10">
                                        <TableCell className="font-medium text-foreground">
                                          <div>
                                            <p className="font-semibold">{item.menu?.name || "Item Tidak Diketahui"}</p>
                                            {customs.length > 0 && (
                                              <div className="flex flex-wrap gap-1 mt-1.5">
                                                {customs.map((c, cIdx) => (
                                                  <span
                                                    key={c.id || `${c.custom_name}-${cIdx}`}
                                                    className="inline-flex items-center text-xs text-muted-foreground bg-muted/60 px-2 py-0.5 rounded border border-border/60"
                                                  >
                                                    + {c.custom_name || c.name} ({rupiah(Number(c.price || 0))} x {qty}{" "}
                                                    = {rupiah(Number(c.price || 0) * qty)})
                                                  </span>
                                                ))}
                                              </div>
                                            )}
                                          </div>
                                        </TableCell>
                                        <TableCell className="text-center">{qty}</TableCell>
                                        <TableCell className="text-right">
                                          <p className="font-medium">{rupiah(baseUnitPrice)}</p>
                                          {totalCustomsUnitPrice > 0 && (
                                            <p className="text-[11px] text-muted-foreground">
                                              + {rupiah(totalCustomsUnitPrice)}
                                            </p>
                                          )}
                                        </TableCell>
                                        <TableCell className="text-right font-medium text-foreground">
                                          <p className="font-semibold">{rupiah(baseSubtotal)}</p>
                                          {totalCustomsSubtotal > 0 && (
                                            <p className="text-[11px] text-muted-foreground">
                                              + {rupiah(totalCustomsSubtotal)}
                                            </p>
                                          )}
                                        </TableCell>
                                      </TableRow>
                                    );
                                  })}
                                </TableBody>
                              </Table>
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
