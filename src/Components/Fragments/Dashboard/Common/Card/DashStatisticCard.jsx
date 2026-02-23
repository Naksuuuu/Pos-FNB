import { memo } from "react";

import { cn } from "@/Utils/cn";

import { Card } from "@/Components/Elements/Cards/Card";
import { cva } from "class-variance-authority";
import { BASE_CUSTOM_VARIANTS } from "@/Constants/Common/CustomVariantConstant";

const DashStatisticCardVariants = cva("p-2 rounded-md", {
  variants: {
    variant: {
      destructive: "text-destructive bg-destructive/10 dark:bg-destructive/20",
      ...BASE_CUSTOM_VARIANTS,
    },
  },
  defaultVariants: {
    variant: "success",
  },
});

const DashStatisticCard = memo(({ title, statistic, descriptions, icon: Icon, variant }) => {
  return (
    <Card outerClassName="shadow-md ring-1">
      <div className="flex items-center justify-between space-y-1 md:space-y-2">
        <div>
          <p>{title}</p>
          <p className="text-xl font-extrabold md:text-2xl">{statistic}</p>
        </div>
        <div className={cn(DashStatisticCardVariants({ variant }))}>{Icon && <Icon className="size-6" />}</div>
      </div>
      <p className="text-xs">{descriptions}</p>
    </Card>
  );
});
export default DashStatisticCard;
