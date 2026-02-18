import { useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Minus, Pen, Plus } from "lucide-react";

import { rupiah } from "@/Utils/rupiahHelper";

import { Button } from "@/Components/Elements/Shadcn/button";
import ActionCard from "@/Components/Fragments/Customer/Common/Card/ActionCard";
import useAllOrder from "@/Hooks/Customer/Order/useAllOrder";
import { FieldGroup, FieldSet, Field, FieldLabel } from "@/Components/Elements/Shadcn/field";
import { Input } from "@/Components/Elements/Shadcn/input";

const SummaryOrder = () => {
  const navigate = useNavigate();
  const { orderItems, totalPrice, chekout } = useAllOrder();

  const handleCheckout = useCallback(
    (orderData) => {
      chekout(orderData);
    },
    [chekout],
  );

  return (
    <div className="flex w-full min-h-screen flex-col gap-4">
      <nav className="flex h-16 items-center w-full shadow-lg">
        <div className="relative w-full h-fit flex justify-center items-center">
          <div className="absolute left-5">
            <Link to={"/catalog"}>
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
            <Plus className="size-3" /> <Link to={"/catalog"}>Tambah Lagi</Link>
          </Button>
        </div>
        {orderItems.map((item, index) => (
          <div key={index} className="border-b py-4 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-md font-semibold">{item.name}</h4>
              <Button variant="outline" size="xs" className="px-3! border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                <Pen className="size-3" /> <Link to={"/catalog"}>Edit</Link>
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-muted-foreground">{rupiah(item.price)}</p>
              <div className="flex items-center gap-4">
                <Button size="icon" className="rounded-full size-6" variant="outline">
                  <Minus />
                </Button>
                {item.qty}
                <Button size="icon" className="rounded-full size-6" variant="outline">
                  <Plus />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="px-1">
        <Field>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="customer_name">Nama</FieldLabel>
                <Input id="customer_name" name="customer_name" autoComplete="off" aria-invalid={false} />
              </Field>
            </FieldGroup>
          </FieldSet>
        </Field>
      </div>

      <ActionCard onActionClick={() => handleCheckout(orderItems)} actionTitle="Lanjut ke Pembayaran">
        <p>Total Pembayaran</p>
        <div className="flex items-center gap-4">
          <h4 className="text-md font-semibold">{rupiah(totalPrice)}</h4>
        </div>
      </ActionCard>
    </div>
  );
};

export default SummaryOrder;
