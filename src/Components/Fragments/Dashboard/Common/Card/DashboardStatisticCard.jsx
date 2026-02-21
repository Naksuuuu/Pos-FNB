import { memo } from "react";

import { cn } from "@/Utils/cn";

import { Card } from "@/Components/Elements/Cards/Card";

const DashboardStatisticCard = memo(({ title, statistic, descriptions, icon: Icon, iconClassName }) => {
  return (
    <Card outerClassName="shadow-md ring-1">
      <div className="flex items-center justify-between space-y-1 md:space-y-2">
        <div>
          <p>{title}</p>
          <p className="text-xl md:text-2xl font-extrabold">{statistic}</p>
        </div>
        <div className={cn("p-2 rounded-md bg-emerald-100 text-emerald-700", iconClassName)}>{Icon && <Icon className="size-6" />}</div>
      </div>
      <p className="text-xs">{descriptions}</p>
    </Card>
  );
});
export default DashboardStatisticCard;
