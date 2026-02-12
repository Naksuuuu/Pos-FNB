import { memo } from "react";
import { Search, X } from "lucide-react";

import { Button } from "@/Components/Elements/Shadcn/Button/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/Components/Elements/Shadcn/Input/input-group";

const DashboardSearch = memo(({ onSearchChange, ...props }) => {
  return (
    <InputGroup className="">
      <InputGroupInput placeholder="Search..." onChange={onSearchChange} {...props} />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      {props?.value && (
        <InputGroupAddon align="inline-end" className="">
          <Button variant="destructive" size="xs" className="cursor-pointer" onClick={() => onSearchChange({ target: { value: "" } })}>
            <X />
          </Button>
        </InputGroupAddon>
      )}
    </InputGroup>
  );
});

export default DashboardSearch;
