import { memo, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { cn } from "@/Utils/cn";

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/Components/Elements/Shadcn/input-group";
import { Button } from "@/Components/Elements/Shadcn/button";

const Input = memo(({ className, firstAddon = null, lastAddon = null, ...props }) => {
  return (
    <InputGroup className={cn(className, "bg-input/30")}>
      {firstAddon && <InputGroupAddon align="inline-start">{firstAddon}</InputGroupAddon>}
      <InputGroupInput {...props} />
      {lastAddon && <InputGroupAddon align="inline-end">{lastAddon}</InputGroupAddon>}
    </InputGroup>
  );
});

const InputPassword = memo(({ ...props }) => {
  const [visiblePassword, setVisiblePassword] = useState(false);

  return (
    <Input
      type={visiblePassword ? "text" : "password"}
      {...props}
      lastAddon={
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="hover:bg-transparent ring-0 focus-visible:ring-0 border-0 focus-visible:ring-offset-0 focus-visible:border-none"
          onClick={() => setVisiblePassword((prev) => !prev)}
        >
          {visiblePassword ? <Eye /> : <EyeOff />}
        </Button>
      }
    />
  );
});

export { Input, InputPassword };
