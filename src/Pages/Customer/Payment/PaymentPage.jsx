import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { CheckCircle2 } from "lucide-react";

import { ROUTES } from "@/Constants/Common/RouteConstant";

import { rupiah } from "@/Utils/rupiahHelper";

import ActionCard from "@/Components/Fragments/Customer/Common/Card/ActionCard";
import CustomerNavbar from "@/Components/Fragments/Customer/Common/Navigation/CustomerNavbar";
import { Card, CardContent } from "@/Components/Elements/Shadcn/card";

const PaymentPage = () => {
  const navigate = useNavigate();

  const storedOrder = useMemo(() => {
    return JSON.parse(sessionStorage.getItem("orderResult") || "null");
  }, []);

  const order = storedOrder?.order || storedOrder?.data?.order || storedOrder || null;
  const items = order?.items || [];
  const totalAmount = order?.total_amount ?? items.reduce((acc, item) => acc + (item.subtotal || 0), 0);

  useEffect(() => {
    if (!order) {
      navigate(ROUTES.PUBLIC.CATALOG);
    }
  }, [navigate, order]);

  if (!order) return null;

  return (
    <>
      <CustomerNavbar navbarTitle="Pembayaran" backLink={ROUTES.PUBLIC.CATALOG} />

      <div className="flex flex-col flex-1 gap-4 px-2">
        <Card className="py-4">
          <CardContent className="px-4">
            <div className="flex flex-col items-center justify-center w-full text-success">
              <CheckCircle2 className="size-20" />
              <p className="font-semibold">Pesanan berhasil dibuat</p>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">Nomor Order: {order.order_no || "-"}</p>
            <p className="text-sm text-muted-foreground">Meja: {order.table?.code || "VIP2"}</p>
            <p className="font-semibold">Konfirmasi Pembayaran</p>
            <p className="text-sm text-muted-foreground">
              Silahkan konfirmasi pembayaran di kasir. Agar pesanan kamu diproses dengan benar.
            </p>
          </CardContent>
        </Card>

        <Card className="py-4 space-y-3 border rounded-lg shadow-sm">
          <CardContent className="px-4">
            <div className="pb-3">
              <p className="font-semibold">Rincian Pesanan</p>
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id || item.menu_id} className="flex items-center justify-between text-sm">
                    <div className="flex flex-col">
                      <span className="font-medium">{item.menu?.name || item.name || "Menu"}</span>
                      <span className="text-muted-foreground">Qty: {item.qty}</span>
                    </div>
                    <span className="font-semibold">{rupiah(item.subtotal || item.price || 0)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 font-semibold border-t">
              <span>Total</span>
              <span>{rupiah(totalAmount)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <ActionCard onActionClick={() => navigate(ROUTES.PUBLIC.CATALOG)} actionTitle="Selesai" />
    </>
  );
};

export default PaymentPage;
