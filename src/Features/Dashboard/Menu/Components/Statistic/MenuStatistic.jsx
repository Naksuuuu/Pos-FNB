import { memo } from "react";
import { Package, PackageCheck, PackageX } from "lucide-react";

import DashStatisticCard from "@/Features/Dashboard/Shared/Component/Card/DashStatisticCard";
import DashStatisticCardHeader from "@/Features/Dashboard/Shared/Component/Card/DashStatisticCardHeader";

const MenuStatistic = memo(({ statistic }) => {
  return (
    <DashStatisticCardHeader title="Statistik Menu" description="Ringkasan Data Menu">
      <DashStatisticCard title="Total Menu" statistic={statistic?.total_menu || 0} descriptions="Semua Menu Terdaftar" icon={Package} />
      <DashStatisticCard title="Menu Aktif" statistic={statistic?.available_count || 0} descriptions="Menu dengan status tersedia" icon={PackageCheck} />
      <DashStatisticCard title="Menu Tidak Aktif" statistic={statistic?.not_available_count || 0} descriptions="Menu dengan status tidak tersedia" icon={PackageX} variant={"destructive"} />
    </DashStatisticCardHeader>
  );
});
export default MenuStatistic;

