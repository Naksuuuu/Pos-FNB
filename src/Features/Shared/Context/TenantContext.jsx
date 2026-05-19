import { createContext, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import TenantService from "@/Features/Shared/Services/TenantService";
import { SHARED_QUERY_KEYS } from "@/Features/Shared/Constants/SharedConstant";

const TenantContext = createContext();

const TenantProvider = ({ children }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: SHARED_QUERY_KEYS.tenant(),
    queryFn: async () => {
      const response = await TenantService.tenantInformation();

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch tenant information");
      }

      return response.data;
    },
  });

  const tenant = useMemo(() => data?.tenant || null, [data?.tenant]);

  useEffect(() => {
    if (tenant?.dashboard_color) {
      document.documentElement.style.setProperty("--primary", tenant.dashboard_color);
    }
  }, [tenant?.dashboard_color]);

  const value = useMemo(
    () => ({
      tenant,
      loadingTenant: isLoading,
      errorTenant: error?.message,
    }),
    [tenant, isLoading, error],
  );

  return <TenantContext.Provider value={value}>{children}</TenantContext.Provider>;
};

export default TenantProvider;
export { TenantContext };
