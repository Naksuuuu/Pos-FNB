import { memo } from "react";
import { Gift, CheckCircle, XCircle } from "lucide-react";
import DashStatisticCard from "@/Features/Dashboard/Shared/Component/Card/DashStatisticCard";
import DashStatisticCardHeader from "@/Features/Dashboard/Shared/Component/Card/DashStatisticCardHeader";

const RewardStatistic = memo(({ statistic }) => {
  return (
    <DashStatisticCardHeader title="Statistik Reward" description="Ringkasan Data Reward">
      <DashStatisticCard
        title="Total Reward"
        statistic={statistic?.total_reward || 0}
        descriptions="Semua Reward Terdaftar"
        icon={Gift}
      />
      <DashStatisticCard
        title="Reward Aktif"
        statistic={statistic?.active_count || 0}
        descriptions="Total reward berstatus Aktif"
        icon={CheckCircle}
        variant="success"
      />
      <DashStatisticCard
        title="Reward Nonaktif"
        statistic={statistic?.inactive_count || 0}
        descriptions="Total reward berstatus Nonaktif"
        icon={XCircle}
        variant="destructive"
      />
    </DashStatisticCardHeader>
  );
});

RewardStatistic.displayName = "RewardStatistic";

export default RewardStatistic;
