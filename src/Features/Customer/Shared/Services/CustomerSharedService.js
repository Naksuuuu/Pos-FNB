import { apiUtils } from "@/Services/Common/Base";

const TENANT_INFORMATION_ENDPOINT = "/customer/tenant-information";

const CustomerSharedService = {
  tenantInformation: async () => {
    const response = await apiUtils.get(TENANT_INFORMATION_ENDPOINT);
    return response.data;
  },
};

export default CustomerSharedService;
