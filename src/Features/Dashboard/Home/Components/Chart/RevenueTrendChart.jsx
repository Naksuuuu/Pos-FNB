import { useMemo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { format, parseISO, isValid } from "date-fns";
import { id } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/Components/Elements/Shadcn/card";
import { Badge } from "@/Components/Elements/Shadcn/badge";
import { Skeleton } from "@/Components/Elements/Shadcn/skeleton";
import { SelectDate } from "@/Components/Elements/Inputs/SelectDate";
import { rupiah } from "@/Utils/rupiahHelper";
import { TrendingUp, Calendar } from "lucide-react";
import useRevenueTrend from "../../Hooks/useRevenueTrend";
import { REVENUE_TREND_DATE_OPTIONS } from "../../Constants/HomeAnalyticsConstant";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    let formattedLabel = label;
    try {
      const parsed = parseISO(label);
      if (isValid(parsed)) {
        formattedLabel = format(parsed, "EEEE, d MMMM yyyy", { locale: id });
      }
    } catch {
      // fallback label
    }

    return (
      <div className="rounded-lg border border-border bg-popover/95 p-3 shadow-md backdrop-blur-sm text-popover-foreground">
        <p className="text-xs font-semibold text-muted-foreground mb-1 flex items-center gap-1">
          <Calendar className="size-3 text-primary" /> {formattedLabel}
        </p>
        <p className="text-sm font-bold text-chart-1">
          Pendapatan: {rupiah(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

const RevenueTrendChart = () => {
  const {
    revenueTrend,
    dateFilter,
    handleDateFilterChange,
    loading,
  } = useRevenueTrend();

  const chartData = useMemo(() => {
    return (revenueTrend || []).map((item) => {
      let shortLabel = item.label;
      try {
        const parsed = parseISO(item.label);
        if (isValid(parsed)) {
          shortLabel = format(parsed, "dd MMM", { locale: id });
        }
      } catch {
        // fallback label
      }

      return {
        rawDate: item.label,
        label: shortLabel,
        revenue: Number(item.revenue || 0),
      };
    });
  }, [revenueTrend]);

  const totalRevenue = useMemo(() => {
    return chartData.reduce((sum, item) => sum + item.revenue, 0);
  }, [chartData]);

  return (
    <Card className="shadow-sm border-border/80 flex flex-col">
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-4">
        <div>
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <TrendingUp className="size-4 text-chart-1" /> Tren Pendapatan Harian
          </CardTitle>
          <CardDescription className="text-xs mt-0.5">
            Analisis fluktuasi omset harian (Filter Maksimal 7 Hari)
          </CardDescription>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <Badge variant="secondary" className="text-xs font-bold bg-chart-1/10 text-chart-1 h-9 px-3">
            Total: {rupiah(totalRevenue)}
          </Badge>

          {/* SelectDate Dropdown with maxRangeDays={7} */}
          <div className="w-52 sm:w-60">
            <SelectDate
              id="revenue-trend-date-filter"
              name="revenue-trend-date-filter"
              items={REVENUE_TREND_DATE_OPTIONS}
              placeholder="Pilih Tanggal"
              onValueChange={handleDateFilterChange}
              value={dateFilter}
              maxRangeDays={7}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-2 flex-1">
        {loading ? (
          <Skeleton className="h-64 w-full rounded-xl" />
        ) : chartData.length === 0 ? (
          <div className="h-64 flex items-center justify-center text-xs text-muted-foreground italic">
            Belum ada data tren pendapatan pada rentang tanggal ini.
          </div>
        ) : (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border, #e5e7eb)" opacity={0.5} />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 11, fill: "var(--muted-foreground, #6b7280)" }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "var(--muted-foreground, #6b7280)" }}
                  tickFormatter={(val) => (val >= 1000000 ? `${(val / 1000000).toFixed(1)}M` : val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val)}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--chart-1)"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RevenueTrendChart;
