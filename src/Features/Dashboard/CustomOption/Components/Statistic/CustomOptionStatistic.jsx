import { memo } from "react";
import { SlidersHorizontal } from "lucide-react";

import { Card } from "@/Components/Elements/Cards/Card";
import DashStatisticCard from "@/Features/Dashboard/Shared/Component/Card/DashStatisticCard";

const CustomOptionStatistic = memo(({ statistic }) => {
  return (
    <Card className="space-y-4">
      <div>
        <h2 className="font-semibold">Statistik Opsi Kustom</h2>
      </div>
      <DashStatisticCard
        title="Total Opsi Kustom"
        statistic={statistic?.total_custom_options || 0}
        descriptions="Semua Opsi Kustom Terdaftar"
        icon={SlidersHorizontal}
      />
    </Card>
  );
});

CustomOptionStatistic.displayName = "CustomOptionStatistic";

export default CustomOptionStatistic;
