import { memo, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { ClipboardList, LogOut, User, ChevronRight, Gift } from "lucide-react";
import { useSelector } from "react-redux";

import { ROUTES } from "@/Constants/RouteConstant";
import { Button } from "@/Components/Elements/Shadcn/button";
import CustomerNavbar from "@/Features/Customer/Shared/Components/Navigation/CustomerNavbar";
import useLogout from "@/Features/Auth/Logout/Hooks/useLogout";
import { selectIsAuthenticated } from "@/Redux/Features/Auth/Login/LoginSelector";
import useTenantTier from "@/Features/Shared/Hooks/useTenantTier";
import { Badge } from "@/Components/Elements/Shadcn/badge";

const UserPage = memo(() => {
  const navigate = useNavigate();
  const { logout } = useLogout();
  const [searchParams] = useSearchParams();
  const queryParams = searchParams.toString() ? `?${searchParams.toString()}` : "";

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { isTenantPro } = useTenantTier();

  const handleAuth = useCallback(async () => {
    isAuthenticated ? await logout() : navigate(`${ROUTES.AUTH.LOGIN}?callbackUrl=${ROUTES.PUBLIC.USER}`);
  }, [isAuthenticated, logout, navigate]);

  const menuItems = [
    {
      label: "Profil Saya",
      icon: User,
      path: ROUTES.PUBLIC.PROFILE,
      show: isTenantPro,
    },
    {
      label: "Loyalty Reward",
      icon: Gift,
      path: ROUTES.PUBLIC.REWARDS,
      show: isTenantPro,
    },
    {
      label: "Reward Saya",
      icon: Gift,
      path: ROUTES.PUBLIC.MY_REWARDS,
      show: isTenantPro,
    },
    {
      label: "Riwayat Pesanan",
      icon: ClipboardList,
      path: ROUTES.PUBLIC.ORDER_HISTORY,
      show: true,
    },
  ].filter((item) => item.show);

  return (
    <>
      <CustomerNavbar navbarTitle="User" backLink={`${ROUTES.PUBLIC.CATALOG}${queryParams}`} />

      <div className="flex-1 w-full p-4 max-w-3xl mx-auto flex flex-col justify-between">
        <div className="w-full flex flex-col gap-4">
          <div className="space-y-4">
            {/* Navigation Links */}
            <div className="flex flex-col gap-3">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() =>
                      navigate({
                        pathname: item.path,
                        search: queryParams,
                      })
                    }
                    className="w-full h-auto py-3.5 px-4 flex gap-4 "
                  >
                    <div className="flex items-center justify-center size-10 rounded-md bg-primary/5 text-primary border border-border">
                      <Icon className="size-5" />
                    </div>
                    <span className="font-semibold flex-1 text-sm text-left ">{item.label}</span>
                    <ChevronRight className="size-4 text-slate-400" />
                  </Button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Authentication Button */}
        {isTenantPro && (
          <Button variant="outline" onClick={handleAuth} className="w-full h-auto py-3.5 flex gap-4 ">
            <div
              className={`flex items-center justify-center size-10 rounded-md ${isAuthenticated ? "bg-destructive/5 text-destructive" : "bg-primary/5 text-primary"} border border-border`}
            >
              <LogOut className="size-5" />
            </div>
            <span className="font-semibold flex-1 text-sm text-left ">{isAuthenticated ? "Keluar" : "Masuk"}</span>
          </Button>
        )}
      </div>
    </>
  );
});

UserPage.displayName = "UserPage";

export default UserPage;
