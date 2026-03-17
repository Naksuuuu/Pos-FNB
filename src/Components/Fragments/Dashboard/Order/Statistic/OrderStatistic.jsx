import DashStatisticCard from "@/Components/Fragments/Dashboard/Common/Card/DashStatisticCard";
import DashStatisticCardHeader from "@/Components/Fragments/Dashboard/Common/Card/DashStatisticCardHeader";
import { CircleX, Clock, ClockCheck, ConciergeBell } from "lucide-react";
import { memo } from "react";

const OrderStatistic = memo(({ statistic }) => {
  return (
    <DashStatisticCardHeader title="Statistik Pesanan" description="Ringkasan Data Order" gridCols="md:grid-cols-2 lg:grid-cols-4">
      <DashStatisticCard title="Total Pesanan" statistic={statistic?.total_order || 0} descriptions="Semua Pesanan Terdaftar" icon={ConciergeBell} />
      <DashStatisticCard title="Selesai" statistic={statistic?.completed || 0} descriptions="Pesanan yang telah selesai" icon={ClockCheck} />
      <DashStatisticCard title="Submitted" statistic={statistic?.submitted || 0} descriptions="Pesanan yang telah diajukan" icon={Clock} variant={"info"} />
      <DashStatisticCard title="Dibatalkan" statistic={statistic?.canceled || 0} descriptions="Pesanan yang dibatalkan" icon={CircleX} variant={"destructive"} />
    </DashStatisticCardHeader>
  );
});
export default OrderStatistic;
