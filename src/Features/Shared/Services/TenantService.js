import { apiUtils } from "@/Services/Common/Base";

const TENANT_INFORMATION_ENDPOINT = "/tenant/information";

const TenantService = {
  tenantInformation: async () => {
    const response = await apiUtils.get(TENANT_INFORMATION_ENDPOINT);
    return response.data;
  },
};

export default TenantService;
