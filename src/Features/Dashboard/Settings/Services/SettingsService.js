import { apiUtils } from "@/Services/Common/Base";

const SETTINGS_ENDPOINT = "/dashboard/settings";

const SettingsService = {
  get: async () => {
    const response = await apiUtils.get(SETTINGS_ENDPOINT);
    return response.data;
  },

  update: async (payload) => {
    const response = await apiUtils.put(SETTINGS_ENDPOINT, payload);
    return response.data;
  },

  uploadLogo: async (logoFiles) => {
    const formData = new FormData();
    formData.append("logo", logoFiles[0]);

    const response = await apiUtils.post(`${SETTINGS_ENDPOINT}/logo`, formData, {
      headers: { "Content-Type": undefined },
    });

    return response.data;
  },
};

export default SettingsService;
