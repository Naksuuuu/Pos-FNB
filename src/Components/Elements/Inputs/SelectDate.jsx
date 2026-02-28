import { memo } from "react";
import { format } from "date-fns";
import { CalendarIcon, ChevronDown } from "lucide-react";

import { Button } from "@/Components/Elements/Shadcn/button";
import { Calendar } from "@/Components/Elements/Shadcn/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/Elements/Shadcn/popover";

const SelectDate = memo(({ date, onSelect }) => {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            data-empty={!date}
            className="data-[empty=true]:text-muted-foreground justify-between text-left font-normal"
          />
        }
      >
        <div className="flex gap-2 items-center">
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pilih Tanggal</span>}
        </div>

        <div className="in-data-popup-open:rotate-180 transition-transform duration-300">
          <ChevronDown />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          captionLayout="dropdown"
          selected={date}
          onSelect={(value) => onSelect(value ? format(value, "y-M-d") : null)}
        />
      </PopoverContent>
    </Popover>
  );
});
export { SelectDate };
