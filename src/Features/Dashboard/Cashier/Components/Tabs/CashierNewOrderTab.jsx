import { useCallback, useState } from "react";
import { Controller } from "react-hook-form";
import { Loader2, Minus, Pen, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import useCashierNewOrder from "@/Features/Dashboard/Cashier/Hooks/useCashierNewOrder";
import useCashierResources from "@/Features/Dashboard/Cashier/Hooks/useCashierResources";
import useTenantTier from "@/Features/Shared/Hooks/useTenantTier";

import { rupiah } from "@/Utils/rupiahHelper";

import { Card } from "@/Components/Elements/Cards/Card";
import { Button } from "@/Components/Elements/Shadcn/button";
import { Input } from "@/Components/Elements/Inputs/Input";
import { Select } from "@/Components/Elements/Inputs/Select";
import { Textarea } from "@/Components/Elements/Shadcn/textarea";
import { Separator } from "@/Components/Elements/Shadcn/separator";
import { Field, FieldError, FieldLegend, FieldSet } from "@/Components/Elements/Shadcn/field";
import { Label } from "@/Components/Elements/Shadcn/label";
import { InputSearch } from "@/Components/Elements/Inputs/InputSearch";

import CashierMenuCard from "@/Features/Dashboard/Cashier/Components/Card/CashierMenuCard";
import CashierMemberModal from "@/Features/Dashboard/Cashier/Components/Modal/CashierMemberModal";
import CashierCustomModal from "@/Features/Dashboard/Cashier/Components/Modal/CashierCustomModal";

const NAVBAR_HEIGHT = 105;

const CashierNewOrderTab = ({ onOrderCreated }) => {
  const [memberModalOpen, setMemberModalOpen] = useState(false);
  const [customModalOpen, setCustomModalOpen] = useState(false);
  const [selectedMenuForCustom, setSelectedMenuForCustom] = useState(null);
  const [editingCartItemKey, setEditingCartItemKey] = useState(null);
  const [editingCartItem, setEditingCartItem] = useState(null);

  const { isTenantPro } = useTenantTier();
  const {
    register,
    control,
    setValue,
    errors,
    handleSubmit,
    orderType,

    cart,
    addToCart,
    decreaseCartItem,
    increaseCartItem,
    removeCartItem,
    updateCartItemCustoms,
    clearOrderForm,

    subtotal,
    tax,
    taxPercentage,
    grandTotal,

    canSubmitQueue,
    createOrderQueue,
    loadingCreateOrder,
  } = useCashierNewOrder();

  const {
    filters,
    categories,
    menus,
    tables,
    optimisticSearch,
    loadingResources,
    handleCategoryChange,
    handleSearchChange,
  } = useCashierResources();

  const handleEditCustom = useCallback(
    (item) => {
      const foundMenu = menus.find((m) => m.id === item.menu_id) || {
        id: item.menu_id,
        name: item.name,
        price: item.base_price || item.price,
        custom_options: item.selected_customs || [],
      };
      setSelectedMenuForCustom(foundMenu);
      setEditingCartItemKey(item.cart_item_key || item.menu_id);
      setEditingCartItem(item);
      setCustomModalOpen(true);
    },
    [menus],
  );

  const handleSaveModalCustoms = useCallback(
    (menu, selectedCustomObjects, quantity) => {
      if (editingCartItemKey) {
        updateCartItemCustoms(editingCartItemKey, selectedCustomObjects, quantity);
      } else {
        addToCart(menu, selectedCustomObjects, quantity);
      }
      setEditingCartItemKey(null);
      setEditingCartItem(null);
    },
    [editingCartItemKey, updateCartItemCustoms, addToCart],
  );

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
    <div
      className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-4 "
      style={{ height: `calc(100dvh - ${NAVBAR_HEIGHT}px)` }}
    >
      <div className="space-y-4 md:col-span-2 xl:col-span-3 min-h-0 flex flex-col">
        <Card className="flex items-center gap-4">
          <Field className="w-1/5 mb-0">
            <Label htmlFor="search">Cari Menu</Label>
            <InputSearch
              id="search"
              name="search"
              onSearchChange={handleSearchChange}
              value={optimisticSearch}
              placeholder="Cari menu..."
            />
          </Field>

          <div className="flex-1 min-w-0">
            <div className="space-y-2">
              <Label htmlFor="kategori">Kategori</Label>

              <div className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth ">
                {categories.map((category) => (
                  <Button
                    key={category.value}
                    variant={
                      filters.category_id === category.value || (!filters.category_id && category.value === "")
                        ? "default"
                        : "outline"
                    }
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
        <div className="grid grid-cols-2 gap-3 pb-1 lg:grid-cols-3 2xl:grid-cols-4 flex-1 overflow-y-scroll min-h-0 auto-rows-max no-scrollbar ">
          <CashierMenuCard loadingResources={loadingResources} menus={menus} addToCart={addToCart} />
        </div>
      </div>

      <Card className="space-y-4 xl:sticky xl:top-0 h-full flex flex-col min-h-0 overflow-y-scroll md:overflow-y-hidden">
        <form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-col gap-4 h-full">
          <FieldSet>
            <FieldLegend>
              <p className="text-base font-semibold">Pesanan Saat Ini</p>
              <p className="text-sm text-muted-foreground">Susun item pesanan sebelum dikirim ke antrian</p>
            </FieldLegend>

            {/* Field Tipe Pesanan */}
            <Field>
              <Label htmlFor="order_type">Tipe Pesanan</Label>
              <Controller
                name="order_type"
                control={control}
                render={({ field }) => (
                  <div className="inline-flex w-full p-1 border rounded-lg border-border bg-input/20">
                    <Button
                      type="button"
                      variant={field.value === "DINE_IN" ? "default" : "ghost"}
                      size="sm"
                      className="flex-1 h-8 rounded-md text-xs font-semibold cursor-pointer"
                      onClick={() => field.onChange("DINE_IN")}
                    >
                      Makan di Tempat (Dine In)
                    </Button>
                    <Button
                      type="button"
                      variant={field.value === "TAKE_AWAY" ? "default" : "ghost"}
                      size="sm"
                      className="flex-1 h-8 rounded-md text-xs font-semibold cursor-pointer"
                      onClick={() => {
                        field.onChange("TAKE_AWAY");
                        setValue("code", "");
                      }}
                    >
                      Bawa Pulang (Take Away)
                    </Button>
                  </div>
                )}
              />
              {errors.order_type && <FieldError>{errors.order_type.message}</FieldError>}
            </Field>

            <Field>
              <div className="flex justify-between items-center">
                <Label htmlFor="customer_name">Nama Pelanggan</Label>
                {isTenantPro && (
                  <Button
                    type="button"
                    variant="link"
                    className="h-auto p-0 text-xs font-semibold text-primary hover:no-underline"
                    onClick={() => setMemberModalOpen(true)}
                  >
                    Daftar/Kelola Member
                  </Button>
                )}
              </div>
              <Input
                id="customer_name"
                name="customer_name"
                placeholder="contoh: John Doe"
                {...register("customer_name")}
              />
              {errors.customer_name && <FieldError>{errors.customer_name.message}</FieldError>}
            </Field>

            <Field>
              <Label htmlFor="code">
                Nomor Meja {orderType === "DINE_IN" ? <span className="text-destructive">*</span> : "(Opsional)"}
              </Label>

              <Controller
                name="code"
                control={control}
                render={({ field }) => (
                  <Select
                    items={tables}
                    id="code_select"
                    name="code"
                    disabled={orderType === "TAKE_AWAY"}
                    placeholder={orderType === "TAKE_AWAY" ? "Bawa Pulang (Tidak Perlu Meja)" : "contoh: 01"}
                    value={field.value || ""}
                    onValueChange={(val) => field.onChange(val)}
                    aria-invalid={!!errors.code}
                  />
                )}
              />
              {errors.code && <FieldError>{errors.code.message}</FieldError>}
            </Field>

            <Field>
              <Label htmlFor="notes">Catatan</Label>
              <Textarea
                id="notes"
                name="notes"
                {...register("notes")}
                placeholder="contoh: tanpa bawang"
                className="min-h-16"
              />
              {errors.notes && <FieldError>{errors.notes.message}</FieldError>}
            </Field>
          </FieldSet>

          <Separator className="w-full border-b border-dashed bg-transparent" />

          <div className="flex-1 overflow-y-auto min-h-0 no-scrollbar space-y-2">
            {cart.length === 0 && (
              <p className="py-6 text-center text-sm text-muted-foreground">Belum ada item dipilih.</p>
            )}

            {cart.map((item) => {
              const itemKey = item.cart_item_key || item.menu_id;
              const unitPrice = item.unit_price || item.price || 0;
              return (
                <div key={itemKey} className="rounded-lg border border-border p-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="line-clamp-1 text-sm font-medium">{item.name}</p>
                      {item.selected_customs && item.selected_customs.length > 0 && (
                        <div className="flex flex-col text-xs text-muted-foreground mt-0.5">
                          {item.selected_customs.map((c, cIdx) => (
                            <span key={c.id || cIdx}>
                              + {c.name || c.custom_name} {Number(c.price) > 0 ? `(${rupiah(c.price)})` : "(Gratis)"}
                            </span>
                          ))}
                        </div>
                      )}
                      <p className="text-xs text-muted-foreground mt-0.5">{rupiah(unitPrice)} / item</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        type="button"
                        size="icon-xs"
                        variant="ghost"
                        title="Opsi Extra Custom"
                        onClick={() => handleEditCustom(item)}
                      >
                        <Pen className="size-3.5 text-muted-foreground hover:text-foreground" />
                      </Button>
                      <Button type="button" size="icon-xs" variant="ghost" onClick={() => removeCartItem(itemKey)}>
                        <Trash2 className="text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Button type="button" size="icon-xs" variant="outline" onClick={() => decreaseCartItem(itemKey)}>
                        <Minus />
                      </Button>
                      <span className="min-w-6 text-center text-sm font-medium">{item.qty}</span>
                      <Button type="button" size="icon-xs" variant="outline" onClick={() => increaseCartItem(itemKey)}>
                        <Plus />
                      </Button>
                    </div>
                    <p className="text-sm font-semibold">{rupiah(unitPrice * item.qty)}</p>
                  </div>
                </div>
              );
            })}

            {errors.items && <FieldError className="mt-2">{errors.items.message}</FieldError>}
          </div>

          <Separator className="w-full border-b border-dashed bg-transparent" />

          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{rupiah(subtotal)}</span>
            </div>
            <Separator className="w-full border-b border-dashed bg-transparent" />
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Pajak ({taxPercentage}%)</span>
              <span>{rupiah(tax)}</span>
            </div>
            <Separator className="w-full border-b border-dashed bg-transparent" />
            <div className="flex items-center justify-between text-base font-semibold">
              <span>Total</span>
              <span className="text-primary">{rupiah(grandTotal)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={clearOrderForm}
              disabled={loadingCreateOrder || cart.length === 0}
            >
              Kosongkan
            </Button>
            <Button type="submit" disabled={!canSubmitQueue}>
              {loadingCreateOrder ? <Loader2 className="animate-spin" /> : null}
              Tambahkan ke Antrian
            </Button>
          </div>
        </form>
      </Card>
      <CashierMemberModal isOpen={memberModalOpen} onOpenModal={setMemberModalOpen} />
      <CashierCustomModal
        key={editingCartItemKey || selectedMenuForCustom?.id || "new-custom-modal"}
        isOpen={customModalOpen}
        onClose={() => {
          setCustomModalOpen(false);
          setEditingCartItemKey(null);
          setEditingCartItem(null);
        }}
        menu={selectedMenuForCustom}
        initialSelectedCustoms={editingCartItem?.selected_customs || []}
        initialQty={editingCartItem?.qty || 1}
        onAddToCart={handleSaveModalCustoms}
      />
    </div>
  );
};

export default CashierNewOrderTab;
