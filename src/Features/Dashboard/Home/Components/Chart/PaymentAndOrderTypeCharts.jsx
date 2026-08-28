import { useMemo } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/Components/Elements/Shadcn/card";
import { Skeleton } from "@/Components/Elements/Shadcn/skeleton";
import { CreditCard, UtensilsCrossed } from "lucide-react";

const PAYMENT_COLORS = {
  TUNAI: "var(--chart-1)",
  NONTUNAI: "var(--chart-2)",
};

const ORDER_TYPE_COLORS = {
  DINE_IN: "var(--chart-3)",
  TAKE_AWAY: "var(--chart-4)",
};

const ORDER_TYPE_LABELS = {
  DINE_IN: "Dine in",
  TAKE_AWAY: "Take away",
};

const CustomPieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="rounded-lg border border-border bg-popover/95 p-2.5 shadow-md backdrop-blur-sm text-popover-foreground">
        <p className="text-xs font-semibold text-muted-foreground">{data.name}</p>
        <p className="text-sm font-bold mt-0.5" style={{ color: data.payload.fill }}>
          {data.value} Pesanan ({data.payload.percentage}%)
        </p>
      </div>
    );
  }
  return null;
};

const PaymentAndOrderTypeCharts = ({ paymentMethods, orderTypes, loading }) => {
  // Payment methods calculation
  const paymentData = useMemo(() => {
    const total = (paymentMethods || []).reduce((sum, item) => sum + Number(item.count || 0), 0);
    return (paymentMethods || []).map((item) => {
      const count = Number(item.count || 0);
      const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
      return {
        name: item.method === "TUNAI" ? "Tunai (Cash)" : "Non-Tunai (Digital)",
        method: item.method,
        value: count,
        percentage,
        fill: PAYMENT_COLORS[item.method] || "var(--chart-1)",
      };
    });
  }, [paymentMethods]);

  const totalPaymentOrders = useMemo(() => {
    return paymentData.reduce((sum, item) => sum + item.value, 0);
  }, [paymentData]);

  // Order types calculation (Only DINE_IN & TAKE_AWAY)
  const orderTypeData = useMemo(() => {
    const filteredTypes = (orderTypes || []).filter((item) => item.type !== "DELIVERY");
    const total = filteredTypes.reduce((sum, item) => sum + Number(item.count || 0), 0);

    return filteredTypes.map((item) => {
      const count = Number(item.count || 0);
      const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
      return {
        name: ORDER_TYPE_LABELS[item.type] || item.type,
        type: item.type,
        value: count,
        percentage,
        fill: ORDER_TYPE_COLORS[item.type] || "var(--chart-3)",
      };
    });
  }, [orderTypes]);

  const totalTypeOrders = useMemo(() => {
    return orderTypeData.reduce((sum, item) => sum + item.value, 0);
  }, [orderTypeData]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <Skeleton className="h-5 w-40 mb-4" />
          <Skeleton className="h-48 w-48 rounded-full mx-auto" />
        </Card>
        <Card className="p-5">
          <Skeleton className="h-5 w-40 mb-4" />
          <Skeleton className="h-48 w-48 rounded-full mx-auto" />
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {/* Chart 1: Payment Methods */}
      <Card className="shadow-sm border-border/80 flex flex-col h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <CreditCard className="size-4 text-chart-1" /> Metode Pembayaran
          </CardTitle>
          <CardDescription className="text-xs">
            Proporsi penggunaan metode pembayaran Tunai vs Non-Tunai
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col justify-between pt-2">
          <div className="h-48 w-full relative flex items-center justify-center">
            {totalPaymentOrders === 0 ? (
              <p className="text-xs text-muted-foreground italic">Belum ada transaksi pembayaran.</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip content={<CustomPieTooltip />} />
                  <Pie
                    data={paymentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {paymentData.map((entry, index) => (
                      <Cell
                        key={`payment-cell-${index}`}
                        fill={entry.fill}
                        stroke="var(--background)"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border mt-2">
            {paymentData.map((item) => (
              <div
                key={item.method}
                className="flex items-center justify-between p-2 rounded-lg bg-muted/40 border border-border/50"
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="size-2.5 rounded-full shrink-0" style={{ backgroundColor: item.fill }} />
                  <span className="text-xs font-medium truncate">{item.name}</span>
                </div>
                <span className="text-xs font-bold">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chart 2: Order Types */}
      <Card className="shadow-sm border-border/80 flex flex-col">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <UtensilsCrossed className="size-4 text-chart-3" /> Tipe Pesanan
          </CardTitle>
          <CardDescription className="text-xs">Distribusi tipe pesanan (Dine In & Take Away)</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col justify-between pt-2">
          <div className="h-48 w-full relative flex items-center justify-center">
            {totalTypeOrders === 0 ? (
              <p className="text-xs text-muted-foreground italic">Belum ada transaksi pesanan.</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip content={<CustomPieTooltip />} />
                  <Pie
                    data={orderTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {orderTypeData.map((entry, index) => (
                      <Cell key={`type-cell-${index}`} fill={entry.fill} stroke="var(--background)" strokeWidth={2} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border mt-2">
            {orderTypeData.map((item) => (
              <div
                key={item.type}
                className="flex items-center justify-between p-2 rounded-lg bg-muted/40 border border-border/50"
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="size-2.5 rounded-full shrink-0" style={{ backgroundColor: item.fill }} />
                  <span className="text-xs font-medium truncate">{item.name}</span>
                </div>
                <span className="text-xs font-bold">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentAndOrderTypeCharts;
