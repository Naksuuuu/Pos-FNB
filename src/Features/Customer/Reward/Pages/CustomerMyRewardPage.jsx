import { memo } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { Gift, Coins, Calendar, CheckCircle, LogIn } from "lucide-react";
import { format } from "date-fns";

import { ROUTES } from "@/Constants/RouteConstant";
import useCustomerMyRewards from "@/Features/Customer/Reward/Hooks/useCustomerMyRewards";
import CustomerNavbar from "@/Features/Customer/Shared/Components/Navigation/CustomerNavbar";
import { Card } from "@/Components/Elements/Cards/Card";
import { Button } from "@/Components/Elements/Shadcn/button";
import { Badge } from "@/Components/Elements/Shadcn/badge";
import { Spinner } from "@/Components/Elements/Shadcn/spinner";

const CustomerMyRewardPage = memo(() => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryParams = searchParams.toString() ? `?${searchParams.toString()}` : "";

  const { myRewards, loading, errorMessage, isAuthenticated } = useCustomerMyRewards();

  return (
    <>
      <CustomerNavbar navbarTitle="Reward Saya" backLink={`${ROUTES.PUBLIC.USER}${queryParams}`} />

      <div className="flex-1 w-full p-4 max-w-3xl mx-auto flex flex-col gap-4">
        <div className="flex-1 flex flex-col min-h-0">
          <h2 className="text-base font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Gift className="size-5 text-primary" /> Riwayat Penukaran
          </h2>

          {!isAuthenticated ? (
            <div className="text-center py-12 bg-white border border-border rounded-lg p-6 flex flex-col items-center gap-4">
              <p className="text-muted-foreground font-medium">Silakan masuk untuk melihat daftar reward Anda.</p>
              <Button
                variant="default"
                size="sm"
                className="gap-2 font-semibold"
                onClick={() => navigate(`${ROUTES.AUTH.LOGIN}?callbackUrl=${ROUTES.PUBLIC.MY_REWARDS}${queryParams}`)}
              >
                <LogIn className="size-4" /> Masuk
              </Button>
            </div>
          ) : (
            <>
              {loading && (
                <div className="flex-1 flex items-center justify-center py-12">
                  <Spinner className="size-8" />
                </div>
              )}

              {errorMessage && !loading && (
                <div className="text-center py-12 text-destructive font-medium">{errorMessage}</div>
              )}

              {!loading && !errorMessage && myRewards.length === 0 && (
                <div className="text-center py-12 text-muted-foreground font-medium bg-white border border-border rounded-lg p-6">
                  Anda belum menukarkan reward apa pun.
                </div>
              )}

              {!loading && !errorMessage && myRewards.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto max-h-[75vh] no-scrollbar pb-6 px-1">
                  {myRewards.map((item) => {
                    const rewardDetail = item.reward;
                    if (!rewardDetail) return null;

                    return (
                      <Card
                        key={item.id}
                        className="flex flex-col justify-between p-4"
                        outerClassName="border border-border"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <Badge variant="outline" className="capitalize border-primary/30 text-primary">
                              {rewardDetail.category?.toLowerCase()}
                            </Badge>
                            <Badge variant={item.status === "APPROVED" ? "success" : "warning"} className="capitalize">
                              {item.status?.toLowerCase()}
                            </Badge>
                          </div>

                          <h3 className="font-bold text-slate-800 line-clamp-1 mb-1">{rewardDetail.name}</h3>
                          <p className="text-xs font-mono text-muted-foreground mb-2">Code: {rewardDetail.code}</p>

                          <p className="text-xs text-muted-foreground font-normal line-clamp-2 mb-4">
                            {rewardDetail.description || "Tidak ada deskripsi"}
                          </p>
                        </div>

                        <div className="border-t pt-3 flex flex-col gap-2 text-xs text-slate-500">
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1">
                              <Coins className="size-3.5 text-primary" /> Poin Ditukar
                            </span>
                            <span className="font-bold text-slate-800">{item.point_used} Pts</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1">
                              <Calendar className="size-3.5" /> Tanggal
                            </span>
                            <span className="font-medium text-slate-700">
                              {item.redeemed_at ? format(new Date(item.redeemed_at), "dd MMM yyyy HH:mm") : "-"}
                            </span>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
});

CustomerMyRewardPage.displayName = "CustomerMyRewardPage";

export default CustomerMyRewardPage;
