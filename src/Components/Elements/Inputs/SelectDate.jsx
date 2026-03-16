import { memo, useCallback, useState } from "react";
import { format } from "date-fns";
import { CalendarSearch } from "lucide-react";
import { id } from "date-fns/locale";

import { Button } from "@/Components/Elements/Shadcn/button";
import { Calendar } from "@/Components/Elements/Shadcn/calendar";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/Components/Elements/Shadcn/dialog";

import { Select as SelectMain, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/Components/Elements/Shadcn/select";

const SelectDate = memo(({ items, label, placeholder, onValueChange, value, ...props }) => {
  const ariaInvalid = props["aria-invalid"] || false;
  const [openCustom, setOpenCustom] = useState(false);
  const [range, setRange] = useState(undefined);

  const handleRootValueChange = useCallback(
    (v) => {
      if (v === "custom") {
        setRange(undefined);
        setOpenCustom(true);
        return;
      }
      if (typeof onValueChange === "function") onValueChange(v);
    },
    [onValueChange],
  );

  const handleConfirmRange = useCallback(
    (date) => {
      if (!date || !date.from || !date.to) return;
      const from = format(date.from, "y-MM-dd");
      const to = format(date.to, "y-MM-dd");
      const formatted = `${from}, ${to}`;
      setOpenCustom(false);
      if (typeof onValueChange === "function") onValueChange(formatted);
    },
    [onValueChange],
  );

  const handleCustomLabel = useCallback(() => {
    const isCustom = items.some((item) => item.value === value);

    if (isCustom) {
      return null;
    }

    const [from, to] = value ? value.split(", ") : [null, null];

    if (from && to) {
      const formattedLabelFrom = format(new Date(from), "PPP", { locale: id });
      const formattedLabelTo = format(new Date(to), "PPP", { locale: id });
      return `${formattedLabelFrom} - ${formattedLabelTo}`;
    }
  }, [items, value]);

  return (
    <>
      <SelectMain items={items} onValueChange={handleRootValueChange} value={value} {...props}>
        <SelectTrigger className="w-full bg-input/30" aria-invalid={ariaInvalid}>
          <SelectValue placeholder={placeholder || "Pilih opsi"}>{handleCustomLabel()}</SelectValue>
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={false}>
          <SelectGroup>
            <SelectLabel>{label || "Cari Berdasarkan"}</SelectLabel>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </SelectMain>

      <Dialog open={openCustom} onOpenChange={(open) => setOpenCustom(open)}>
        <DialogContent className="max-w-fit!" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="p-2 rounded-md bg-success/10 text-success">
                <CalendarSearch className="size-6" />{" "}
              </div>
              <span className="text-lg font-semibold">Pilih Rentang Tanggal</span>
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4">
            <Calendar mode="range" captionLayout="dropdown" numberOfMonths={2} selected={range} onSelect={(v) => setRange(v)} />
          </div>

          <DialogFooter showCloseButton={false}>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setOpenCustom(false)}>
                Batal
              </Button>
              <Button disabled={!(range && range.from && range.to)} onClick={() => handleConfirmRange(range)}>
                Terapkan
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
});

export { SelectDate };
