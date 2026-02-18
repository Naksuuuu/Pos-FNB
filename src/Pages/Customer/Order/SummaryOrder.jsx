import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Minus, Pen, Plus } from "lucide-react";
import { useForm } from "react-hook-form";

import { rupiah } from "@/Utils/rupiahHelper";

import { Button } from "@/Components/Elements/Shadcn/button";
import ActionCard from "@/Components/Fragments/Customer/Common/Card/ActionCard";
import useAllOrder from "@/Hooks/Customer/Order/useAllOrder";
import { FieldGroup, FieldSet, Field, FieldLabel } from "@/Components/Elements/Shadcn/field";
import { Input } from "@/Components/Elements/Shadcn/input";

const SummaryOrder = () => {
  const navigate = useNavigate();
  const { orderItems, totalPrice, checkout } = useAllOrder();
  const [serverErrors, setServerErrors] = useState([]);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { customer_name: "" },
  });

  const handleCheckout = useCallback(
    async (values) => {
      if (orderItems.length === 0) {
        setError("items", { type: "manual", message: "Belum ada pesanan." });
        return;
      }

      clearErrors();
      setServerErrors([]);

      try {
        await checkout({ customerName: values.customer_name, items: orderItems });
        navigate("/payment");
      } catch (error) {
        console.error("Checkout gagal", error);

        if (error?.validationErrors) {
          const validationList = Object.values(error.validationErrors);
          setServerErrors(validationList);

          Object.entries(error.validationErrors).forEach(([field, message]) => {
            setError(field, { type: "server", message: message || "Tidak valid" });
          });
          return;
        }

        setServerErrors([error?.message || "Checkout gagal, silakan coba lagi."]);
      }
    },
    [checkout, clearErrors, navigate, orderItems, setError],
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
                <Input id="customer_name" autoComplete="off" aria-invalid={Boolean(errors.customer_name)} {...register("customer_name", { required: "Nama pelanggan wajib diisi" })} />
                {errors.customer_name?.message && <p className="text-xs text-destructive mt-1">{errors.customer_name.message}</p>}
              </Field>
            </FieldGroup>
          </FieldSet>
        </Field>
      </div>

      {serverErrors.length > 0 && (
        <div className="mx-3 rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">
          <ul className="list-disc list-inside space-y-1">
            {serverErrors.map((errMsg, idx) => (
              <li key={idx}>{errMsg}</li>
            ))}
          </ul>
        </div>
      )}

      <ActionCard onActionClick={handleSubmit(handleCheckout)} actionTitle={isSubmitting ? "Memproses..." : "Lanjut ke Pembayaran"}>
        <p>Total Pembayaran</p>
        <div className="flex items-center gap-4">
          <h4 className="text-md font-semibold">{rupiah(totalPrice)}</h4>
        </div>
      </ActionCard>
    </div>
  );
};

export default SummaryOrder;
