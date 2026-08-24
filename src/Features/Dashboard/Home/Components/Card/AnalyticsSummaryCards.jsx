import { Card, CardContent, CardHeader, CardTitle } from "@/Components/Elements/Shadcn/card";
import { Badge } from "@/Components/Elements/Shadcn/badge";
import { Skeleton } from "@/Components/Elements/Shadcn/skeleton";
import { rupiah } from "@/Utils/rupiahHelper";
import { Banknote, DollarSign, ShoppingBag, TrendingUp, TrendingDown, Minus } from "lucide-react";

const AnalyticsSummaryCards = ({ summary, loading }) => {
  const cardsData = [
    {
      key: "total_revenue",
      title: "Total Pendapatan",
      icon: DollarSign,
      iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      data: summary?.total_revenue,
      isCurrency: true,
    },
    {
      key: "net_revenue",
      title: "Pendapatan Bersih",
      icon: Banknote,
      iconBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
      data: summary?.net_revenue,
      isCurrency: true,
    },
    {
      key: "total_orders",
      title: "Total Pesanan",
      icon: ShoppingBag,
      iconBg: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
      data: summary?.total_orders,
      isCurrency: false,
    },
    {
      key: "average_order_value",
      title: "Rata-rata Order",
      icon: TrendingUp,
      iconBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
      data: summary?.average_order_value,
      isCurrency: true,
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Card key={`skeleton-card-${idx}`} className="space-y-3 p-5">
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="size-8 rounded-lg" />
            </div>
            <Skeleton className="h-8 w-36" />
            <Skeleton className="h-4 w-28" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cardsData.map((card) => {
        const Icon = card.icon;
        const currentVal = card.data?.current ?? 0;
        const previousVal = card.data?.previous ?? 0;
        const percentChange = card.data?.percentage_change ?? 0;
        const isIncrease = card.data?.is_increase ?? true;

        const formattedCurrent = card.isCurrency ? rupiah(currentVal) : currentVal.toLocaleString("id-ID");
        const formattedPrevious = card.isCurrency ? rupiah(previousVal) : previousVal.toLocaleString("id-ID");

        return (
          <Card key={card.key} className="shadow-sm hover:shadow-md transition-shadow border-border/80">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${card.iconBg}`}>
                <Icon className="size-4" />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-2xl font-bold tracking-tight text-foreground">{formattedCurrent}</div>
              <div className="flex items-center justify-between text-xs">
                <Badge
                  variant="secondary"
                  className={`font-semibold flex items-center gap-1 text-[11px] px-2 py-0.5 ${
                    percentChange === 0
                      ? "bg-muted text-muted-foreground"
                      : isIncrease
                        ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                        : "bg-destructive/15 text-destructive"
                  }`}
                >
                  {percentChange === 0 ? (
                    <Minus className="size-3" />
                  ) : isIncrease ? (
                    <TrendingUp className="size-3" />
                  ) : (
                    <TrendingDown className="size-3" />
                  )}
                  <span>
                    {percentChange > 0 ? `+${percentChange}%` : `${percentChange}%`}
                  </span>
                </Badge>
                <span className="text-muted-foreground truncate max-w-[120px]" title={`Lalu: ${formattedPrevious}`}>
                  Lalu: {formattedPrevious}
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AnalyticsSummaryCards;
