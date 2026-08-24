import { useState, useMemo, useCallback } from "react";
import { Minus, Plus, Utensils } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/Components/Elements/Shadcn/dialog";
import { Button } from "@/Components/Elements/Shadcn/button";
import { Badge } from "@/Components/Elements/Shadcn/badge";
import { ImageWithFallback } from "@/Components/Elements/Images/ImageWithFallback";
import { rupiah } from "@/Utils/rupiahHelper";

const CashierCustomModal = ({ isOpen, onClose, menu, onAddToCart, initialSelectedCustoms = [], initialQty = 1 }) => {
  const [quantity, setQuantity] = useState(initialQty);
  const [selectedCustoms, setSelectedCustoms] = useState(
    initialSelectedCustoms.map((c) => (typeof c === "object" ? c.id : c)),
  );

  const handleCloseModal = useCallback(() => {
    setQuantity(1);
    setSelectedCustoms([]);
    onClose();
  }, [onClose]);

  console.log(menu);

  const customOptions = useMemo(() => {
    return Array.isArray(menu?.custom_options) ? menu.custom_options : [];
  }, [menu]);

  const toggleCustomOption = useCallback((optionId) => {
    setSelectedCustoms((prev) =>
      prev.includes(optionId) ? prev.filter((id) => id !== optionId) : [...prev, optionId],
    );
  }, []);

  const selectedCustomObjects = useMemo(() => {
    return customOptions.filter((opt) => selectedCustoms.includes(opt.id));
  }, [customOptions, selectedCustoms]);

  const customTotalPrice = useMemo(() => {
    return selectedCustomObjects.reduce((sum, opt) => sum + (Number(opt.price) || 0), 0);
  }, [selectedCustomObjects]);

  const basePrice = Number(menu?.price || 0);
  const unitPrice = basePrice + customTotalPrice;
  const grandTotal = unitPrice * quantity;

  const handleAdd = () => {
    if (!menu) return;
    onAddToCart(menu, selectedCustomObjects, quantity);
    setQuantity(1);
    setSelectedCustoms([]);
    onClose();
  };

  if (!menu) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleCloseModal()}>
      <DialogContent className="max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Kustomisasi Menu</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          {/* Menu Info Banner */}
          <div className="flex gap-3 items-center p-3 rounded-lg border border-border bg-muted/30">
            <div className="relative size-16 shrink-0 overflow-hidden rounded-md">
              <ImageWithFallback
                src={menu.image || menu.image_url}
                alt={menu.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-sm truncate">{menu.name}</p>
                {menu.category?.name && (
                  <Badge variant="secondary" className="text-[10px]">
                    {menu.category.name}
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                {menu.description || "Tanpa deskripsi"}
              </p>
              <p className="text-sm font-bold text-primary mt-1">{rupiah(basePrice)}</p>
            </div>
          </div>

          {/* Custom Options List */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
              <Utensils className="size-3.5" /> Extra Custom (Opsi Tambahan)
            </p>

            {customOptions.length === 0 ? (
              <p className="text-xs text-muted-foreground italic py-2">Tidak ada opsi kustom untuk menu ini.</p>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar pr-1">
                {customOptions.map((opt) => {
                  const isSelected = selectedCustoms.includes(opt.id);
                  const optPrice = Number(opt.price || 0);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => toggleCustomOption(opt.id)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-lg border text-left transition-all ${
                        isSelected
                          ? "border-primary bg-primary/5 text-primary font-medium"
                          : "border-border bg-card text-foreground hover:bg-muted/50"
                      }`}
                    >
                      <span className="text-xs font-semibold">{opt.name || opt.custom_name}</span>
                      <span className="text-xs font-bold">{optPrice > 0 ? `+${rupiah(optPrice)}` : "Gratis"}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quantity Controls & Summary */}
          <div className="pt-3 border-t border-border space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Jumlah Porsi</span>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  size="icon-xs"
                  variant="outline"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="size-3" />
                </Button>
                <span className="min-w-6 text-center text-sm font-bold">{quantity}</span>
                <Button type="button" size="icon-xs" variant="outline" onClick={() => setQuantity((prev) => prev + 1)}>
                  <Plus className="size-3" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm font-bold">
              <span>Total Tagihan</span>
              <span className="text-base text-primary font-bold">{rupiah(grandTotal)}</span>
            </div>

            <div className="flex flex-1 gap-2">
              <DialogClose render={(props) => <Button {...props} variant="outline" className="cursor-pointer w-fit" />}>
                Batal
              </DialogClose>
              <Button type="button" className="flex-1" onClick={handleAdd}>
                Tambah ke Pesanan
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CashierCustomModal;
