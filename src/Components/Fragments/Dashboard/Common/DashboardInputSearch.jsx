import { memo } from "react";
import { Search, X } from "lucide-react";

import { Button } from "@/Components/Elements/Shadcn/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/Components/Elements/Shadcn/input-group";

const DashboardInputSearch = memo(({ onSearchChange, placeholder = "Search...", ...props }) => {
  return (
    <InputGroup className="">
      <InputGroupInput placeholder={placeholder} onChange={(e) => onSearchChange(e)} {...props} />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      {props?.value && (
        <InputGroupAddon align="inline-end" className="">
          <Button variant="destructive" size="xs" onClick={() => onSearchChange({ target: { value: "" } })}>
            <X />
          </Button>
        </InputGroupAddon>
      )}
    </InputGroup>
  );
});

export default DashboardInputSearch;
