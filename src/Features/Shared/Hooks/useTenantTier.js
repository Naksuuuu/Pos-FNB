import { useMemo } from "react";
import useTenant from "./useTenant";

const useTenantTier = () => {
  const { tenant, loadingTenant } = useTenant();

  const isTenantPro = useMemo(() => {
    const tier = (tenant?.status || "pro").toLowerCase();
    return tier === "pro";
  }, [tenant]);

  return {
    isTenantPro,
    loading: loadingTenant,
    tenant,
  };
};

export default useTenantTier;
