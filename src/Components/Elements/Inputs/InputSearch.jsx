import { memo, useEffect } from "react";
import { Search, X } from "lucide-react";

import { Button } from "@/Components/Elements/Shadcn/button";
import { Input } from "@/Components/Elements/Inputs/Input";

const INPUT_SHORTCUT = "k";

const InputSearch = memo(({ onSearchChange, placeholder = "Search...", ...props }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === INPUT_SHORTCUT && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        const input = document.getElementById("search");
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
    <Input
      id="dashboard-search-input"
      placeholder={placeholder}
      onChange={(e) => onSearchChange(e)}
      {...props}
      firstAddon={<Search />}
      lastAddon={
        props?.value ? (
          <Button variant="ghost" size="xs" className=" text-destructive hover:text-destructive! hover:bg-destructive/10!" onClick={() => onSearchChange({ target: { value: "" } })}>
            <X />
          </Button>
        ) : (
          <Button size="xs" className="bg-white! invisible md:visible" variant="outline" disabled>
            Ctrl + K
          </Button>
        )
      }
    />
  );
});

export { InputSearch };
