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
    subtotal,
    taxPercentage,
    taxAmount,
    grandTotal,
    displayIndex,
    loading,
    backLink,
    queryWithCode,
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

  return (
    <>
      <CustomerNavbar navbarTitle="Detail Pesanan" backLink={backLink} />

      <div className="flex flex-col flex-1 gap-4 px-3 max-w-3xl pb-8 mx-auto w-full">
        {/* Section 1: Success Banner & Order Meta */}
        <Card className="py-0 border-none shadow-md overflow-hidden">
          <CardContent className="px-4 py-5 space-y-4">
            <div className="flex flex-col items-center justify-center w-full py-2">
              <div
                className={`p-3 mb-2 rounded-full ${order?.status === "canceled" ? "bg-destructive/10" : "bg-success/10"}`}
              >
                <CheckCircle2
                  className={`size-16 ${order?.status === "canceled" ? "text-destructive" : "text-success"}`}
                />
              </div>
              <p className={`font-bold text-lg ${order?.status === "canceled" ? "text-destructive" : "text-success"}`}>
                {order?.status === "canceled" ? "Pesanan Dibatalkan" : "Pesanan Berhasil Dibuat"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Detail rincian riwayat transaksi Anda</p>
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
                <span className="font-medium text-foreground">{rupiah(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Pajak ({taxPercentage}%)</span>
                <span className="font-medium text-foreground">{rupiah(taxAmount)}</span>
              </div>
            </div>

            <Separator className="my-2 border-b border-dashed bg-transparent w-full" />

            {/* Grand Total */}
            <div className="flex items-center justify-between font-bold text-sm">
              <span>Total Tagihan</span>
              <span className="text-primary text-base font-bold">{rupiah(grandTotal)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <ActionCard
        onActionClick={() => navigate(`${ROUTES.PUBLIC.ORDER_HISTORY}${queryWithCode}`)}
        actionTitle="Kembali"
      />
    </>
  );
});

OrderHistoryDetailPage.displayName = "OrderHistoryDetailPage";

export default OrderHistoryDetailPage;
