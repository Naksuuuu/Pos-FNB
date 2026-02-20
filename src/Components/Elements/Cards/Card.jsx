import { memo } from "react";
import { cn } from "@/Utils/cn";
import { Card as MainCard, CardContent } from "@/Components/Elements/Shadcn/card";

const Card = memo(({ children, className, ...props }) => {
  return (
    <MainCard className="shadow-md rounded-lg  p-0 border-0! ring-0">
      <CardContent className={cn("p-2 md:p-4", className)} {...props}>
        {children}
      </CardContent>
    </MainCard>
  );
});
export { Card };
