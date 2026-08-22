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
import usePaymentDetails from "@/Features/Customer/Payment/Hooks/usePaymentDetails";

const PaymentPage = memo(() => {
  const navigate = useNavigate();
  const { order, items, taxAmount, displayIndex, backLink } = usePaymentDetails();

  if (!order) return null;

  return (
    <>
      <CustomerNavbar navbarTitle="Pembayaran" backLink={backLink} />

      <div className="flex flex-col flex-1 gap-4 px-3 max-w-3xl pb-8 mx-auto w-full">
        {/* Section 1: Success Banner & Order Meta */}
        <Card className="py-0 border-none shadow-md overflow-hidden">
          <CardContent className="px-4 py-5 space-y-4">
            <div className="flex flex-col items-center justify-center w-full text-success py-2">
              <div className="p-3 bg-success/10 rounded-full mb-2 animate-pulse">
                <CheckCircle2 className="size-16" />
              </div>
              <p className="font-bold text-lg text-success">Pesanan Berhasil Dibuat</p>
              <p className="text-xs text-muted-foreground mt-1">Terima kasih atas pesanan Anda</p>
            </div>

            <Separator className="border-b border-dashed bg-transparent w-full my-1" />

            {/* Structured Order Metadata */}
            <div className="space-y-2.5 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Nomor Order</span>
                <span className="font-semibold text-foreground">
                  {order.order_no || "-"}{" "}
                  <Badge variant="secondary" className="ml-1 font-semibold">
                    #{displayIndex}
                  </Badge>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Nomor Meja</span>
                <Badge variant="outline" className="font-semibold bg-background">
                  {order.table?.code || "Take Away"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Nama Pelanggan</span>
                <span className="font-medium text-foreground">{order.customer_name || "Pelanggan"}</span>
              </div>
            </div>

            {/* Premium Kasir Alert Box */}
            <div className="p-3.5 border rounded-lg border-primary/20 bg-primary/5 text-xs text-muted-foreground leading-relaxed mt-2">
              <p className="font-bold text-primary mb-1">Langkah Selanjutnya:</p>
              Silakan lakukan pembayaran di kasir agar pesanan kamu dapat langsung diproses oleh dapur kami.
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Detailed Order Items & Tax Summary */}
        <Card className="py-0 border-none shadow-md overflow-hidden">
          <CardContent className="px-4 py-4 space-y-3">
            <div>
              <p className="font-semibold text-base mb-3">Rincian Menu</p>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id || item.menu_id} className="flex items-center justify-between text-sm">
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">{item.menu?.name || item.name || "Menu"}</span>
                      <span className="text-muted-foreground text-xs">Qty: {item.qty}</span>
                    </div>
                    <span className="font-medium text-foreground">{rupiah(item.subtotal || item.price || 0)}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="my-2 border-b border-dashed bg-transparent w-full" />

            {/* Price Breakdown */}
            <div className="space-y-2.5 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium text-foreground">{rupiah(order.subtotal_amount)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Pajak ({order.tax_percentage}%)</span>
                <span className="font-medium text-foreground">{rupiah(taxAmount)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  {order.reward_redeem?.reward
                    ? `Diskon (${order.reward_redeem.reward.discount_percentage}%)`
                    : "Diskon"}
                </span>
                <span className="font-medium text-foreground">{rupiah(order.discount_amount)}</span>
              </div>
            </div>

            <Separator className="my-2 border-b border-dashed bg-transparent w-full" />

            {/* Dynamic Brand Primary Grand Total */}
            <div className="flex items-center justify-between font-bold text-sm">
              <span>Total Tagihan</span>
              <span className="text-primary text-base font-bold">{rupiah(order.total_amount)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <ActionCard onActionClick={() => navigate(ROUTES.PUBLIC.CATALOG)} actionTitle="Selesai" />
    </>
  );
});

PaymentPage.displayName = "PaymentPage";

export default PaymentPage;
