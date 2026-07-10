import { apiUtils } from "@/Services/Common/Base";

const ENDPOINT = "/customer/profile";
const ENDPOINT_PASSWORD = `${ENDPOINT}/password`;

const CustomerProfileService = {
  get: async () => {
    const response = await apiUtils.get(ENDPOINT);
    return response.data;
  },

  edit: async (data) => {
    const response = await apiUtils.put(ENDPOINT, data);
    return response.data;
  },

  changePassword: async (data) => {
    const response = await apiUtils.put(ENDPOINT_PASSWORD, data);
    return response.data;
  },
};

export default CustomerProfileService;
