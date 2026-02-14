import { memo } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/Components/Elements/Shadcn/select";
import { Button } from "@/Components/Elements/Shadcn/button";

const DashboardSelectFilter = memo(({ items, onValueChange, value, label, placeholder }) => {
  return (
    <Select items={items} onValueChange={onValueChange} value={value || null}>
      <SelectTrigger className="w-full ">
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

const DashboardResetFilter = memo(({ onResetFilter, condition }) => {
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

export { DashboardResetFilter };
export default DashboardSelectFilter;
