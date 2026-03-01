import { memo } from "react";
import { Package, PackageCheck, PackageX } from "lucide-react";

import { Card } from "@/Components/Elements/Cards/Card";
import DashStatisticCard from "@/Components/Fragments/Dashboard/Common/Card/DashStatisticCard";

const DiningTableStatistic = memo(({ statistic }) => {
  return (
    <Card className="space-y-4">
      <div>
        <h2 className="font-semibold ">Statistik Meja</h2>
      </div>
      <DashStatisticCard
        title="Total Meja"
        statistic={statistic?.total_table || 0}
        descriptions="Semua Meja Terdaftar"
        icon={Package}
      />
      <DashStatisticCard
        title="Meja Tersedia"
        statistic={statistic?.available_count || 0}
        descriptions="Meja dengan status tersedia"
        icon={PackageCheck}
      />
      <DashStatisticCard
        title="Meja Sedang Dipakai"
        statistic={statistic?.occupied_count || 0}
        descriptions="Meja dengan status sedang dipakai"
        icon={PackageX}
        variant={"destructive"}
      />
    </Card>
  );
});
export default DiningTableStatistic;
