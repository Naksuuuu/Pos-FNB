import { memo, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router";
import Cookies from "js-cookie";
import { Receipt, Calendar, User, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

import { ROUTES } from "@/Constants/RouteConstant";
import { rupiah } from "@/Utils/rupiahHelper";
import { Card } from "@/Components/Elements/Cards/Card";
import { Badge } from "@/Components/Elements/Shadcn/badge";
import CustomerNavbar from "@/Features/Customer/Shared/Components/Navigation/CustomerNavbar";

const OrderHistoryPage = memo(() => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryParams = searchParams.toString() ? `?${searchParams.toString()}` : "";
  const tableCodeFromQuery = searchParams.get("code")?.trim() || "";

  const orderHistory = useMemo(() => {
    try {
      const stored = Cookies.get("orderHistory");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }, []);

  // Format order list similar to PaymentPage resolution
  const formattedOrders = useMemo(() => {
    return orderHistory
      .map((item, index) => {
        const order = item?.order || item?.data?.order || item || {};
        const orderItems = order?.items || [];
        const subtotal = orderItems.reduce((acc, orderItem) => {
          return acc + Number(orderItem.subtotal || orderItem.price || 0);
        }, 0);
        const taxPercentage = parseFloat(order?.tax_percentage || "0");
        const taxAmount = subtotal * (taxPercentage / 100);
        const grandTotal = subtotal + taxAmount;

        return {
          id: order.id,
          orderNo: order.order_no,
          customerName: order.customer_name || "Pelanggan",
          tableCode: order.table?.code || tableCodeFromQuery || "Take Away",
          createdAt: order.created_at || null,
          grandTotal: grandTotal,
          displayIndex: index + 1,
        };
      })
      .reverse(); // Show newest orders first
  }, [orderHistory, tableCodeFromQuery]);

  const handleOrderClick = (orderId) => {
    navigate(
      {
        pathname: ROUTES.PUBLIC.PAYMENT,
        search: `?orderId=${encodeURIComponent(orderId)}`,
      },
      {
        state: { fromHistory: true },
      },
    );
  };

  const formatDateString = (dateString) => {
    if (!dateString) return "-";
    try {
      return format(new Date(dateString), "dd MMMM yyyy, HH:mm", { locale: id });
    } catch {
      return dateString;
    }
  };

  return (
    <>
      <CustomerNavbar navbarTitle="Riwayat Pesanan" backLink={`${ROUTES.PUBLIC.PROFILE}${queryParams}`} />

      <div className="flex-1 w-full px-3 py-4 space-y-4 max-w-3xl mx-auto">
        {formattedOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
            <div className="p-4 bg-primary/5 text-primary rounded-full border">
              <Receipt className="size-12" />
            </div>
            <div>
              <h3 className="font-bold text-primary">Belum ada riwayat pesanan</h3>
              <p className="text-sm text-primary max-w-xs mt-1">
                Pesanan yang kamu buat di meja ini akan muncul di sini setelah berhasil dipesan.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {formattedOrders.map((order) => (
              <Card
                key={order.id}
                outerClassName="border border-border rounded-lg shadow-sm hover:border-slate-300 transition-colors"
                className="p-3"
              >
                <div
                  onClick={() => handleOrderClick(order.id)}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="space-y-2 flex-1 min-w-0">
                    {/* Order No & Table */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-slate-800 text-sm">
                        Order #{order.orderNo || order.displayIndex}
                      </span>
                      <Badge variant="outline" className="text-xs bg-slate-50">
                        Meja: {order.tableCode}
                      </Badge>
                    </div>

                    {/* Date and Customer Info */}
                    <div className="flex flex-col gap-1 text-xs text-slate-500">
                      {order.createdAt && (
                        <div className="flex items-center gap-1">
                          <Calendar className="size-3.5" />
                          <span>{formatDateString(order.createdAt)}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <User className="size-3.5" />
                        <span>{order.customerName}</span>
                      </div>
                    </div>

                    {/* Total Price */}
                    <div className="pt-1">
                      <span className="text-xs text-slate-400">Total Tagihan:</span>
                      <p className="font-bold text-primary text-sm">{rupiah(order.grandTotal)}</p>
                    </div>
                  </div>

                  {/* Detail Arrow */}
                  <div className="text-slate-400 pl-2">
                    <ChevronRight className="size-5" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
});

export default OrderHistoryPage;
