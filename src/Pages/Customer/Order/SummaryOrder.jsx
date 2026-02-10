import { useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Minus, Pen, Plus } from "lucide-react";

import { rupiah } from "@/Utils/rupiahHelper";

import { Button } from "@/Components/Elements/Shadcn/Button/button";
import ActionCard from "@/Components/Fragments/Customer/Common/Card/ActionCard";

const SummaryOrder = () => {
  const navigate = useNavigate();
  const orderItems = JSON.parse(sessionStorage.getItem("orderItems") || "[]");

  const totalPrice = useMemo(() => orderItems.reduce((acc, item) => acc + item.harga, 0), [orderItems]);

  const handleCheckout = useCallback(() => {
    navigate("/payment");
  }, [navigate]);

  return (
    <div className="flex w-full min-h-screen flex-col gap-4">
      <nav className="flex h-16 items-center w-full shadow-lg">
        <div className="relative w-full h-fit flex justify-center items-center">
          <div className="absolute left-5">
            <Link to={"/menu"}>
              <ArrowLeft />
            </Link>
          </div>
          <h2 className="text-lg uppercase font-semibold">Order</h2>
        </div>
      </nav>

      <div className="px-3">
        <div className="py-4 border-b flex justify-between items-center">
          <h4 className="text-md font-semibold">Ringkasan Pesanan ({orderItems.length})</h4>
          <Button variant="outline" size="sm" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
            <Plus className="size-3" /> <Link to={"/menu"}>Tambah Lagi</Link>
          </Button>
        </div>
        {orderItems.map((item, index) => (
          <div key={index} className="border-b py-4 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-md font-semibold">{item.name}</h4>
              <Button
                variant="outline"
                size="xs"
                className="px-3! border-emerald-600 text-emerald-600 hover:bg-emerald-50"
              >
                <Pen className="size-3" /> <Link to={"/menu"}>Edit</Link>
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-muted-foreground">{rupiah(item.harga)}</p>
              <div className="flex items-center gap-4">
                <Button size="icon" className="rounded-full size-6" variant="outline">
                  <Minus />
                </Button>
                1
                <Button size="icon" className="rounded-full size-6" variant="outline">
                  <Plus />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ActionCard onActionClick={handleCheckout} actionTitle="Lanjut ke Pembayaran">
        <p>Total Pembayaran</p>
        <div className="flex items-center gap-4">
          <h4 className="text-md font-semibold">{rupiah(totalPrice)}</h4>
        </div>
      </ActionCard>
    </div>
  );
};

export default SummaryOrder;
