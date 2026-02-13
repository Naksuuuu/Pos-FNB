"use client";
import { memo } from "react";
import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";

import { cn } from "@/Utils/cn";

const Separator = memo(({ className, orientation = "horizontal", ...props }) => {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn("bg-border shrink-0 data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch", className)}
      {...props}
    />
  );
});

export { Separator };
