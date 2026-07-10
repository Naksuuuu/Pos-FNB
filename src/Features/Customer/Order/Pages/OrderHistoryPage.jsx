import { memo } from "react";
import { Receipt, Calendar, User, ChevronRight } from "lucide-react";

import { ROUTES } from "@/Constants/RouteConstant";
import { rupiah } from "@/Utils/rupiahHelper";
import { Card } from "@/Components/Elements/Cards/Card";
import { Badge } from "@/Components/Elements/Shadcn/badge";
import CustomerNavbar from "@/Features/Customer/Shared/Components/Navigation/CustomerNavbar";
import useHistoryOrders from "@/Features/Customer/Order/Hooks/useHistoryOrders";
import { Spinner } from "@/Components/Elements/Shadcn/spinner";

const OrderHistoryPage = memo(() => {
  const { formattedOrders, loading, handleOrderClick, formatDateString, queryParams } = useHistoryOrders();

  return (
    <>
      <CustomerNavbar navbarTitle="Riwayat Pesanan" backLink={`${ROUTES.PUBLIC.USER}${queryParams}`} />

      <div className="flex-1 w-full px-3 py-4 space-y-4 max-w-3xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Spinner className="size-8" />
          </div>
        ) : formattedOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
            <div className="p-4 bg-primary/5 text-primary rounded-full border">
              <Receipt className="size-12" />
            </div>
            <div>
              <h3 className="font-bold text-primary">Belum ada riwayat pesanan</h3>
              <p className="text-sm text-primary max-w-xs mt-1">
                Pesanan yang kamu buat akan muncul di sini setelah berhasil dipesan.
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
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-slate-800 text-sm">
                        Order #{order.orderNo || order.displayIndex}
                      </span>
                      <Badge variant="outline" className="text-xs bg-slate-50">
                        Meja: {order.tableCode}
                      </Badge>
                    </div>

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

                    <div className="pt-1">
                      <span className="text-xs text-slate-400">Total Tagihan:</span>
                      <p className="font-bold text-primary text-sm">{rupiah(order.grandTotal)}</p>
                    </div>
                  </div>

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

OrderHistoryPage.displayName = "OrderHistoryPage";

export default OrderHistoryPage;
