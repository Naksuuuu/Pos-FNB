import { Card } from "@/Components/Elements/Cards/Card";
import { memo, useState } from "react";
import { ChartColumn, ChevronDown } from "lucide-react";
import { Button } from "@/Components/Elements/Shadcn/button";

const DashStatisticCardHeader = memo(({ children, icon, title, description }) => {
  const [showStatistic, setShowStatistic] = useState(false);

  return (
    <Card className="p-0 md:p-0">
      <div className="relative flex items-center justify-between p-2 md:p-4 z-1 bg-primary text-background">
        <div className="flex items-center gap-2 ">
          <div className="p-2 rounded-md bg-background/10">{icon || <ChartColumn />}</div>
          <div className="">
            <h2 className="text-lg font-semibold tracking-wide">{title}</h2>
            <p className="text-xs">{description}</p>
          </div>
        </div>
        <div>
          <Button variant="outline" size="xs" className="border-0 rounded-sm text-background bg-background/10 ring-0" onClick={() => setShowStatistic((prev) => !prev)}>
            {showStatistic ? "Detail" : "Detail"}
            <ChevronDown className={`${showStatistic ? "rotate-180" : ""} transition-transform duration-200`} />
          </Button>
        </div>
      </div>

      <div className={`grid transition-all duration-300 ease-out ${showStatistic ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <div className="grid w-full grid-cols-1 gap-4 p-2 md:p-4 md:grid-cols-3">{children}</div>
        </div>
      </div>
    </Card>
  );
});
export default DashStatisticCardHeader;
