import { useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

import { Button } from "@/Components/Elements/Shadcn/button";
import { rupiah } from "@/Utils/rupiahHelper";
import ActionCard from "@/Components/Fragments/Customer/Common/Card/ActionCard";

const PaymentPage = () => {
  const navigate = useNavigate();

  const storedOrder = useMemo(() => {
    try {
      return JSON.parse(sessionStorage.getItem("orderResult") || "null");
    } catch (error) {
      console.error("Gagal membaca orderResult", error);
      return null;
    }
  }, []);

  console.log("Stored Order:", storedOrder);

  const order = storedOrder?.order || storedOrder?.data?.order || storedOrder || null;
  const items = order?.items || [];
  const totalAmount = order?.total_amount ?? items.reduce((acc, item) => acc + (item.subtotal || 0), 0);

  useEffect(() => {
    if (!order) {
      navigate("/catalog");
    }
  }, [navigate, order]);

  if (!order) return null;

  return (
    <div className="flex flex-col justify-between w-full min-h-screen gap-4">
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="flex items-center px-4 h-14">
          <Button
            variant="ghost"
            size="default"
            className="border rounded-full border-slate-200"
            nativeButton={false}
            render={(props) => (
              <Link {...props} to="/catalog">
                <ArrowLeft />
              </Link>
            )}
          />
          <h2 className="flex-1 text-lg font-semibold tracking-wide text-center uppercase">Pembayaran</h2>
          <div className="w-10" />
        </div>
      </header>

      <div className="flex flex-col flex-1 gap-4 px-2">
        <div className="p-4 border rounded-lg shadow-sm">
          <div className="flex items-center gap-2 text-emerald-700">
            <CheckCircle2 className="size-5" />
            <p className="font-semibold">Pesanan berhasil dibuat</p>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">Nomor Order: {order.order_no || "-"}</p>
          <p className="text-sm text-muted-foreground">Meja: {order.table?.code || "VIP2"}</p>
        </div>

        <div className="p-4 space-y-3 border rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <p className="font-semibold">Konfirmasi Pembayaran</p>
          </div>
          <p className="text-sm text-muted-foreground">Silahkan konfirmasi pembayaran di kasir. Agar pesanan kamu diproses dengan benar.</p>
        </div>

        <div className="p-4 space-y-3 border rounded-lg shadow-sm">
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
          <div className="flex items-center justify-between pt-3 font-semibold border-t">
            <span>Total</span>
            <span>{rupiah(totalAmount)}</span>
          </div>
        </div>
      </div>

      <ActionCard onActionClick={() => navigate("/catalog")} actionTitle="Selesai" />
    </div>
  );
};

export default PaymentPage;
