import { RefreshCw, ChartColumn } from "lucide-react";
import useHomeAnalytics from "../Hooks/useHomeAnalytics";
import { ANALYTICS_DATE_OPTIONS } from "../Constants/HomeAnalyticsConstant";

import { Button } from "@/Components/Elements/Shadcn/button";
import { SelectDate } from "@/Components/Elements/Inputs/SelectDate";
import AnalyticsSummaryCards from "../Components/Card/AnalyticsSummaryCards";
import BusyHoursChart from "../Components/Chart/BusyHoursChart";
import PaymentAndOrderTypeCharts from "../Components/Chart/PaymentAndOrderTypeCharts";
import TopMenusChart from "../Components/Chart/TopMenusChart";
import RevenueTrendChart from "../Components/Chart/RevenueTrendChart";
import JoinedMembersCard from "../Components/Card/JoinedMembersCard";

const HomePage = () => {
  const {
    dateFilter,
    handleDateFilterChange,
    summary,
    busyHours,
    paymentMethods,
    orderTypes,
    topMenus,
    loading,
    isRefetching,
    refetch,
  } = useHomeAnalytics();

  return (
    <div className="space-y-6 pb-8">
      {/* Top Header & Date Filter Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <ChartColumn className="size-6 text-primary" />
            <h1 className="text-xl font-bold tracking-tight text-foreground">Analitik Dashboard</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Overview performa penjualan, tren jam sibuk, dan preferensi pelanggan secara real-time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* SelectDate Dropdown + Calendar Range Modal */}
          <div className="w-56 sm:w-64">
            <SelectDate
              id="analytics-date-filter"
              name="analytics-date-filter"
              items={ANALYTICS_DATE_OPTIONS}
              placeholder="Pilih Tanggal"
              onValueChange={handleDateFilterChange}
              value={dateFilter}
            />
          </div>

          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            onClick={() => refetch()}
            disabled={isRefetching || loading}
            title="Refresh Data Analitik"
          >
            <RefreshCw className={`size-3.5 ${isRefetching ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      {/* Section 1: KPI Summary Cards */}
      <AnalyticsSummaryCards summary={summary} loading={loading} />

      {/* Section 2: Revenue Trend Chart (Max 7 Days Range) */}
      <RevenueTrendChart />

      {/* Section 3: Main Analytics Grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Left Column (2 Cols): Busy Hours & Payment/Order Types */}
        <div className="space-y-6 xl:col-span-2 ">
          <BusyHoursChart busyHours={busyHours} loading={loading} />
          <PaymentAndOrderTypeCharts paymentMethods={paymentMethods} orderTypes={orderTypes} loading={loading} />
        </div>

        {/* Right Column (1 Col): Top Menus & Joined Members */}
        <div className="space-y-6 xl:col-span-1">
          <TopMenusChart topMenus={topMenus} loading={loading} />
          <JoinedMembersCard />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
