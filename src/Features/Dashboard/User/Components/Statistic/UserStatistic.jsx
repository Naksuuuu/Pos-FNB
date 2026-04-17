import { memo } from "react";
import { Users, UserCog, UserCheck } from "lucide-react";
import DashStatisticCard from "@/Features/Dashboard/Shared/Component/Card/DashStatisticCard";
import DashStatisticCardHeader from "@/Features/Dashboard/Shared/Component/Card/DashStatisticCardHeader";

const UserStatistic = memo(({ statistic }) => {
  return (
    <DashStatisticCardHeader title="Statistik User" description="Ringkasan Data User">
      <DashStatisticCard title="Total User" statistic={statistic?.total_user || 0} descriptions="Semua User Terdaftar" icon={Users} />
      <DashStatisticCard title="Total Admin" statistic={statistic?.admin_count || 0} descriptions="Total user dengan role Admin" icon={UserCog} />
      <DashStatisticCard title="Total Kasir" statistic={statistic?.cashier_count || 0} descriptions="Total user dengan role Kasir" icon={UserCheck} variant="warning" />
    </DashStatisticCardHeader>
  );
});

UserStatistic.displayName = "UserStatistic";

export default UserStatistic;

