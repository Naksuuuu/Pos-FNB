import { Link, useNavigate, useSearchParams } from "react-router";
import { Pen, Plus, Trash } from "lucide-react";

import { ROUTES } from "@/Constants/RouteConstant";

import useAllOrder from "@/Features/Customer/Order/Hooks/useAllOrder";

import { rupiah } from "@/Utils/rupiahHelper";

import { Button } from "@/Components/Elements/Shadcn/button";
import { Input } from "@/Components/Elements/Shadcn/input";
import { Badge } from "@/Components/Elements/Shadcn/badge";
import { Textarea } from "@/Components/Elements/Shadcn/textarea";
import { FieldError } from "@/Components/Elements/Shadcn/field";
import { Card, CardContent } from "@/Components/Elements/Shadcn/card";
import ActionCard from "@/Features/Customer/Shared/Components/Card/ActionCard";
import CustomerNavbar from "@/Features/Customer/Shared/Components/Navigation/CustomerNavbar";

const OrderPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tableCode = searchParams.get("code")?.trim() || "";
  const effectiveTableCode = tableCode || "VIP2";
  const queryWithCode = tableCode ? `?code=${encodeURIComponent(tableCode)}` : "";

  const { orderItems, totalPrice, deleteOrderItem, register, handleSubmit, errors, isSubmitting, handleCheckout, loadingCheckout } = useAllOrder(effectiveTableCode, queryWithCode, () => {
    navigate({ pathname: ROUTES.PUBLIC.PAYMENT, search: queryWithCode });
  });

  return (
    <>
      <CustomerNavbar navbarTitle="Pesanan" backLink={`${ROUTES.PUBLIC.CATALOG}${queryWithCode}`} />

      <div className="flex-1 w-full px-3 space-y-4">
        <section className="md:px-4">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Ringkasan Pesanan</p>

          <Card className="py-0 mt-3 border-none shadow-md">
            <CardContent className="px-4">
              <div className="flex items-center justify-between py-4 border-b">
                <p className="font-semibold text-md">{orderItems.length} item dipilih</p>
                <Button
                  size="sm"
                  variant="outline"
                  nativeButton={false}
                  render={(props) => (
                    <Link {...props} to={`${ROUTES.PUBLIC.CATALOG}${queryWithCode}`}>
                      <div className="flex items-center gap-2">
                        <Plus className="size-4" />
                        <span className="text-sm font-semibold">Tambah Lagi</span>
                      </div>
                    </Link>
                  )}
                />
              </div>

              <div>
                {orderItems.map((item, index) => (
                  <div key={index} className="py-4 border-b">
                    <div key={`${item.menu_id}-${item.name}`} className="flex items-center justify-between ">
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="text-sm font-semibold">
                            {item.name} <span className="text-xs font-light">(x{item.qty})</span>
                          </p>
                          <p className="text-sm text-muted-foreground">{rupiah(item.price)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          nativeButton={false}
                          render={(props) => (
                            <Link {...props} to={`${ROUTES.PUBLIC.CATALOG_DETAIL.replace(":catalogId", item.menu_id)}${queryWithCode}`} state={{ fromOrder: true, quantity: item.qty }}>
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

        <section className="md:px-4">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Detail Pemesan</p>

          <Card className="py-0 mt-3 border-none rounded-md shadow-md">
            <CardContent className="px-4">
              <div className="flex flex-col w-full py-4 border-b">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold ">Nomor Meja</p>

                  <Badge variant="secondary">{effectiveTableCode}</Badge>
                </div>
                <Input id="code" type="hidden" {...register("code", { required: "Nomor meja wajib diisi" })} disabled={true} className="hidden" />
                {errors.code?.message && <FieldError>{errors.code.message}</FieldError>}
              </div>

              <div className="py-4 space-y-2 border-b">
                <p className="text-sm font-semibold ">Nama Pemesan</p>
                <Input
                  id="customer_name"
                  placeholder="Masukkan nama kamu..."
                  className="bg-input/30"
                  autoComplete="off"
                  aria-invalid={Boolean(errors.customer_name)}
                  {...register("customer_name", { required: "Nama pelanggan wajib diisi" })}
                />
                {errors.customer_name?.message && <FieldError>{errors.customer_name.message}</FieldError>}
              </div>

              <div className="py-4 space-y-2">
                <p className="text-sm font-semibold ">Catatan Pesanan (Opsional)</p>
                <Textarea id="notes" placeholder="Contoh: Tanpa bawang, pesan 1 jam lagi, dll..." aria-invalid={Boolean(errors.notes)} {...register("notes")} />
                {errors.notes?.message && <FieldError>{errors.notes.message}</FieldError>}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      <ActionCard onActionClick={handleSubmit(handleCheckout)} actionTitle={isSubmitting || loadingCheckout ? "Memproses..." : "Lanjut ke Pembayaran"}>
        <p>Total Pembayaran</p>
        <div className="flex items-center gap-4">
          <h4 className="font-semibold text-md">{rupiah(totalPrice)}</h4>
        </div>
      </ActionCard>
    </>
  );
};

export default OrderPage;
