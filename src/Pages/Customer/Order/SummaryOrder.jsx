import { useCallback } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Pen, Plus, Trash } from "lucide-react";
import { useForm } from "react-hook-form";

import { rupiah } from "@/Utils/rupiahHelper";

import { Button } from "@/Components/Elements/Shadcn/button";
import ActionCard from "@/Components/Fragments/Customer/Common/Card/ActionCard";
import useAllOrder from "@/Hooks/Customer/Order/useAllOrder";
import { Card, CardContent } from "@/Components/Elements/Shadcn/card";
import { Field, FieldLabel, FieldError } from "@/Components/Elements/Shadcn/field";
import { Input } from "@/Components/Elements/Shadcn/input";
import { Badge } from "@/Components/Elements/Shadcn/badge";
import CustomerNavbar from "@/Components/Fragments/Customer/Common/Navigation/CustomerNavbar";

const SummaryOrder = () => {
  const navigate = useNavigate();
  const code = "VIP2";
  const { orderItems, totalPrice, checkout, deleteOrderItem } = useAllOrder();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { customer_name: "", code },
  });

  const handleCheckout = useCallback(
    async (values) => {
      if (orderItems.length === 0) {
        setError("items", { type: "manual", message: "Belum ada pesanan." });
        return;
      }

      clearErrors();

      try {
        await checkout({ customerName: values.customer_name, items: orderItems, code: values.code });
        navigate("/payment");
      } catch (error) {
        if (error?.validationErrors) {
          console.log("validationErrors", error.validationErrors);
          Object.entries(error.validationErrors).forEach(([field, message]) => {
            setError(field, { type: "server", message: message || "Tidak valid" });
          });
          return;
        }
      }
    },
    [checkout, clearErrors, navigate, orderItems, setError],
  );

  return (
    <div className="flex flex-col min-h-screen ">
      <CustomerNavbar navbarTitle="Pesanan" backLink="/catalog" />

      <div className="flex-1 pb-32">
        <section className="px-2 pt-5 md:px-4">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Ringkasan Pesanan</p>

          <Card className="py-0 mt-3 border-none rounded-md shadow-md">
            <CardContent className="px-2 ">
              <div className="flex items-center justify-between py-4 border-b">
                <p className="font-semibold text-md">{orderItems.length} item dipilih</p>
                <Button
                  size="sm"
                  variant="outline"
                  nativeButton={false}
                  render={(props) => (
                    <Link {...props} to="/catalog">
                      <div className="flex items-center gap-2">
                        <Plus className="size-4" />
                        <span className="text-sm font-semibold">Tambah Lagi</span>
                      </div>
                    </Link>
                  )}
                />
              </div>

              <div className="">
                {orderItems.map((item, index) => (
                  <div key={index} className="py-4 border-b">
                    <div key={`${item.menu_id}-${item.name}`} className="flex items-center justify-between ">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center px-3 py-2 text-sm font-semibold rounded-lg bg-slate-100 text-slate-700">x{item.qty}</div>
                        <div>
                          <p className="text-sm font-semibold">{item.name}</p>
                          <p className="text-sm text-muted-foreground">{rupiah(item.price)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          nativeButton={false}
                          render={(props) => (
                            <Link {...props} to={`/catalog/${item.menu_id}`} state={{ fromOrder: true }}>
                              <div className="flex items-center gap-1">
                                <Pen className="size-3" />
                                <span className="text-sm font-semibold">Edit</span>
                              </div>
                            </Link>
                          )}
                        />
                        <Button onClick={() => deleteOrderItem(item.menu_id)} variant="destructive" size="sm">
                          <Trash className="size-4" />
                        </Button>
                      </div>
                    </div>
                    {errors.items?.[index] && <FieldError>{errors.items[index].message}</FieldError>}
                  </div>
                ))}

                {orderItems.length === 0 && <p className="py-4 text-sm text-muted-foreground">Belum ada pesanan.</p>}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="px-2 pt-6 space-y-3 md:px-4">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Detail Pesanan</p>

          <Card className="py-0 mt-3 border-none rounded-md shadow-md">
            <CardContent className="px-2">
              <div className="flex flex-col w-full py-4 border-b">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold ">Nomor Meja</p>

                  <Badge variant="secondary">{code}</Badge>
                </div>
                <Input id="code" type="hidden" {...register("code", { required: "Nomor meja wajib diisi" })} disabled={true} className="hidden" />
                {errors.code?.message && <FieldError>{errors.code.message}</FieldError>}
              </div>

              <div className="py-4 space-y-2 border-b">
                <p className="text-sm font-semibold ">Nama Pemesan</p>
                <Input
                  id="customer_name"
                  placeholder="Masukkan nama kamu..."
                  autoComplete="off"
                  aria-invalid={Boolean(errors.customer_name)}
                  {...register("customer_name", { required: "Nama pelanggan wajib diisi" })}
                />
                {errors.customer_name?.message && <FieldError>{errors.customer_name.message}</FieldError>}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      <ActionCard onActionClick={handleSubmit(handleCheckout)} actionTitle={isSubmitting ? "Memproses..." : "Lanjut ke Pembayaran"}>
        <p>Total Pembayaran</p>
        <div className="flex items-center gap-4">
          <h4 className="font-semibold text-md">{rupiah(totalPrice)}</h4>
        </div>
      </ActionCard>
    </div>
  );
};

export default SummaryOrder;
