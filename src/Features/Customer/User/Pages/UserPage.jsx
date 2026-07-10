import { memo, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { ClipboardList, LogOut, User, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";

import { ROUTES } from "@/Constants/RouteConstant";
import { Button } from "@/Components/Elements/Shadcn/button";
import CustomerNavbar from "@/Features/Customer/Shared/Components/Navigation/CustomerNavbar";
import useLogout from "@/Features/Auth/Logout/Hooks/useLogout";
import { selectIsAuthenticated } from "@/Redux/Features/Auth/Login/LoginSelector";
import useTenantTier from "@/Features/Shared/Hooks/useTenantTier";

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

  return (
    <>
      <CustomerNavbar navbarTitle="User" backLink={`${ROUTES.PUBLIC.CATALOG}${queryParams}`} />

      <div className="flex-1 w-full p-4 max-w-3xl mx-auto flex flex-col justify-between">
        <div className="w-full flex flex-col gap-4">
          <div className="space-y-4">
            {/* Navigation Links */}
            <div className="flex flex-col gap-3">
              {isTenantPro && (
                <Button
                  variant="outline"
                  onClick={() =>
                    navigate({
                      pathname: ROUTES.PUBLIC.PROFILE,
                      search: queryParams,
                    })
                  }
                  className="w-full h-auto py-3.5 px-4 flex gap-4 border border-border rounded-xl hover:bg-slate-50"
                >
                  <div className="flex items-center justify-center size-10 rounded-md bg-primary/5 text-primary border border-border">
                    <User className="size-5" />
                  </div>
                  <span className="font-semibold flex-1 text-sm text-left text-slate-700">Profil Saya</span>
                  <ChevronRight className="size-4 text-slate-400" />
                </Button>
              )}

              <Button
                variant="outline"
                onClick={() =>
                  navigate({
                    pathname: ROUTES.PUBLIC.ORDER_HISTORY,
                    search: queryParams,
                  })
                }
                className="w-full h-auto py-3.5 px-4 flex gap-4 border border-border rounded-xl hover:bg-slate-50"
              >
                <div className="flex items-center justify-center size-10 rounded-md bg-primary/5 text-primary border border-border">
                  <ClipboardList className="size-5" />
                </div>
                <span className="font-semibold flex-1 text-sm text-left text-slate-700">Riwayat Pesanan</span>
                <ChevronRight className="size-4 text-slate-400" />
              </Button>
            </div>
          </div>
        </div>

        {/* Authentication Button */}
        {isTenantPro && (
          <Button
            variant="outline"
            onClick={handleAuth}
            className="w-full h-auto py-3.5 flex gap-4 mt-8 border border-border rounded-xl hover:bg-slate-50"
          >
            <div
              className={`flex items-center justify-center size-10 rounded-md ${isAuthenticated ? "bg-destructive/5 text-destructive" : "bg-primary/5 text-primary"} border border-border`}
            >
              <LogOut className="size-5" />
            </div>
            <span className="font-semibold flex-1 text-sm text-left text-slate-700">
              {isAuthenticated ? "Keluar" : "Masuk"}
            </span>
          </Button>
        )}
      </div>
    </>
  );
});

UserPage.displayName = "UserPage";

export default UserPage;
