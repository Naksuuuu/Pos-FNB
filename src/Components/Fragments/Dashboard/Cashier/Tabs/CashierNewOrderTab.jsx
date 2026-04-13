import { Loader2, Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import useCashierNewOrder from "@/Hooks/Dashboard/Cashier/useCashierNewOrder";

import { rupiah } from "@/Utils/rupiahHelper";

import { Card } from "@/Components/Elements/Cards/Card";
import { Button } from "@/Components/Elements/Shadcn/button";
import { Input } from "@/Components/Elements/Inputs/Input";
import { Select } from "@/Components/Elements/Inputs/Select";
import { Textarea } from "@/Components/Elements/Shadcn/textarea";
import { Separator } from "@/Components/Elements/Shadcn/separator";
import CashierMenuCard from "@/Components/Fragments/Dashboard/Cashier/Card/CashierMenuCard";
import { Field, FieldError, FieldLegend, FieldSet } from "@/Components/Elements/Shadcn/field";
import { Label } from "@/Components/Elements/Shadcn/label";
import { Controller } from "react-hook-form";
import { useCallback } from "react";
import useCashierResources from "@/Hooks/Dashboard/Cashier/useCashierResources";
import { InputSearch } from "@/Components/Elements/Inputs/InputSearch";

const NAVBAR_HEIGHT = 105; // 72px (navbar) + 33px (inner padding)

const CashierNewOrderTab = ({ onOrderCreated }) => {
  const {
    register,
    control,
    errors,
    handleSubmit,

    cart,
    addToCart,
    decreaseCartItem,
    increaseCartItem,
    removeCartItem,
    clearOrderForm,

    subtotal,
    tax,
    grandTotal,

    canSubmitQueue,
    createOrderQueue,
  } = useCashierNewOrder();

  const {
    filters,

    categories,
    menus,
    tables,

    optimisticSearch,

    loadingResources,
    loadingCreateOrder,

    handleCategoryChange,
    handleSearchChange,
  } = useCashierResources();

  const handleSubmitForm = useCallback(
    async (data) => {
      try {
        const response = await createOrderQueue(data);
        toast.success(response?.message || "Pesanan berhasil ditambahkan ke antrian");
        onOrderCreated?.();
      } catch (error) {
        toast.error(error?.message || "Gagal menambahkan pesanan ke antrian");
      }
    },
    [createOrderQueue, onOrderCreated],
  );
  return (
    <div className={`grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-4`} style={{ height: `calc(100dvh - ${NAVBAR_HEIGHT}px)` }}>
      <div className="space-y-4 md:col-span-2 xl:col-span-3 min-h-0 flex flex-col">
        <Card className="flex items-center gap-4">
          <Field className="w-1/5 mb-0">
            <Label htmlFor="search">Cari Menu</Label>
            <InputSearch id="search" name="search" onSearchChange={handleSearchChange} value={optimisticSearch} placeholder="Cari menu..." />
          </Field>

          <div className="flex-1 min-w-0">
            <div className="space-y-2">
              <Label htmlFor="kategori">Kategori</Label>

              <div className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth ">
                {categories.map((category) => (
                  <Button
                    key={category.value}
                    variant={filters.category_id === category.value || (!filters.category_id && category.value === "") ? "default" : "outline"}
                    size="sm"
                    className="shrink-0"
                    onClick={() => handleCategoryChange(category.value)}
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Card>
        <div className="grid grid-cols-2 gap-3 pb-1  lg:grid-cols-3 2xl:grid-cols-4 flex-1 overflow-y-scroll min-h-0 auto-rows-max no-scrollbar ">
          <CashierMenuCard loadingResources={loadingResources} menus={menus} addToCart={addToCart} />
        </div>
      </div>

      <Card className="space-y-4 xl:sticky xl:top-0 h-full flex flex-col min-h-0">
        <form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-col gap-4 h-full">
          <FieldSet>
            <FieldLegend>
              <p className="text-base font-semibold">Pesanan Saat Ini</p>
              <p className="text-sm text-muted-foreground">Susun item pesanan sebelum dikirim ke antrian</p>
            </FieldLegend>
            <Field>
              <Label htmlFor="customer_name">Nama Pelanggan</Label>
              <Input id="customer_name" name="customer_name" placeholder="contoh: John Doe" {...register("customer_name")} />
              {errors.customer_name && <FieldError> {errors.customer_name.message} </FieldError>}
            </Field>

            <Field>
              <Label htmlFor="code">Nomor Meja</Label>

              <Controller
                name="code"
                control={control}
                render={({ field }) => (
                  <Select items={tables} id="code_select" name="code" placeholder="contoh: 01" value={field.value || ""} onValueChange={(val) => field.onChange(val)} aria-invalid={!!errors.code} />
                )}
              />
              {errors.code && <FieldError> {errors.code.message} </FieldError>}
            </Field>

            <Field>
              <Label htmlFor="notes">Catatan</Label>
              <Textarea id="notes" name="notes" {...register("notes")} placeholder="contoh: tanpa bawang" className="min-h-20" />
              {errors.notes && <FieldError> {errors.notes.message} </FieldError>}
            </Field>
          </FieldSet>

          <Separator className="w-full border-b border-dashed bg-transparent" />

          <div className="flex-1 overflow-y-auto min-h-0 no-scrollbar space-y-2">
            {cart.length === 0 && <p className="py-6 text-center text-sm text-muted-foreground">Belum ada item dipilih.</p>}

            {cart.map((item) => (
              <div key={item.menu_id} className="rounded-lg border border-border p-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="line-clamp-1 text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{rupiah(item.price)} / item</p>
                  </div>
                  <Button type="button" size="icon-xs" variant="ghost" onClick={() => removeCartItem(item.menu_id)}>
                    <Trash2 className="text-destructive" />
                  </Button>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Button type="button" size="icon-xs" variant="outline" onClick={() => decreaseCartItem(item.menu_id)}>
                      <Minus />
                    </Button>
                    <span className="min-w-6 text-center text-sm font-medium">{item.qty}</span>
                    <Button type="button" size="icon-xs" variant="outline" onClick={() => increaseCartItem(item.menu_id)}>
                      <Plus />
                    </Button>
                  </div>
                  <p className="text-sm font-semibold">{rupiah(item.price * item.qty)}</p>
                </div>
              </div>
            ))}

            {errors.items && <FieldError className="mt-2"> {errors.items.message} </FieldError>}
          </div>

          <Separator className="w-full border-b border-dashed bg-transparent" />

          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{rupiah(subtotal)}</span>
            </div>
            <Separator className="w-full border-b border-dashed bg-transparent" />
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Pajak (10%)</span>
              <span>{rupiah(tax)}</span>
            </div>
            <Separator className="w-full border-b border-dashed bg-transparent" />
            <div className="flex items-center justify-between text-base font-semibold">
              <span>Total</span>
              <span className="text-primary">{rupiah(grandTotal)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button type="button" variant="outline" onClick={clearOrderForm} disabled={loadingCreateOrder || cart.length === 0}>
              Kosongkan
            </Button>
            <Button type="submit" disabled={!canSubmitQueue}>
              {loadingCreateOrder ? <Loader2 className="animate-spin" /> : null}
              Tambahkan ke Antrian
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

/* */

export default CashierNewOrderTab;
