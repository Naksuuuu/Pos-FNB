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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/Components/Elements/Shadcn/card";
import { Badge } from "@/Components/Elements/Shadcn/badge";
import { Skeleton } from "@/Components/Elements/Shadcn/skeleton";
import { Clock } from "lucide-react";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-popover/95 p-3 shadow-md backdrop-blur-sm text-popover-foreground">
        <p className="text-xs font-semibold text-muted-foreground mb-1 flex items-center gap-1">
          <Clock className="size-3 text-chart-2" /> Jam: {label}
        </p>
        <p className="text-sm font-bold text-chart-2">
          {payload[0].value} <span className="text-xs font-normal text-foreground">Pesanan</span>
        </p>
      </div>
    );
  }
  return null;
};

const BusyHoursChart = ({ busyHours, loading }) => {
  const chartData = useMemo(() => {
    return (busyHours || []).map((item) => ({
      hour: item.hour,
      shortHour: item.hour.split(" - ")[0],
      orders_count: Number(item.orders_count || 0),
    }));
  }, [busyHours]);

  const peakHour = useMemo(() => {
    if (!chartData.length) return null;
    return chartData.reduce(
      (max, item) => (item.orders_count > max.orders_count ? item : max),
      chartData[0],
    );
  }, [chartData]);

  if (loading) {
    return (
      <Card className="p-5">
        <div className="flex justify-between items-center mb-4">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-64 w-full rounded-xl" />
      </Card>
    );
  }

  return (
    <Card className="shadow-sm border-border/80 flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Clock className="size-4 text-chart-2" /> Jam Sibuk Pesanan (24 Jam)
          </CardTitle>
          <CardDescription className="text-xs mt-0.5">
            Distribusi jumlah transaksi pesanan berdasarkan slot waktu jam
          </CardDescription>
        </div>
        {peakHour && peakHour.orders_count > 0 && (
          <Badge variant="secondary" className="text-xs font-medium bg-chart-2/10 text-chart-2">
            Jam Puncak: {peakHour.shortHour} ({peakHour.orders_count} Pesanan)
          </Badge>
        )}
      </CardHeader>
      <CardContent className="pt-2 flex-1">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border, #e5e7eb)" opacity={0.5} />
              <XAxis
                dataKey="shortHour"
                tick={{ fontSize: 11, fill: "var(--muted-foreground, #6b7280)" }}
                tickLine={false}
                axisLine={false}
                interval={2}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "var(--muted-foreground, #6b7280)" }}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="orders_count"
                stroke="var(--chart-2)"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorOrders)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusyHoursChart;
