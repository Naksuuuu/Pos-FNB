import { CircleMinus, CirclePlus, Loader2, AlertTriangle, Printer } from "lucide-react";

import useCashierPayment from "@/Features/Dashboard/Cashier/Hooks/useCashierPayment";
import DashModalConfirmation from "@/Features/Dashboard/Shared/Component/Modal/DashModalConfirmation";

import { rupiah } from "@/Utils/rupiahHelper";

import { Card } from "@/Components/Elements/Cards/Card";
import { Button } from "@/Components/Elements/Shadcn/button";
import { Input, InputRupiah } from "@/Components/Elements/Inputs/Input";
import { Badge } from "@/Components/Elements/Shadcn/badge";
import { Separator } from "@/Components/Elements/Shadcn/separator";
import { Field, FieldError } from "@/Components/Elements/Shadcn/field";
import { Label } from "@/Components/Elements/Shadcn/label";

const NAVBAR_HEIGHT = 105;

const CashierPaymentTab = () => {
  const {
    submittedOrders,
    loadingSubmittedOrders,
    selectedOrder,
    setSelectedOrderId,

    handleSubmit,
    errors,
    control,
    setCashAmount,

    paymentTotal,
    orderSubtotal,
    taxAmount,
    taxPercentage,
    changeAmount,
    defaultQuickCash,
    isCashEnough,

    paymentMethod,
    setPaymentMethod,

    canProcessPayment,
    loadingPayment,
    loadingCancel,
    refreshSubmittedOrders,
    isRefreshing,

    // Modal and print values
    isOpenPrintModal,
    setIsOpenPrintModal,
    isOpenCancelModal,
    setIsOpenCancelModal,
    handleConfirmPrint,
    handleSubmitForm,
    handleCancel,
    handleConfirmCancel,
  } = useCashierPayment();

  const handleRefresh = async () => {
    refreshSubmittedOrders();
  };

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-3" style={{ height: `calc(100dvh - ${NAVBAR_HEIGHT}px)` }}>
      <Card className="flex flex-col h-full gap-8 overflow-hidden">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-base font-semibold">Pesanan Menunggu</p>
            <p className="text-sm text-muted-foreground">Hanya order dengan status submitted</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loadingSubmittedOrders || isRefreshing}>
            {isRefreshing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Refresh
          </Button>
        </div>

        {loadingSubmittedOrders && (
          <div className="flex items-center justify-center h-full p-4 text-sm text-center border border-dashed rounded-lg text-destructive">
            <p>Loading...</p>
          </div>
        )}
        {!loadingSubmittedOrders && submittedOrders.length === 0 && (
          <div className="flex items-center justify-center h-full p-4 text-sm text-center border border-dashed rounded-lg text-destructive">
            <p>Semua Pesanan Sudah Diproses.</p>
          </div>
        )}

        {!loadingSubmittedOrders && (
          <div className="flex-1 min-h-0 space-y-3 overflow-y-scroll no-scrollbar">
            {submittedOrders.map((order) => (
              <button
                type="button"
                key={order.id}
                onClick={() => setSelectedOrderId(order.id)}
                className={`w-full rounded-lg border p-3 text-left transition ${selectedOrder?.id === order.id ? "border-primary bg-primary/10" : "border-border hover:bg-input/20"}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold">{order.order_no || order.code}</p>
                  <Badge
                    variant={
                      order.status === "submitted" ? "info" : order.status === "canceled" ? "destructive" : "secondary"
                    }
                  >
                    {order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : "Submitted"}
                  </Badge>
                </div>
                <p className="text-sm">{order.customer_name || "Pelanggan"}</p>
                <p className="text-xs text-muted-foreground">
                  {order.items?.length || 0} item • {rupiah(order.total_amount || 0)}
                </p>
              </button>
            ))}
          </div>
        )}
      </Card>

      <Card className="flex flex-col h-full gap-4 overflow-hidden " outerClassName="xl:col-span-2">
        {!selectedOrder && (
          <p className="py-16 text-center text-muted-foreground">Pilih pesanan untuk proses pembayaran.</p>
        )}

        {selectedOrder && (
          <>
            <div className="flex flex-col flex-1 gap-4 overflow-y-hidden ">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-4 ">
                <div>
                  <p className="text-sm text-muted-foreground">Pelanggan</p>
                  <p className="text-lg font-semibold">{selectedOrder.customer_name || "Pelanggan"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">No. Antrian</p>
                  <p className="text-lg font-semibold">{selectedOrder.order_no || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tipe Pesanan</p>
                  <p className="text-lg font-semibold">{selectedOrder.table_code ? "DINE_IN" : "TAKE_AWAY"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground ">Meja</p>
                  <p className="text-lg font-semibold">{selectedOrder.table_code || "-"}</p>
                </div>
              </div>

              <div className="space-y-4 overflow-y-auto no-scrollbar">
                {selectedOrder.items?.map((item) => (
                  <div key={item.id} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex flex-col">
                        <p className="font-bold text-md">
                          {item.qty}x {item.menu?.name} {item.menu?.price && `(${rupiah(item.menu.price)})`}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.customs?.map((custom) => (
                            <span key={custom.id} className="ml-2">
                              + {custom.custom_name} ({rupiah(custom.price || 0)}){" "}
                            </span>
                          ))}
                        </p>
                      </div>
                      <p className="font-medium">{rupiah(item.subtotal || 0)}</p>
                    </div>
                    <Separator className="w-full bg-transparent border-b border-dashed" />
                  </div>
                ))}
              </div>
            </div>
            <form onSubmit={handleSubmit(handleSubmitForm)} className="w-full space-y-4 ">
              <div className="space-y-1.5 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium text-foreground">{rupiah(orderSubtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Pajak ({taxPercentage}%)</span>
                  <span>{rupiah(taxAmount)}</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-dashed">
                  <span className="font-semibold text-muted-foreground">Total Tagihan</span>
                  <span className="text-lg font-semibold text-primary">{rupiah(paymentTotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Metode Pembayaran</span>
                  <div className="inline-flex p-0.5 border rounded-lg border-border bg-input/20">
                    <Button
                      type="button"
                      variant={paymentMethod === "tunai" ? "default" : "ghost"}
                      size="sm"
                      className="h-8 px-3 rounded-md text-xs cursor-pointer"
                      onClick={() => setPaymentMethod("tunai")}
                    >
                      Tunai
                    </Button>
                    <Button
                      type="button"
                      variant={paymentMethod === "nontunai" ? "default" : "ghost"}
                      size="sm"
                      className="h-8 px-3 rounded-md text-xs cursor-pointer"
                      onClick={() => setPaymentMethod("nontunai")}
                    >
                      Non-Tunai
                    </Button>
                  </div>
                </div>
              </div>

              <Field>
                <Label htmlFor="cash_amount">Uang Diterima</Label>
                <InputRupiah
                  id="cash_amount"
                  name="cash_amount"
                  control={control}
                  placeholder="Masukkan uang diterima"
                />
                {errors.cash_amount && <FieldError>{errors.cash_amount.message}</FieldError>}
              </Field>

              <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                {defaultQuickCash.map((amount) => (
                  <Button key={amount} type="button" variant="outline" onClick={() => setCashAmount(String(amount))}>
                    {rupiah(amount)}
                  </Button>
                ))}
                <Button type="button" variant="outline" onClick={() => setCashAmount(String(paymentTotal))}>
                  Uang Pas
                </Button>
              </div>

              <div className="p-3 border rounded-lg border-border bg-input/15">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm text-muted-foreground">Kembalian</span>
                  <span className="text-lg font-semibold text-success">{rupiah(changeAmount)}</span>
                </div>
                {!isCashEnough && (
                  <div className="inline-flex items-center gap-1 mt-2 text-xs text-destructive">
                    <CircleMinus className="size-3" />
                    Uang diterima masih kurang
                  </div>
                )}
                {isCashEnough && (
                  <div className="inline-flex items-center gap-1 mt-2 text-xs text-success">
                    <CirclePlus className="size-3" />
                    Siap diproses
                  </div>
                )}
              </div>

              <div className="flex gap-2 w-full">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleCancel}
                  disabled={loadingPayment || loadingCancel}
                  className="flex-1 cursor-pointer"
                >
                  {loadingCancel ? <Loader2 className="animate-spin mr-1" /> : null}
                  Batalkan Pesanan
                </Button>
                <Button
                  type="submit"
                  disabled={!canProcessPayment || loadingPayment || loadingCancel}
                  className="flex-1 cursor-pointer"
                >
                  {loadingPayment ? <Loader2 className="animate-spin mr-1" /> : null}
                  Konfirmasi Pembayaran
                </Button>
              </div>
            </form>
          </>
        )}
      </Card>

      <DashModalConfirmation
        isOpen={isOpenCancelModal}
        title="Batalkan Pesanan?"
        description={`Apakah Anda yakin ingin membatalkan pesanan ${selectedOrder?.order_no || selectedOrder?.code || "ini"}? Aksi ini tidak dapat dibatalkan.`}
        onOpenModal={() => setIsOpenCancelModal(false)}
        loading={loadingCancel}
        handleDelete={handleConfirmCancel}
        id={selectedOrder?.id}
        icon={AlertTriangle}
        confirmLabel="Batalkan Pesanan"
        variant="destructive"
      />

      <DashModalConfirmation
        isOpen={isOpenPrintModal}
        title="Cetak Struk Pembayaran?"
        description="Apakah Anda ingin mencetak struk untuk transaksi pembayaran ini?"
        onOpenModal={() => setIsOpenPrintModal(false)}
        handleDelete={handleConfirmPrint}
        icon={Printer}
        confirmLabel="Cetak Struk"
        variant="default"
      />
    </div>
  );
};

export default CashierPaymentTab;
