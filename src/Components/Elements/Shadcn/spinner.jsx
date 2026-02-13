import { cn } from "@/Utils/cn";
import { Loader2Icon } from "lucide-react";
import { memo } from "react";

const Spinner = memo(({ className, ...props }) => {
  return <Loader2Icon role="status" aria-label="Loading" className={cn("size-4 animate-spin", className)} {...props} />;
});

export { Spinner };
