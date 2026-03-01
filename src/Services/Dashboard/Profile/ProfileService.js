import { apiUtils } from "@/Services/Common/Base";

const ENDPOINT = "/dashboard/profile";
const ENDPOINT_PASSWORD = `${ENDPOINT}/password`;

const ProfileService = {
  get: async () => {
    const response = await apiUtils.get(ENDPOINT);
    return response.data;
  },

  changePassword: async (data) => {
    const response = await apiUtils.put(ENDPOINT_PASSWORD, data);
    return response.data;
  },

  edit: async (data) => {
    const response = await apiUtils.put(ENDPOINT, data);
    return response.data;
  },
};

export default ProfileService;
