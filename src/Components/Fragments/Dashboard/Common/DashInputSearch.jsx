import { memo, useEffect } from "react";
import { Search, X } from "lucide-react";

import { Button } from "@/Components/Elements/Shadcn/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/Components/Elements/Shadcn/input-group";
import { Badge } from "@/Components/Elements/Shadcn/badge";

const INPUT_SHORTCUT = "k";

const DashInputSearch = memo(({ onSearchChange, placeholder = "Search...", ...props }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === INPUT_SHORTCUT && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        const input = document.getElementById("dashboard-search-input");
        if (input) {
          input.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <InputGroup className="">
      <InputGroupInput id="dashboard-search-input" placeholder={placeholder} onChange={(e) => onSearchChange(e)} {...props} />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      {props?.value ? (
        <InputGroupAddon align="inline-end">
          <Button variant="ghost" size="xs" className="mr-1 text-red-600 hover:text-red-900 hover:bg-red-100!" onClick={() => onSearchChange({ target: { value: "" } })}>
            <X />
          </Button>
        </InputGroupAddon>
      ) : (
        <InputGroupAddon align="inline-end">
          <Button size="xs" className="mr-1" variant="outline" disabled>
            Ctrl + K
          </Button>
        </InputGroupAddon>
      )}
    </InputGroup>
  );
});

export default DashInputSearch;
