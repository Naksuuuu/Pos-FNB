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
import { Separator } from "@/Components/Elements/Shadcn/separator";
import useTenant from "@/Features/Shared/Hooks/useTenant";

const OrderPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tableCode = searchParams.get("code")?.trim() || "";
  const effectiveTableCode = tableCode || "VIP2";
  const queryWithCode = tableCode ? `?code=${encodeURIComponent(tableCode)}` : "";

  const { tenant } = useTenant();
  const taxPercentage = parseFloat(tenant?.tax_percentage || "0");

  const {
    isTenantPro,
    orderItems,
    totalPrice,
    deleteOrderItem,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    handleCheckout,
    loadingCheckout,
    isAuthenticated,
    availableRewards,
    selectedReward,
    setSelectedReward,
  } = useAllOrder(effectiveTableCode, (orderResponse) => {
    const orderData = orderResponse?.order || orderResponse?.data?.order || orderResponse || {};
    const orderId = orderData.id || "";
    navigate({
      pathname: ROUTES.PUBLIC.PAYMENT,
      search: `?code=${encodeURIComponent(tableCode || effectiveTableCode)}&orderId=${encodeURIComponent(orderId)}`,
    });
  });

  const discountPercentage = selectedReward?.reward?.discount_percentage || 0;
  const discountAmount = totalPrice * (discountPercentage / 100);
  const taxAmount = (totalPrice - discountAmount) * (taxPercentage / 100);
  const finalTotal = Math.max(0, totalPrice - discountAmount + taxAmount);

  return (
    <>
      <CustomerNavbar navbarTitle="Pesanan" backLink={`${ROUTES.PUBLIC.CATALOG}${queryWithCode}`} />

      <div className="flex-1 w-full px-3 space-y-4 max-w-4xl mx-auto ">
        <div className="md:px-4">
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
                            <Link
                              {...props}
                              to={`${ROUTES.PUBLIC.CATALOG_DETAIL.replace(":catalogId", item.menu_id)}${queryWithCode}`}
                              state={{ fromOrder: true, quantity: item.qty }}
                            >
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
        </div>

        <div className="md:px-4">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Detail Pemesan</p>

          <Card className="py-0 mt-3 border-none rounded-md shadow-md">
            <CardContent className="px-4">
              <div className="flex flex-col w-full py-4 border-b">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold ">Nomor Meja</p>

                  <Badge variant="secondary">{effectiveTableCode}</Badge>
                </div>
                <Input
                  id="code"
                  type="hidden"
                  {...register("code", { required: "Nomor meja wajib diisi" })}
                  disabled={true}
                  className="hidden"
                />
                {errors.code?.message && <FieldError>{errors.code.message}</FieldError>}
              </div>

              <div className="py-4 space-y-2 border-b">
                <p className="text-sm font-semibold ">Nama Pemesan</p>
                <Input
                  id="customer_name"
                  placeholder="Masukkan nama kamu..."
                  className="bg-input/30 disabled:cursor-not-allowed disabled:opacity-75"
                  autoComplete="off"
                  disabled={isAuthenticated && !!isTenantPro}
                  aria-invalid={Boolean(errors.customer_name)}
                  {...register("customer_name", { required: "Nama pelanggan wajib diisi" })}
                />
                {errors.customer_name?.message && <FieldError>{errors.customer_name.message}</FieldError>}
              </div>

              <div className="py-4 space-y-2">
                <p className="text-sm font-semibold ">Catatan Pesanan (Opsional)</p>
                <Textarea
                  id="notes"
                  placeholder="Contoh: Tanpa bawang, pesan 1 jam lagi, dll..."
                  aria-invalid={Boolean(errors.notes)}
                  {...register("notes")}
                />
                {errors.notes?.message && <FieldError>{errors.notes.message}</FieldError>}
              </div>
            </CardContent>
          </Card>
        </div>

        {isTenantPro && isAuthenticated && availableRewards.length > 0 && (
          <section className="md:px-4">
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
              Gunakan Reward / Voucher
            </p>

            <Card className="py-0 mt-3 border-none rounded-md shadow-md">
              <CardContent className="px-4 py-4">
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-semibold">Pilih Voucher Kamu</p>
                  <div className="flex flex-col gap-2 max-h-48 overflow-y-auto no-scrollbar">
                    {availableRewards.map((item) => {
                      const isSelected = selectedReward?.id === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setSelectedReward(isSelected ? null : item)}
                          className={`flex items-center justify-between p-3 rounded-lg border text-left transition-all ${
                            isSelected
                              ? "border-primary bg-primary/5 text-primary shadow-sm"
                              : "border-border bg-card text-card-foreground hover:bg-muted/50"
                          }`}
                        >
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded bg-primary/10 text-primary">
                              {item.reward?.category}
                            </span>
                            <span className="text-sm font-bold block mt-1">{item.reward?.name}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-extrabold text-primary block">
                              -{item.reward?.discount_percentage}%
                            </span>
                            <span className="text-[10px] text-muted-foreground">
                              {isSelected ? "Terpilih" : "Gunakan"}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        <div className="md:px-4 ">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Ringkasan Pembayaran</p>

          <Card className="py-0 mt-3 border-none rounded-md shadow-md">
            <CardContent className="px-4 py-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal (Harga Menu)</span>
                <span className="font-medium">{rupiah(totalPrice)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex items-center justify-between text-sm text-green-600 font-semibold">
                  <span>Diskon ({selectedReward?.reward?.name})</span>
                  <span>-{rupiah(discountAmount)}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Pajak ({taxPercentage}%)</span>
                <span className="font-medium">{rupiah(taxAmount)}</span>
              </div>
              <Separator className="my-2 border-b border-dashed bg-transparent w-full" />
              <div className="flex items-center justify-between font-bold text-sm">
                <span>Total Akhir</span>
                <span className="text-primary">{rupiah(finalTotal)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <ActionCard
        onActionClick={handleSubmit(handleCheckout)}
        actionTitle={isSubmitting || loadingCheckout ? "Memproses..." : "Lanjut ke Pembayaran"}
      >
        <p>Total Pembayaran</p>
        <div className="flex items-center gap-4">
          <h4 className="font-semibold text-md">{rupiah(finalTotal)}</h4>
        </div>
      </ActionCard>
    </>
  );
};

export default OrderPage;
