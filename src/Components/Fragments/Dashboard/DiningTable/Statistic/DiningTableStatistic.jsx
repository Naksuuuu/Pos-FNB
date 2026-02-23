import { memo } from "react";
import { Package, PackageCheck, PackageX } from "lucide-react";

import DashStatisticCardHeader from "@/Components/Fragments/Dashboard/Common/Card/DashStatisticCardHeader";
import DashStatisticCard from "@/Components/Fragments/Dashboard/Common/Card/DashStatisticCard";

const DiningTableStatistic = memo(({ statistic }) => {
  return (
    <DashStatisticCardHeader title="Statistik Meja" description="Ringkasan Data Meja">
      <DashStatisticCard title="Total Meja" statistic={statistic?.total_table || 0} descriptions="Semua Meja Terdaftar" icon={Package} />
      <DashStatisticCard title="Meja Tersedia" statistic={statistic?.available_count || 0} descriptions="Meja dengan status tersedia" icon={PackageCheck} />
      <DashStatisticCard
        title="Meja Sedang Dipakai"
        statistic={statistic?.occupied_count || 0}
        descriptions="Meja dengan status sedang dipakai"
        icon={PackageX}
        iconClassName="bg-destructive/10 text-destructive!"
      />
    </DashStatisticCardHeader>
  );
});
export default DiningTableStatistic;
