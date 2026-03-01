import { memo } from "react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/Components/Elements/Shadcn/input-group";
import { cn } from "@/Utils/cn";

const Input = memo(({ className, firstAddon = null, lastAddon = null, ...props }) => {
  return (
    <InputGroup className={cn(className, "bg-input/30")}>
      {firstAddon && <InputGroupAddon align="inline-start">{firstAddon}</InputGroupAddon>}
      <InputGroupInput {...props} />
      {lastAddon && <InputGroupAddon align="inline-end">{lastAddon}</InputGroupAddon>}
    </InputGroup>
  );
});
export { Input };
