import { memo } from "react";
import { Gift, Coins, LogIn } from "lucide-react";

import { ROUTES } from "@/Constants/RouteConstant";
import { useCustomerRewards } from "@/Features/Customer/Reward/Hooks/useCustomerRewards";
import useRedeemReward from "@/Features/Customer/Reward/Hooks/useRedeemReward";

import CustomerNavbar from "@/Features/Customer/Shared/Components/Navigation/CustomerNavbar";
import { Card } from "@/Components/Elements/Cards/Card";
import { Button } from "@/Components/Elements/Shadcn/button";
import { Badge } from "@/Components/Elements/Shadcn/badge";
import { Spinner } from "@/Components/Elements/Shadcn/spinner";

const CustomerRewardPage = memo(() => {
  const {
    rewards,
    loading: loadingRewards,
    errorMessage,
    loadingProfile,
    userPoints,
    queryParams,
    isAuthenticated,
  } = useCustomerRewards();

  const { handleRedeem, loading: redeeming, navigate } = useRedeemReward();

  return (
    <>
      <CustomerNavbar navbarTitle="Loyalty Rewards" backLink={`${ROUTES.PUBLIC.USER}${queryParams}`} />

      <div className="flex-1 w-full p-4 max-w-3xl mx-auto flex flex-col gap-4">
        {/* User Points Card */}
        <Card
          className="flex items-center justify-between p-4 bg-linear-to-r from-primary/10 to-primary/5 "
          outerClassName="border border-primary/20"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary text-background">
              <Coins className="size-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Poin Loyalty Anda</p>
              {loadingProfile ? (
                <Spinner className="size-4 mt-1" />
              ) : (
                <p className="text-xl font-bold text-slate-800">
                  {isAuthenticated ? `${new Intl.NumberFormat("id-ID").format(userPoints)} Poin` : "- Poin"}
                </p>
              )}
            </div>
          </div>
          {!isAuthenticated && (
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => navigate(`${ROUTES.AUTH.LOGIN}?callbackUrl=${ROUTES.PUBLIC.REWARDS}${queryParams}`)}
            >
              <LogIn className="size-4" /> Masuk
            </Button>
          )}
        </Card>

        {/* Catalog Section */}
        <div className="flex-1 flex flex-col min-h-0">
          <h2 className="text-base font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Gift className="size-5 text-primary" /> Katalog Reward
          </h2>

          {loadingRewards && (
            <div className="flex-1 flex items-center justify-center py-12">
              <Spinner className="size-8" />
            </div>
          )}

          {errorMessage && !loadingRewards && (
            <div className="text-center py-12 text-destructive font-medium">{errorMessage}</div>
          )}

          {!loadingRewards && !errorMessage && rewards.length === 0 && (
            <div className="text-center py-12 text-muted-foreground font-medium">
              Belum ada reward yang tersedia saat ini.
            </div>
          )}

          {!loadingRewards && !errorMessage && rewards.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto max-h-[60vh] no-scrollbar pb-6 px-1">
              {rewards.map((reward) => {
                const canRedeem = isAuthenticated && userPoints >= reward.point_cost;

                return (
                  <Card
                    key={reward.id}
                    className="flex flex-col justify-between p-4"
                    outerClassName="border border-border"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <Badge variant="outline" className="capitalize border-primary/30 text-primary">
                          {reward.category?.toLowerCase()}
                        </Badge>
                        <span className="text-sm font-bold text-primary flex items-center gap-1">
                          <Coins className="size-3.5" /> {reward.point_cost} Pts
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-800 line-clamp-1 mb-1">{reward.name}</h3>
                      <p className="text-xs text-muted-foreground font-normal line-clamp-2 mb-4">
                        {reward.description || "Tidak ada deskripsi"}
                      </p>
                    </div>

                    <Button
                      type="button"
                      disabled={redeeming}
                      onClick={() => handleRedeem(reward)}
                      className="w-full text-xs font-semibold"
                      variant={isAuthenticated && !canRedeem ? "outline" : "default"}
                    >
                      {isAuthenticated && !canRedeem ? "Poin Tidak Cukup" : "Tukarkan"}
                    </Button>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
});

CustomerRewardPage.displayName = "CustomerRewardPage";

export default CustomerRewardPage;
