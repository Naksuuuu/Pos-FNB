import { memo } from "react";
import {
  Select as SelectMain,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/Components/Elements/Shadcn/select";

const Select = memo(({ items, label, placeholder, ...props }) => {
  const ariaInvalid = props["aria-invalid"] || false;

  return (
    <SelectMain items={items} {...props}>
      <SelectTrigger className="w-full bg-input/30" aria-invalid={ariaInvalid}>
        <SelectValue placeholder={placeholder || "Pilih opsi"} />
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
  );
});

export { Select };
