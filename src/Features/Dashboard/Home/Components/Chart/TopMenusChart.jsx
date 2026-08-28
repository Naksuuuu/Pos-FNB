import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/Components/Elements/Shadcn/card";
import { Badge } from "@/Components/Elements/Shadcn/badge";
import { Skeleton } from "@/Components/Elements/Shadcn/skeleton";
import { Award, Flame } from "lucide-react";

const TopMenusChart = ({ topMenus, loading }) => {
  const maxQty = useMemo(() => {
    if (!topMenus?.length) return 1;
    return Math.max(...topMenus.map((m) => m.qty), 1);
  }, [topMenus]);

  const totalQtySold = useMemo(() => {
    return topMenus.reduce((sum, item) => sum + item.qty, 0);
  }, [topMenus]);

  if (loading) {
    return (
      <Card className="p-5">
        <Skeleton className="h-5 w-48 mb-4" />
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, idx) => (
            <Skeleton key={`top-skeleton-${idx}`} className="h-10 w-full rounded-lg" />
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm border-border/80 flex flex-col">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Award className="size-4 text-chart-1" /> Menu Terlaris (Top Menus)
          </CardTitle>
          <CardDescription className="text-xs mt-0.5">
            Peringkat menu yang paling banyak dipesan pelanggan
          </CardDescription>
        </div>
        <Badge variant="secondary" className="text-xs font-semibold bg-chart-1/10 text-chart-1">
          Total Terjual: {totalQtySold}
        </Badge>
      </CardHeader>
      <CardContent className="flex-1 pt-1 space-y-3">
        {topMenus?.length === 0 ? (
          <p className="py-8 text-center text-xs text-muted-foreground italic">
            Belum ada data penjualan menu pada periode ini.
          </p>
        ) : (
          topMenus?.map((menu, idx) => {
            const percentage = Math.round((menu.qty / maxQty) * 100);
            const chartColorVar =
              idx === 0
                ? "var(--chart-1)"
                : idx === 1
                  ? "var(--chart-2)"
                  : idx === 2
                    ? "var(--chart-3)"
                    : idx === 3
                      ? "var(--chart-4)"
                      : "var(--chart-5)";

            return (
              <div key={menu.name || idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-medium truncate max-w-[70%]">
                    <span
                      className="size-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                      style={{ backgroundColor: chartColorVar }}
                    >
                      {idx + 1}
                    </span>
                    <span className="truncate">{menu.name}</span>
                    {idx === 0 && <Flame className="size-3.5 text-chart-1 shrink-0 animate-pulse" />}
                  </div>
                  <span className="font-bold text-foreground shrink-0">
                    {menu.qty} <span className="font-normal text-muted-foreground text-[11px]">porsi</span>
                  </span>
                </div>
                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%`, backgroundColor: chartColorVar }}
                  />
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
};

export default TopMenusChart;
