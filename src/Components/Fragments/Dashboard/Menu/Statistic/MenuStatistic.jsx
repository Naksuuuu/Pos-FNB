import { memo } from "react";
import { Package, PackageCheck, PackageX } from "lucide-react";

import DashboardStatisticCard from "@/Components/Fragments/Dashboard/Common/Card/DashboardStatisticCard";
import DashStatisticCardHeader from "@/Components/Fragments/Dashboard/Common/Card/DashStatisticCardHeader";

const MenuStatistic = memo(({ statistic }) => {
  return (
    <DashStatisticCardHeader title="Statistik Menu" description="Ringkasan Data Menu">
      <DashboardStatisticCard title="Total Menu" statistic={statistic?.total_menu || 0} descriptions="Semua Menu Terdaftar" icon={Package} />
      <DashboardStatisticCard title="Menu Aktif" statistic={statistic?.available_count || 0} descriptions="Menu dengan status tersedia" icon={PackageCheck} />
      <DashboardStatisticCard
        title="Menu Tidak Aktif"
        statistic={statistic?.not_available_count || 0}
        descriptions="Menu dengan status tidak tersedia"
        icon={PackageX}
        iconClassName="bg-red-100 text-red-700!"
      />
    </DashStatisticCardHeader>
  );
});
export default MenuStatistic;
