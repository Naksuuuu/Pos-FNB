import { memo } from "react";
import { useNavigate } from "react-router";
import { CheckCircle2 } from "lucide-react";

import { ROUTES } from "@/Constants/RouteConstant";
import { rupiah } from "@/Utils/rupiahHelper";
import ActionCard from "@/Features/Customer/Shared/Components/Card/ActionCard";
import CustomerNavbar from "@/Features/Customer/Shared/Components/Navigation/CustomerNavbar";
import { Card, CardContent } from "@/Components/Elements/Shadcn/card";
import { Separator } from "@/Components/Elements/Shadcn/separator";
import { Badge } from "@/Components/Elements/Shadcn/badge";
import { Spinner } from "@/Components/Elements/Shadcn/spinner";
import useHistoryOrderDetail from "@/Features/Customer/Order/Hooks/useHistoryOrderDetail";

const OrderHistoryDetailPage = memo(() => {
  const navigate = useNavigate();
  const {
    order,
    items,
    taxAmount,
    displayIndex,
    loading,
    backLink,
    queryWithCode,
    handlePayWithMidtrans,
    isProcessingPayment,
    paymentStatus,
  } = useHistoryOrderDetail();

  if (loading) {
    return (
      <>
        <CustomerNavbar navbarTitle="Detail Pesanan" backLink={backLink} />
        <div className="flex-1 w-full flex justify-center items-center py-20">
          <Spinner className="size-8" />
        </div>
      </>
    );
  }

  if (!order) return null;

  const isNonTunai = order.isNonTunai;
  const isSettled = paymentStatus === "settlement" || order.isSettled;

  return (
    <>
      <CustomerNavbar navbarTitle="Detail Pesanan" backLink={backLink} />

      <div className="flex flex-col flex-1 gap-4 px-3 max-w-3xl pb-8 mx-auto w-full">
        <Card className="py-0 border-none shadow-md overflow-hidden">
          <CardContent className="px-4 py-5 space-y-4">
            <div className="flex flex-col items-center justify-center w-full py-2">
              <div
                className={`p-3 mb-2 rounded-full ${order.status === "canceled" ? "bg-destructive/10" : "bg-success/10"}`}
              >
                <CheckCircle2
                  className={`size-16 ${order.status === "canceled" ? "text-destructive" : "text-success"}`}
                />
              </div>
              <p className={`font-bold text-lg ${order.status === "canceled" ? "text-destructive" : "text-success"}`}>
                {order.status === "canceled" ? "Pesanan Dibatalkan" : "Pesanan Berhasil Dibuat"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Detail rincian riwayat transaksi Anda</p>
            </div>

            <Separator className="border-b border-dashed bg-transparent w-full my-1" />

            <div className="space-y-2.5 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Nomor Order</span>
                <span className="font-semibold text-foreground">
                  {order.orderNo}{" "}
                  <Badge variant="secondary" className="ml-1 font-semibold">
                    #{displayIndex}
                  </Badge>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Nomor Meja</span>
                <Badge variant="outline" className="font-semibold bg-background">
                  {order.tableCode}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Metode Pembayaran</span>
                <Badge variant="secondary" className="capitalize font-semibold">
                  {order.paymentMethod}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Nama Pelanggan</span>
                <span className="font-medium text-foreground">{order.customerName}</span>
              </div>
            </div>

            {/* Premium Kasir / Midtrans Alert Box */}
            {isNonTunai ? (
              isSettled ? (
                <div className="p-3.5 border rounded-lg border-emerald-500/20 bg-emerald-500/5 text-xs text-emerald-600 dark:text-emerald-400 leading-relaxed mt-2">
                  <p className="font-bold mb-1">Pembayaran Lunas:</p>
                  Pembayaran Non-Tunai Anda telah berhasil diproses. Pesanan sedang disiapkan dapur.
                </div>
              ) : (
                <div className="p-3.5 border rounded-lg border-primary/20 bg-primary/5 text-xs text-muted-foreground leading-relaxed mt-2">
                  <p className="font-bold text-primary mb-1">Metode Pembayaran Non-Tunai:</p>
                  Klik tombol <strong>"Bayar Sekarang"</strong> di bawah untuk membuka pop-up pembayaran Midtrans (QRIS / E-Wallet).
                </div>
              )
            ) : (
              <div className="p-3.5 border rounded-lg border-primary/20 bg-primary/5 text-xs text-muted-foreground leading-relaxed mt-2">
                <p className="font-bold text-primary mb-1">Langkah Selanjutnya:</p>
                Silakan lakukan pembayaran di kasir agar pesanan kamu dapat langsung diproses oleh dapur kami.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Section 2: Detailed Order Items & Tax Summary */}
        <Card className="py-0 border-none shadow-md overflow-hidden">
          <CardContent className="px-4 py-4 space-y-3">
            <div>
              <p className="font-semibold text-base mb-3">Rincian Menu</p>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id || item.menuId} className="flex items-center justify-between text-sm">
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">{item.name}</span>
                      <span className="text-muted-foreground text-xs">Qty: {item.qty}</span>
                    </div>
                    <span className="font-medium text-foreground">{rupiah(item.subtotal)}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="my-2 border-b border-dashed bg-transparent w-full" />

            {/* Price Breakdown */}
            <div className="space-y-2.5 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium text-foreground">{rupiah(order.subtotalAmount)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Pajak ({order.taxPercentage}%)</span>
                <span className="font-medium text-foreground">{rupiah(taxAmount)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Diskon</span>
                <span className="font-medium text-foreground">{rupiah(order.discountAmount)}</span>
              </div>
            </div>

            <Separator className="my-2 border-b border-dashed bg-transparent w-full" />

            {/* Dynamic Brand Primary Grand Total */}
            <div className="flex items-center justify-between font-bold text-sm">
              <span>Total Tagihan</span>
              <span className="text-primary text-base font-bold">{rupiah(order.totalAmount)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {isNonTunai && !isSettled ? (
        <ActionCard
          onActionClick={handlePayWithMidtrans}
          actionTitle={isProcessingPayment ? "Memuat Pembayaran..." : "Bayar Sekarang"}
          disabled={isProcessingPayment}
        />
      ) : (
        <ActionCard
          onActionClick={() => navigate(`${ROUTES.PUBLIC.ORDER_HISTORY}${queryWithCode}`)}
          actionTitle="Kembali"
        />
      )}
    </>
  );
});

OrderHistoryDetailPage.displayName = "OrderHistoryDetailPage";

export default OrderHistoryDetailPage;
