import { memo } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { CircleUser, ClipboardList } from "lucide-react";

import { ROUTES } from "@/Constants/RouteConstant";
import { Button } from "@/Components/Elements/Shadcn/button";
import { Card } from "@/Components/Elements/Cards/Card";
import CustomerNavbar from "@/Features/Customer/Shared/Components/Navigation/CustomerNavbar";

const ProfilePage = memo(() => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryParams = searchParams.toString() ? `?${searchParams.toString()}` : "";

  return (
    <>
      <CustomerNavbar navbarTitle="Profil" backLink={`${ROUTES.PUBLIC.CATALOG}${queryParams}`} />

      <div className="flex-1 w-full px-4 py-4 space-y-4 max-w-3xl mx-auto">
        <button
          onClick={() =>
            navigate({
              pathname: ROUTES.PUBLIC.ORDER_HISTORY,
              search: queryParams,
            })
          }
          className="w-full flex items-center gap-3 p-4 border rounded-lg bg-background border-border shadow-sm hover:bg-slate-50 active:bg-slate-100 transition-colors text-left cursor-pointer"
        >
          <div className="flex items-center justify-center size-10 rounded-md bg-primary/5 text-primary border border-border">
            <ClipboardList className="size-5" />
          </div>
          <span className="font-semibold flex-1 text-sm">Riwayat Pesanan</span>
        </button>
      </div>
    </>
  );
});

export default ProfilePage;
