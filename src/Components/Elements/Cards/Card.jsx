import { memo } from "react";
import { cn } from "@/Utils/cn";
import { Card as MainCard, CardContent } from "@/Components/Elements/Shadcn/card";

const Card = memo(({ children, className, outerClassName, ...props }) => {
  return (
    <MainCard className={cn("shadow-md rounded-lg  p-0 border-0 ring-0", outerClassName)} {...props}>
      <CardContent className={cn("p-2 md:p-4", className)}>{children}</CardContent>
    </MainCard>
  );
});
export { Card };
