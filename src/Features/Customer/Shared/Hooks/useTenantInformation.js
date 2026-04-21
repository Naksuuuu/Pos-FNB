import { useQuery } from "@tanstack/react-query";

import { CUSTOMER_SHARED_QUERY_KEYS } from "@/Features/Customer/Shared/Constants/CustomerSharedConstant";
import CustomerSharedService from "@/Features/Customer/Shared/Services/CustomerSharedService";

const useTenantInformation = () => {
  const { data, isLoading } = useQuery({
    queryKey: CUSTOMER_SHARED_QUERY_KEYS.tenantInformation(),
    queryFn: async () => {
      const response = await CustomerSharedService.tenantInformation();

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch tenant information");
      }

      return response.data;
    },
  });

  return {
    tenant: data?.tenant || null,
    loadingTenant: isLoading,
  };
};

export default useTenantInformation;
