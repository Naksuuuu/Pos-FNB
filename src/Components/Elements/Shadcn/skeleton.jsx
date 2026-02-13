import { cn } from "@/Utils/cn";
import { memo } from "react";

const Skeleton = memo(({ className, ...props }) => {
  return <div data-slot="skeleton" className={cn("bg-muted rounded-md animate-pulse", className)} {...props} />;
});

export { Skeleton };
