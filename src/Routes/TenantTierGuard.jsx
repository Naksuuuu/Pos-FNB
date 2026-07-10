import { Navigate } from "react-router";
import { Spinner } from "@/Components/Elements/Shadcn/spinner";
import useTenant from "@/Features/Shared/Hooks/useTenant";
import { ROUTES } from "@/Constants/RouteConstant";

const TenantTierGuard = ({ children, allowedTiers = ["pro"] }) => {
  const { tenant, loadingTenant } = useTenant();

  if (loadingTenant) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <Spinner className="size-8 text-primary" />
      </div>
    );
  }

  // Support both status and tier checks from backend API response
  const currentTier = (tenant?.status || tenant?.tier || "basic").toLowerCase();
  const normalizedAllowedTiers = allowedTiers.map((t) => t.toLowerCase());

  if (!normalizedAllowedTiers.includes(currentTier)) {
    return <Navigate to={ROUTES.PUBLIC.CATALOG} replace />;
  }

  return children;
};

export default TenantTierGuard;
