import { memo } from "react";

import { cn } from "@/Utils/cn";

import { Card } from "@/Components/Elements/Cards/Card";

const DashStatisticCard = memo(({ title, statistic, descriptions, icon: Icon, iconClassName }) => {
  return (
    <Card outerClassName="shadow-md ring-1">
      <div className="flex items-center justify-between space-y-1 md:space-y-2">
        <div>
          <p>{title}</p>
          <p className="text-xl font-extrabold md:text-2xl">{statistic}</p>
        </div>
        <div className={cn("p-2 rounded-md bg-success/10 text-success", iconClassName)}>{Icon && <Icon className="size-6" />}</div>
      </div>
      <p className="text-xs">{descriptions}</p>
    </Card>
  );
});
export default DashStatisticCard;
