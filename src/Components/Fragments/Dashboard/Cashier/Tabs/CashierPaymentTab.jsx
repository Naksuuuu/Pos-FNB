import { CircleMinus, CirclePlus, Loader2 } from "lucide-react";
import { toast } from "sonner";

import useCashierPayment from "@/Hooks/Dashboard/Cashier/useCashierPayment";

import { rupiah } from "@/Utils/rupiahHelper";

import { Card } from "@/Components/Elements/Cards/Card";
import { Button } from "@/Components/Elements/Shadcn/button";
import { Input } from "@/Components/Elements/Inputs/Input";
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

    register,
    handleSubmit,
    errors,
    setCashAmount,

    paymentTotal,
    formattedCashAmount,
    changeAmount,
    defaultQuickCash,
    isCashEnough,

    canProcessPayment,
    loadingPayment,
    loadingUpdateStatus,
    loadSubmittedOrders,
    processPayment,
  } = useCashierPayment();

  const handleSubmitForm = async () => {
    try {
      const response = await processPayment();
      toast.success(response?.message || "Pembayaran berhasil diproses");
    } catch (error) {
      toast.error(error?.message || "Gagal memproses pembayaran");
    }
  };

  const handleRefresh = async () => {
    loadSubmittedOrders();
  };

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-3" style={{ height: `calc(100dvh - ${NAVBAR_HEIGHT}px)` }}>
      <Card className="flex flex-col h-full gap-8 overflow-hidden">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-base font-semibold">Pesanan Menunggu</p>
            <p className="text-sm text-muted-foreground">Hanya order dengan status submitted</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loadingSubmittedOrders}>
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
                  <Badge variant="info">Submitted</Badge>
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
        {!selectedOrder && <p className="py-16 text-center text-muted-foreground">Pilih pesanan untuk proses pembayaran.</p>}

        {selectedOrder && (
          <>
            <div className="flex flex-col flex-1 gap-4 overflow-y-hidden ">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3 ">
                <div>
                  <p className="text-sm text-muted-foreground">Pelanggan</p>
                  <p className="text-lg font-semibold">{selectedOrder.customer_name || "Pelanggan"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">No. Antrian</p>
                  <p className="text-lg font-semibold">{selectedOrder.order_no || "-"}</p>
                </div>
                <div className="text-end">
                  <p className="text-sm text-muted-foreground ">Meja</p>
                  <p className="text-lg font-semibold">{selectedOrder.table?.code || "Take Away"}</p>
                </div>
              </div>

              <div className="space-y-4 overflow-y-auto no-scrollbar">
                {selectedOrder.items?.map((item) => (
                  <div key={item.id} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <p>
                        {item.qty}x {item.menu?.name}
                      </p>
                      <p className="font-medium">{rupiah(item.subtotal || 0)}</p>
                    </div>
                    <Separator className="w-full bg-transparent border-b border-dashed" />
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit(handleSubmitForm)} className="w-full space-y-4 ">
              <div className="space-y-1 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Tagihan</span>
                  <span className="text-lg font-semibold text-primary">{rupiah(paymentTotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Metode Pembayaran</span>
                  <Badge variant="secondary">Cash</Badge>
                </div>
              </div>

              <Field>
                <Label htmlFor="cash_amount">Uang Diterima</Label>
                <Input
                  id="cash_amount"
                  firstAddon="Rp"
                  placeholder="Masukkan uang diterima"
                  inputMode="numeric"
                  {...register("cash_amount")}
                  value={formattedCashAmount}
                  onChange={(e) => setCashAmount(e.target.value)}
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

              <Button type="submit" disabled={!canProcessPayment} className="w-full">
                {loadingPayment || loadingUpdateStatus ? <Loader2 className="animate-spin" /> : null}
                Konfirmasi Pembayaran
              </Button>
            </form>
          </>
        )}
      </Card>
    </div>
  );
};

export default CashierPaymentTab;
