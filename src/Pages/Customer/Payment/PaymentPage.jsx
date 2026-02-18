import { useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

import { Button } from "@/Components/Elements/Shadcn/button";
import { rupiah } from "@/Utils/rupiahHelper";

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
    <div className="flex w-full min-h-screen flex-col gap-4 px-4 py-6">
      <nav className="flex h-14 items-center w-full">
        <div className="flex items-center gap-3">
          <Link to="/catalog" className="inline-flex items-center justify-center rounded-full border p-2 hover:bg-accent">
            <ArrowLeft className="size-4" />
          </Link>
          <h2 className="text-lg font-semibold">Pembayaran</h2>
        </div>
      </nav>

      <div className="rounded-lg border p-4 shadow-sm">
        <div className="flex items-center gap-2 text-emerald-700">
          <CheckCircle2 className="size-5" />
          <p className="font-semibold">Pesanan berhasil dibuat</p>
        </div>
        <p className="text-sm text-muted-foreground mt-1">Nomor Order: {order.order_no || "-"}</p>
        <p className="text-sm text-muted-foreground">Meja: {order.table?.code || "VIP2"}</p>
      </div>

      <div className="rounded-lg border p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <p className="font-semibold">Metode Pembayaran</p>
          <BadgeLabel>Cash</BadgeLabel>
        </div>
        <p className="text-sm text-muted-foreground">Saat ini hanya pembayaran tunai yang tersedia.</p>
      </div>

      <div className="rounded-lg border p-4 shadow-sm space-y-3">
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
        <div className="flex items-center justify-between border-t pt-3 font-semibold">
          <span>Total</span>
          <span>{rupiah(totalAmount)}</span>
        </div>
      </div>

      <Button variant="default" size="lg" className="w-full" onClick={() => navigate("/catalog")}>
        Selesai (Cash)
      </Button>
    </div>
  );
};

const BadgeLabel = ({ children }) => <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">{children}</span>;

export default PaymentPage;
