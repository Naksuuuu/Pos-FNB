import { memo } from "react";
import { Button } from "@/Components/Elements/Shadcn/button";

const ButtonResetFilter = memo(({ onResetFilter, condition }) => {
  return (
    <div
      className={`transition-all overflow-hidden h-fit  duration-500 ease-out ${condition ? "max-h-16 visible opacity-100 translate-y-0" : "max-h-0 invisible m-0 p-0 opacity-0 -translate-y-5 pointer-events-none"}`}
    >
      <Button className="w-full" onClick={onResetFilter}>
        Reset Filter
      </Button>
    </div>
  );
});
export { ButtonResetFilter };
