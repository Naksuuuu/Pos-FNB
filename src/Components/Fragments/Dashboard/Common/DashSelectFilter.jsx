import { memo } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/Components/Elements/Shadcn/select";
import { Button } from "@/Components/Elements/Shadcn/button";

const DashSelectFilter = memo(({ items, label, placeholder, ...props }) => {
  const ariaInvalid = props["aria-invalid"] || false;

  return (
    <Select items={items} {...props}>
      <SelectTrigger className="w-full " aria-invalid={ariaInvalid}>
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
    </Select>
  );
});

const DashResetFilter = memo(({ onResetFilter, condition }) => {
  return (
    <div
      className={`transition-all overflow-hidden h-fit  duration-500 ease-out ${condition ? "max-h-16 visible opacity-100 translate-y-0" : "max-h-0 invisible m-0 p-0 opacity-0 -translate-y-5 pointer-events-none"}`}
    >
      <Button className="w-full" onClick={onResetFilter}>
        Reset Filter
      </Button>
    </div>
  );
});

export { DashResetFilter };
export default DashSelectFilter;
